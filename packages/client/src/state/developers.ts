import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Developer } from '../model/Developer';

export const useDeveloperStore = defineStore('developers', () => {
	const appDevTeam: Ref<Developer[]> = ref([]);

	async function getAppDevTeam() {
		appDevTeam.value = ((await import('../data/app-dev-team.json'))?.default ?? []) as Developer[];
	}

	return {
		appDevTeam,
		getAppDevTeam
	}
});