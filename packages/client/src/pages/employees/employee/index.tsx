import { defineComponent } from 'vue';
import Page from '../../../components/page';
import { useEmployeeStore } from '../../../state/employees';
import { useJobsStore } from '../../../state/jobs';
import { useRoute } from 'vue-router';
import { useThemeStore } from '../../../state/controls/theme';
import { createJobCountsByStatusChart } from '../../../charts/jobCountsByStatus';
import Card from '../../../components/cards/card';

export default defineComponent({
	mounted() {
		if (this.jobCounts) {
			const jobCountsCanvas = this.$refs['job-counts'] as HTMLCanvasElement ?? document.createElement('canvas');
			createJobCountsByStatusChart(jobCountsCanvas, this.jobCounts, this.theme, { mini: false });
		}
	},
	setup() {
		const route = useRoute();
		const employeeStore = useEmployeeStore();
		const jobStore = useJobsStore();
		const themeStore = useThemeStore();
		const employeeId = route.params.id as string;
		const theme = themeStore.config;
		const employee = employeeStore.employees.find(x => x.id === employeeId);
		const jobCounts = jobStore.jobCountsByStatus[employeeId];

		return {
			employee,
			jobCounts,
			theme
		}
	},
	render() {
		return (
			<Page header={`${this.employee?.first_name} ${this.employee?.last_name}`}>
				<Card>{{
					heading: () => 'Job Counts',
					default: () => <div class="relative">
						<canvas ref="job-counts" id="job-counts" width="100%"></canvas>
					</div>
				}}</Card>
			</Page>
		)
	}
})