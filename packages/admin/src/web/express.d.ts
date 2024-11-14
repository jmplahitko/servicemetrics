import { User } from '../service-model';

declare global {
	namespace Express {
		interface Request {
			user?: User
		}
	}
}