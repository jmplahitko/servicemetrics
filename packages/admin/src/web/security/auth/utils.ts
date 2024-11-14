
import { Response } from 'express';
import crypto from 'node:crypto';

export function setCookie(response: Response, opts: { name: string; contents: string; expires: Date, sameSite?: 'strict' | 'lax' | 'none' }) { // typing
	return response.cookie(opts.name, opts.contents, {
		secure: process.env.NODE_ENV !== 'development',
		httpOnly: true,
		expires: opts.expires,
		sameSite: opts.sameSite ?? (process.env.NODE_ENV === 'development' ? 'lax' : 'strict'),
	});
}

export function getCookieExpiration(cookieLifetimeMinutes: number) {
	const today = new Date();
	return new Date(today.getTime() + cookieLifetimeMinutes * 60000)
}

export function encryptCookie(cookie: string, key: string) {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		key,
		iv
	);
	let encrypted = Buffer.concat([iv, cipher.update(cookie, 'utf8'), cipher.final()]);
	return encrypted.toString('base64url');
}

export function decryptCookie(encryptedCookie: string, key: string) {
	const ivCiphertext = Buffer.from(encryptedCookie, 'base64url');
	const iv = ivCiphertext.subarray(0, 16);
	const ciphertext = ivCiphertext.subarray(16);
	const cipher = crypto.createDecipheriv(
		'aes-256-cbc',
		key,
		iv
	);
	let decrypted = Buffer.concat([cipher.update(ciphertext), cipher.final()]);
	return decrypted.toString('utf-8');
}