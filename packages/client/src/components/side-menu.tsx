import { defineComponent, computed, Transition } from 'vue';
import { useSideMenuStore } from '../state/controls/side-menu';
import { RouterLink } from 'vue-router';
import { useThemeStore } from '../state/controls/theme';
import { useWindowSize } from '@vueuse/core';

export default defineComponent({
	setup() {
		const sideMenuStore = useSideMenuStore();
		const themeStore = useThemeStore();
		const { width } = useWindowSize();
		const md = Number(themeStore.config.screens.md.replace('px', ''));

		const isMediumUp = computed(() => width.value >= md);

		return {
			sideMenuStore,
			isMediumUp
		}
	},
	render() {
		return (
			<div class="flex flex-shrink-0">
				<Transition
					enterActiveClass='transition ease-in-out duration-150'
					enterFromClass='opacity-0 transform -translate-x-20'
					enterToClass='opacity-100'
					leaveActiveClass='transition ease-in-out duration-150'
					leaveFromClass='opacity-100'
					leaveToClass='opacity-0 transform -translate-x-20'
				>
					<aside class={['z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 flex-shrink-0', {
						'-left-64': !this.sideMenuStore.isSideMenuOpen && !this.isMediumUp,
						'fixed inset-y-0 mt-16': !this.isMediumUp,
						'block': this.isMediumUp
					}]}>
						<div class="py-4 text-gray-500 dark:text-gray-400">
							<a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
								Central Command
							</a>
							<ul class="mt-6">
								<li class="relative px-6 py-3">
									{this.$route.name === 'dashboard' && <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
									<RouterLink class={['inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200', { 'text-gray-800 dark:hover:text-gray-200 dark:text-gray-100': this.$route.name === 'dashboard' }]}
										to={{ name: 'dashboard' }}>
										<svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
										</svg>
										<span class="ml-4">Dashboard</span>
									</RouterLink>
								</li>
								{/* <li class="relative px-6 py-3">
									{['projects', 'project'].includes(this.$route.name as string) && <span class={['absolute inset-y-0 left-0 w-1 bg-purple-600', { 'rounded-tr-lg rounded-br-lg': this.$route.name === 'projects' }]} aria-hidden="true"></span>}
									{this.$route.name === 'project' && <span class="absolute inset-y-0 left-1 w-1 bg-purple-400 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
									<RouterLink class={['inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200', { 'text-gray-800 dark:hover:text-gray-200 dark:text-gray-100': ['projects', 'project'].includes(this.$route.name as string) }]} to={{ name: 'projects' }}>
										<svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
										</svg>
										<span class="ml-4">Projects</span>
									</RouterLink>
								</li>
								<li class="relative px-6 py-3">
									{this.$route.name === 'devs' && <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
									<RouterLink class={['inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200', { 'text-gray-800 dark:hover:text-gray-200 dark:text-gray-100': this.$route.name === 'devs' }]} to={{ name: 'devs' }}>
										<svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
										</svg>
										<span class="ml-4">Developers</span>
									</RouterLink>
								</li> */}
								<li class="relative px-6 py-3">
									{this.$route.name === 'devs' && <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
									<RouterLink class={['inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200', { 'text-gray-800 dark:hover:text-gray-200 dark:text-gray-100': this.$route.name === 'employees' }]} to={{ name: 'employees' }}>
										<svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
										</svg>
										<span class="ml-4">Employees</span>
									</RouterLink>
								</li>
							</ul>
						</div>
					</aside>
				</Transition>
				<Transition
					enterActiveClass="transition ease-in-out duration-150"
					enterFromClass="opacity-0"
					enterToClass="opacity-100"
					leaveActiveClass="transition ease-in-out duration-150"
					leaveFromClass="opacity-100"
					leaveToClass="opacity-0"
				>
					{
						this.sideMenuStore.isSideMenuOpen && <div class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center md:hidden"></div>
					}
				</Transition>
			</div>
		)
	}
});