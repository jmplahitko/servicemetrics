import { Project } from '../model/Project';
import { ComplexityPerformanceMetric } from '../model/ComplexityMetric';
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export interface ProjectStore {
	activeProjects: Project[];
	complexityMetrics: ComplexityPerformanceMetric[];
	currentProject: Project | null;
	currentProjectComplexityMetrics: ComplexityPerformanceMetric[];
	getActiveProjects(): Promise<Project[]>;
	getProjectByVersion(versionId: Project['versionId']): Promise<Project>;
	getComplexityMetrics(): Promise<ComplexityPerformanceMetric[]>;
	getComplexityMetricsByVersion(versionId: Project['versionId']): Promise<ComplexityPerformanceMetric[]>;
}

export const useProjectStore = defineStore('projects', () => {
	const activeProjects: Ref<Project[]> = ref([]);
	const complexityMetrics: Ref<ComplexityPerformanceMetric[]> = ref([]);
	const currentProject: Ref<Project | null> = ref(null);
	const currentProjectComplexityMetrics: Ref<ComplexityPerformanceMetric[]> = ref([]);

	async function getActiveProjects() {
		if (!activeProjects.value.length) {
			let _activeProjects = ((await import('../data/active-project-versions.json'))?.default ?? [])
				.map(project => ({
					...project,
					bugRate: Number(project.bugRate ?? 0) //TODO: mapping
				}));
			activeProjects.value = _activeProjects
				.filter(x => new RegExp(/^(\d)+\.(\d)+$/).test(x.versionName));
		}

		return activeProjects;
	}

	async function getProjectByVersion(versionId: number) {
		//FIXME: gross side affect in a getter
		currentProject.value = activeProjects.value.find(x => x.versionId === versionId) ?? null;

		return currentProject;
	}

	async function getComplexityMetrics() {
		if (!complexityMetrics.value.length) {
			complexityMetrics.value = (await import('../data/complexity-vs-performance.json'))?.default ?? [];
		}

		return complexityMetrics;
	}

	async function getComplexityMetricsByVersion(versionId: number) {
		currentProjectComplexityMetrics.value = complexityMetrics.value.filter(x => x.versionId === versionId);

		return currentProjectComplexityMetrics;
	}

	return {
		activeProjects,
		complexityMetrics,
		currentProject,
		currentProjectComplexityMetrics,
		getActiveProjects,
		getProjectByVersion,
		getComplexityMetrics,
		getComplexityMetricsByVersion
	}
});
