import { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../../state/auth';
import { getRouteTreeProperty } from '../../utils/getRouteTreeProperty';
import { hasAnyFlags } from '../../utils/lib';
import { RoleFlags } from '../../model/User';

export const routeAuthorization: NavigationGuard = async (to, from, next) => {
	const authStore = useAuthStore();
	const accessLevel = getRouteTreeProperty<number>(to, 'authorize') ?? RoleFlags.none;

	if (!authStore.hasInitializedAuth) {
		try {
			await authStore.getMe();
			checkRoute();
		} catch (e: any) {
			checkRoute(e);
		}
	} else {
		try {
			await authStore.keepAlive();
			checkRoute();
		} catch (e: any) {
			checkRoute(e);
		}
	}

	function checkRoute(error = null) {
		let user = authStore.user;
		let isAuthenticated = authStore.isAuthenticated;

		if (!accessLevel || hasAnyFlags(accessLevel, user?.roleFlags ?? RoleFlags.none)) {
			return next();
		} else {
			if (isAuthenticated) {
				if (from.name === null) {
					// User is trying a root app route
					return next({
						name: 'dashboard',
						query: to.query,
						params: to.params
					});
				} else {
					// User is authenticated but attempting an unauthorized route
					// Store.dispatch('alerts/show', makeErrorAlert(new UnauthorizedRouteError(), 5000));
					return next(false);
				}
			} else {
				// User is attempting an authenticated route without signing in, or their session expired.
				// Store.dispatch('app/sessionTimeout', error);
				authStore.oauthState = {
					returnRoute: {
						name: to.name,
						query: to.query,
						params: to.params
					}
				}

				return next({
					name: 'home'
				});
			}
		}
	}
}