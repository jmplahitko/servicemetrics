import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface SideMenuStore {
	isSideMenuOpen: boolean;
	toggleSideMenu(): void;
	closeSideMenu(): void;
}

export const useSideMenuStore = defineStore('sideMenu', () => {
	const isSideMenuOpen = ref(false);

	function toggleSideMenu() {
		isSideMenuOpen.value = !isSideMenuOpen.value;
	}

	function closeSideMenu() {
		isSideMenuOpen.value = false;
	}

	return {
		isSideMenuOpen,
		toggleSideMenu,
		closeSideMenu
	}
});