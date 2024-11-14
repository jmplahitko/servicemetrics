import { Request, Response } from 'express';

export interface IAuthService {
	provider: string;
	authenticate(request: Request<{}, {}, AuthenticateRequest>, response: Response): void;
	callback(request: Request<{}, {}, CallbackRequest>, response: Response): void;
	getMe(request: Request<{}, {}, GetMeRequest>, response: Response): void;
	logout(request: Request<{}, {}, LogoutRequest>, response: Response): void;
	singleLogout(request: Request, response: Response): void;
}

export type AuthSettings = {
	provider: string;
	issuer: string;
	clientId: string;
	clientSecret: string;
	dauthCookieName: string;
	cookieName: string;
	cookieKey: string;
	cookieLifetime: number;
}

export type AuthenticateRequest = {
	provider: string;
	returnUrl: string;
	state?: string;
	username?: string;
}

export type CallbackRequest = {
	code: string;
}

export type GetMeRequest = {}

export type LogoutRequest = {
	returnUrl: string;
}