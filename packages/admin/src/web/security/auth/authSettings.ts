import { AuthSettings } from '.';
import env from 'env-var';
import crypto from 'node:crypto';

const cookieKey = crypto.createHash('sha256').update(String(env.get('AUTH_COOKIE_KEY').asString() ?? '')).digest('base64').substring(0, 32)

export const authSettings: AuthSettings = {
	provider: env.get('AUTH_PROVIDER').asString() ?? '',
	issuer: env.get('AUTH_ISSUER').asString() ?? '',
	clientId: env.get('AUTH_CLIENT_ID').asString() ?? '',
	clientSecret: env.get('AUTH_CLIENT_SECRET').asString() ?? '',
	dauthCookieName: env.get('DAUTH_COOKIE_NAME').asString() ?? '',
	cookieName: env.get('AUTH_COOKIE_NAME').asString() ?? '',
	cookieLifetime: env.get('AUTH_COOKIE_LIFETIME').asInt() ?? 20,
	cookieKey
}