import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import { User } from '../model/User';
import { OauthState } from '../model/auth';

export const useAuthStore = defineStore('auth', () => {
	const user: Ref<User | null> = ref(null);
	const oauthState: Ref<Partial<OauthState>> = ref({});
	const provider: Ref<string | null> = ref(null);
	const hasInitializedAuth: Ref<boolean> = ref(false);
	const isAuthenticated = computed(() => !!user.value?.id || true);

	return {
		user,
		hasInitializedAuth,
		isAuthenticated,
		oauthState,
		$reset() {
			user.value = null;
			oauthState.value = {};
			provider.value = null;
			hasInitializedAuth.value = false;
		},
		async getMe() {
			try {
				const response = await axios.get<{ user: User }>('http://localhost:8000/api/me', {
					withCredentials: true // TODO: global config
				});

				hasInitializedAuth.value = true;
				user.value = response.data.user;

				return user;
			} catch (e) {
				user.value = null;
			}
		},
		async keepAlive() {
			try {
				await axios.head<{}>('http://localhost:8000/api/me', {
					withCredentials: true // TODO: global config
				});
			} catch (e) {
				user.value = null;
			}
		},
		async login({ provider, returnUrl, oauthState }: { provider: string, returnUrl: string, oauthState: OauthState }) {
			const state = JSON.stringify(oauthState);
			const response = await axios.post('http://localhost:8000/api/auth', { // TODO: get routes into a config file somewhere
				returnUrl,
				provider,
				state
			}, {
				withCredentials: true
			});

			const { redirectUrl } = response.data;

			if (redirectUrl) {
				window.location.href = redirectUrl;
			}
		},
		async loginCallback(payload: { code: string | null; provider: string; idToken: string | null }) {
			const callbackResponse = await axios.post<{ state: string; provider: string }>('http://localhost:8000/api/auth/callback',
				payload,
				{
					withCredentials: true // TODO: global config
				}
			);
			await this.getMe();

			const _oauthState = callbackResponse.data.state;
			const _provider = callbackResponse.data.provider;

			oauthState.value = JSON.parse(_oauthState) as OauthState;
			provider.value = _provider;

			return {
				returnRoute: oauthState.value.returnRoute,
				user
			}
		},
		async logout(payload: { returnUrl: string }) {
			const response = await axios.post<{ redirectUrl?: string }>('http://localhost:8000/api/logout', payload, {
				withCredentials: true // TODO: global config
			});

			const { redirectUrl } = response.data;

			if (redirectUrl) {
				window.location.href = redirectUrl;
			} else {
				this.$reset();
			}
		},
	}
});