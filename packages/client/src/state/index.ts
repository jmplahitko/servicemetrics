import { createPinia } from 'pinia';
import { ModalStore } from './controls/modal';
import { SideMenuStore } from './controls/side-menu';
import { ThemeStore } from './controls/theme';
import { ProjectStore } from './projects'

export type StoreMap = {
	projects: ProjectStore;
	modal: ModalStore;
	sideMenu: SideMenuStore;
	theme: ThemeStore;
}

export const pinia = createPinia();