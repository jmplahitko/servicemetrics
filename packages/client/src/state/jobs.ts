import { defineStore } from 'pinia';
import { Reactive, reactive } from 'vue';
import { Job, JobStatus } from '../model/Job';
import { isThisMonth } from 'date-fns';

export const useJobsStore = defineStore('jobs', () => {
	const jobs: Reactive<Record<string, Reactive<Job[]>>> = reactive({});
	const jobCountsByStatus: Reactive<Record<string, Record<JobStatus, number>>> = reactive({});

	function calculateJobCounts(jobs: Job[]) {
		return {
			[JobStatus.completeUnrated]: jobs.filter(x => x.work_status === JobStatus.completeUnrated).length,
			[JobStatus.completedRated]: jobs.filter(x => x.work_status === JobStatus.completedRated).length,
			[JobStatus.inProgress]: jobs.filter(x => x.work_status === JobStatus.inProgress).length,
			[JobStatus.proCancelled]: jobs.filter(x => x.work_status === JobStatus.proCancelled).length,
			[JobStatus.scheduled]: jobs.filter(x => x.work_status === JobStatus.scheduled).length,
			[JobStatus.userCancelled]: jobs.filter(x => x.work_status === JobStatus.userCancelled).length,
		}
	}

	async function getJobsByEmployeeId(id: string) {
		const _jobs = ((await import(`../data/jobs/${id}.json`))?.default.jobs ?? []) as Job[];
		const filtered = _jobs.filter(x => isThisMonth(x.created_at));


		jobs[id] = reactive(filtered);
		jobCountsByStatus[id] = calculateJobCounts(filtered);
	}

	return {
		jobs,
		jobCountsByStatus,
		getJobsByEmployeeId
	}
})