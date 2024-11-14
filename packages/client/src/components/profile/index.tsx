import { defineComponent, ref, useTemplateRef } from 'vue';
import AvatarButton from '../buttons/avatar-button';
import { onClickOutside, onKeyDown } from '@vueuse/core';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/16/solid';
import { useAuthStore } from '../../state/auth';

export default defineComponent({
	setup() {
		const authStore = useAuthStore();
		const isOpen = ref(false);
		const dropdownRef = useTemplateRef<HTMLElement>('dropdownRef');

		function toggle() {
			isOpen.value = !isOpen.value
		}

		function close() {
			isOpen.value = false;
		}

		function logout() {
			authStore.logout({ returnUrl: window.location.origin })
				.then(() => close());
		}

		onClickOutside(dropdownRef, () => close());
		onKeyDown('Escape', () => isOpen.value && close());

		return {
			isOpen,
			close,
			toggle,
			logout
		}
	},
	render() {
		return (
			<li class="relative">
				<AvatarButton
					src="../assets/img/jp_logo-01.svg"
					onClick={() => this.toggle()}
				></AvatarButton>
				{this.isOpen && <ul
					ref="dropdownRef"
					class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
					aria-label="submenu">
					<li class="flex">
						<a class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
							onClick={() => this.logout()}
						>
							<ArrowLeftStartOnRectangleIcon class="w-4 h-4 mr-3" />
							<span>Log out</span>
						</a>
					</li>
				</ul>}
			</li>
		)
	}
});