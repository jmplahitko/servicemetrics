import { defineComponent, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../state/auth';

export default defineComponent({
	props: {
		provider: {
			required: true,
			type: String as PropType<string>
		}
	},
	setup() {
		const route = useRoute();
		const query = route.query;
		const code = query.code as string;
		const error = query.error as string | null;
		const errorDescription = query.error_description as string | null;
		const idToken = query.id_token as string | null;

		const { isAuthenticated, loginCallback } = useAuthStore();

		return {
			code,
			error,
			errorDescription,
			idToken,
			isAuthenticated,
			loginCallback
		}
	},
	created() {
		const externalAuthInfo = {
			code: this.code,
			idToken: this.idToken,
			provider: this.provider
		}

		if (this.isAuthenticated) {
			this.$router.replace({ name: 'dashboard' });
		} else if (!this.error) {
			return this.loginCallback(externalAuthInfo).then(({ returnRoute }) => {

				if (returnRoute) {
					this.$router.replace(returnRoute);
				} else {
					this.$router.replace({ name: 'dashboard' });
				}
			})
		}
	},
	render() {
		return (
			<div class="flex items-center justify-center overflow-y-auto">
				<div class="flex p-6 sm:p-12 md:w-1/2">
					<div class="w-full">
						{
							this.error
								? <p>{this.errorDescription}</p>
								: <p>Getting your info, bro...</p>
						}
					</div>
				</div>
			</div>
		)
	}
});