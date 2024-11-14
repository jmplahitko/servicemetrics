import { defineComponent } from 'vue';
import Page from '../../components/page';
import Button from '../../components/buttons/button';
import { useAuthStore } from '../../state/auth';
import { useRouter } from 'vue-router';
import { OauthState } from '../../model/auth';

export default defineComponent({
	setup() {
		const authStore = useAuthStore();
		const router = useRouter();
		const provider = 'access-indiana';
		const oidcCallbackPath = router.resolve({
			name: 'oidcCallback',
			params: { provider },
		})?.href;
		const returnUrl = `${window.location.protocol}//${window.location.host}${oidcCallbackPath}`;
		const oauthState = authStore.oauthState as OauthState;

		return () => (
			<Page>
				<div class="flex items-center justify-center overflow-y-auto">
					<div class="flex p-6 sm:p-12 md:w-1/2">
						<div class="w-full">
							<Button
								class="w-full"
								size="md"
								color="purple"
								onClick={() => authStore.login({
									provider,
									returnUrl,
									oauthState
								})}
							>Log in</Button>
						</div>
					</div>
				</div>
			</Page>
		)
	}
})