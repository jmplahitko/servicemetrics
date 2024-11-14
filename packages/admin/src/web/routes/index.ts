import { Router, Request, Response } from 'express';
import container from '../container';
import { AuthenticateRequest, CallbackRequest, GetMeRequest, IAuthService, LogoutRequest } from '../security/auth';
import { authorizeMiddleware } from '../security/auth/authorize';

const routes = Router({});
const authorize = authorizeMiddleware(container.resolve('authSettings'));

routes.post('/api/auth', async (req: Request<{}, {}, AuthenticateRequest>, res: Response) => {
	const authService: IAuthService = await container.resolve('authService');

	authService.authenticate(req, res);
});

routes.post('/api/auth/callback', async (req: Request<{}, {}, CallbackRequest>, res: Response) => {
	const authService: IAuthService = await container.resolve('authService');

	authService.callback(req, res);
});

routes.post('/api/logout', async (req: Request<{}, {}, LogoutRequest>, res: Response) => {
	const authService: IAuthService = await container.resolve('authService');

	authService.logout(req, res);
});

routes.post('/api/logout/front-channel', async (req: Request<{}, {}, LogoutRequest>, res: Response) => {
	const authService: IAuthService = await container.resolve('authService');

	authService.singleLogout(req, res);
});

routes.get('/api/me', authorize, async (req: Request<{}, {}, GetMeRequest>, res: Response) => {
	const authService: IAuthService = await container.resolve('authService');

	authService.getMe(req, res);
});

routes.head('/api/me', authorize, async (req: Request<{}, {}, GetMeRequest>, res: Response) => {
	res.sendStatus(200);
});

export default routes;
