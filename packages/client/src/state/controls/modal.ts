import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface ModalStore {
	isModalOpen: boolean;
	openModal(): void;
	closeModal(): void;
}

export const useModalStore = defineStore('modal', () => {
	const isModalOpen = ref(false);

	function openModal() {
		isModalOpen.value = true;
	}

	function closeModal() {
		isModalOpen.value = false;
	}

	return {
		isModalOpen,
		openModal,
		closeModal
	}
});