import { defineComponent } from 'vue';
import { useSideMenuStore } from '../state/controls/side-menu';
import SideMenu from '../components/side-menu';
import { RouterView } from 'vue-router';
import SiteHeader from '../components/site-header';
import { useThemeStore } from '../state/controls/theme';
import { useAuthStore } from '../state/auth';


export default defineComponent({
	setup() {
		const authStore = useAuthStore();
		const sideMenuStore = useSideMenuStore();
		const themeStore = useThemeStore();

		return () => (
			<div class={['flex h-screen bg-gray-100 dark:bg-gray-900', { 'overflow-hidden': sideMenuStore.isSideMenuOpen, 'theme-dark': themeStore.dark }]}>
				{authStore.isAuthenticated && <SideMenu></SideMenu>}
				<div class="flex flex-col flex-1 w-full">
					<SiteHeader></SiteHeader>

					<main class="h-full overflow-y-auto">
						<RouterView></RouterView>
					</main>
				</div>
			</div>
		)
	}
})