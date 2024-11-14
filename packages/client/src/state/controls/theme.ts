import tailwindConfig from '../../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { ThemeConfig } from 'tailwindcss/types/config';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ThemeStore {
	dark: boolean;
	config: ThemeConfig;
	init(): void;
	toggleTheme(): void;
}

function getThemeFromLocalStorage() {
	// if user already changed the theme, use it
	if (window.localStorage.getItem('dark')) {
		return !!JSON.parse(window.localStorage.getItem('dark') ?? '');
	}

	// else return their preferences
	return (
		!!window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
}

function setThemeToLocalStorage(value: boolean) {
	window.localStorage.setItem('dark', value.toString());
}

export const useThemeStore = defineStore('theme', () => {
	const dark = ref(getThemeFromLocalStorage());
	const config = resolveConfig(tailwindConfig).theme;

	function toggleTheme() {
		dark.value = !dark.value;
		setThemeToLocalStorage(dark.value);
	}

	return {
		dark,
		config,
		toggleTheme
	}
})