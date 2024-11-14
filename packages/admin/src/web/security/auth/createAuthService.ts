import { AuthSettings, IAuthService } from '.';
import * as client from 'openid-client';
import crypto from 'node:crypto';
import { decryptCookie, encryptCookie, getCookieExpiration, setCookie } from './utils';

export default async function createAuthService(authSettings: AuthSettings): Promise<IAuthService> {
	const provider = authSettings.provider;
	const issuer = new URL(authSettings.issuer);
	const clientId = authSettings.clientId;
	const clientSecret = authSettings.clientSecret;
	const dauthCookieName = authSettings.dauthCookieName;
	const cookieName = authSettings.cookieName;
	const cookieEncryptionKey = authSettings.cookieKey;
	const cookieLifetime = authSettings.cookieLifetime;

	const config: client.Configuration = await client.discovery(
		issuer,
		clientId,
		clientSecret
	)

	return {
		provider,
		async authenticate(request, response) {
			const codeVerifier = client.randomPKCECodeVerifier();
			const codeChallenge = await client.calculatePKCECodeChallenge(codeVerifier);
			const state = encryptCookie(request.body.state ?? '', cookieEncryptionKey) ?? client.randomState();
			const nonce = client.randomNonce();
			const parameters: Record<string, string> = {
				redirect_uri: request.body.returnUrl,
				scope: 'openid profile email phone',
				code_verifier: codeVerifier,
				code_challenge: codeChallenge,
				code_challenge_method: 'S256',
				nonce,
				state,
			}
			const redirectUrl = client.buildAuthorizationUrl(config, parameters);
			const cookieContents = JSON.stringify({ nonce, state, codeVerifier });
			const encryptedCookie = encryptCookie(cookieContents, cookieEncryptionKey);

			setCookie(response, {
				name: dauthCookieName,
				contents: encryptedCookie,
				expires: getCookieExpiration(cookieLifetime)
			});

			response.status(200);

			response.json({
				redirectUrl
			});
		},

		async callback(request, response) {
			const dauthCookie = request.cookies[dauthCookieName];
			let decryptedCookie;

			if (!dauthCookie) {
				response.sendStatus(401);
				return;
			}

			decryptedCookie = decryptCookie(dauthCookie, cookieEncryptionKey);
			decryptedCookie = JSON.parse(decryptedCookie);

			const { nonce, state, codeVerifier } = decryptedCookie;
			const referer = request.headers.referer
				? new URL(request.headers.referer)
				: new URL(request.url);
			let tokens;

			try {
				tokens = await client.authorizationCodeGrant(config, referer, {
					pkceCodeVerifier: codeVerifier,
					expectedNonce: nonce,
					expectedState: state,
					idTokenExpected: true
				});
			} catch (e) {
				console.log(e)
				response.sendStatus(401);
				return;
			}

			const { access_token, id_token } = tokens;
			const tokenClaims = tokens.claims() as { sub: string }; // TODO: proper typing
			const { sub } = tokenClaims;
			let claims;

			try {
				claims = await client.fetchUserInfo(config, access_token, sub);
			} catch (e) {
				console.log(e)
				response.sendStatus(401);
				return;
			}

			const cookie = JSON.stringify({ claims, id_token }); // TODO: id_token in cache
			const encryptedCookie = encryptCookie(cookie, cookieEncryptionKey);

			setCookie(response, {
				name: cookieName,
				contents: encryptedCookie,
				expires: getCookieExpiration(cookieLifetime)
			});

			response.clearCookie(dauthCookieName);

			const decryptedState = decryptCookie(state, cookieEncryptionKey);

			response.status(200);

			response.json({
				provider,
				claims,
				state: decryptedState
			});
		},

		async getMe(request, response) {
			if (request.user) {
				response.status(200);
				response.json({ user: request.user });
			} else {
				response.sendStatus(401);
			}
		},

		async logout(request, response) {
			let cookie = request.cookies[cookieName];
			let endSessionUrl;

			if (!!cookie) {
				cookie = decryptCookie(cookie, cookieEncryptionKey);
				const { id_token } = JSON.parse(cookie);
				const { returnUrl } = request.body;

				endSessionUrl = client.buildEndSessionUrl(config, {
					post_logout_redirect_uri: returnUrl,
					id_token_hint: id_token
				});

				response.clearCookie(cookieName);
			}

			response.status(200);
			response.json({
				redirectUrl: endSessionUrl
			});
		},

		async singleLogout(request, response) {
			// TODO: need session to do this
			response.clearCookie(cookieName);

			response.status(200);
			response.send('<html><body /></html>');
		}
	}
}