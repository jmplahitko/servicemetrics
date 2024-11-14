import { NextFunction, Request, Response } from 'express';
import { AuthSettings } from '.';
import { decryptCookie, encryptCookie, getCookieExpiration, setCookie } from './utils';

export function authorizeMiddleware(settings: AuthSettings) {
	return (request: Request, response: Response, next: NextFunction) => {
		const { cookieName, cookieKey } = settings;
		let cookie = request.cookies[cookieName];

		if (cookie) {
			cookie = decryptCookie(cookie, cookieKey);
			cookie = JSON.parse(cookie);
			const claims = cookie.claims;

			if (claims) {
				request.user = {
					id: claims.sub,
					firstName: claims.given_name,
					lastName: claims.family_name,
					roleFlags: 1
				}
			}

			cookie = JSON.stringify(cookie);
			cookie = encryptCookie(cookie, cookieKey)

			setCookie(response, {
				name: cookieName,
				contents: JSON.stringify(cookie),
				expires: getCookieExpiration(settings.cookieLifetime)
			});

			next();
		} else {
			response.sendStatus(401);
		}
	}
}