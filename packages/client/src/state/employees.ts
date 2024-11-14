import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { Employee } from '../model/Employee';

export const useEmployeeStore = defineStore('employees', () => {
	const employees: Ref<Employee[]> = ref([]);

	async function getEmployees() {
		employees.value = ((await import('../data/employees/employees.json'))?.default.employees ?? []) as Employee[];
	}

	return {
		employees,
		getEmployees
	}
});