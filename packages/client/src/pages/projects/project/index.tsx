import { createActiveProjectIssuesChart } from '../../../charts/activeProjectIssues';
import { createComplexityVsPerformanceChart } from '../../../charts/complexityVsPerformance';
import { defineComponent } from 'vue';
import { useProjectStore } from '../../../state/projects';
import { useThemeStore } from '../../../state/controls/theme';
import Page from '../../../components/page';
import Card from '../../../components/cards/card';
import { BookOpenIcon, BugAntIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/solid';
import DataCard from '../../../components/cards/data-card';
import { ColorKey, colorMap } from '../../../constants/color-map';

type Severity = 'low' | 'medium' | 'high';
type SeverityColorMap = Record<Severity, ColorKey>;
const severityColorMap: SeverityColorMap = {
	low: 'green',
	medium: 'orange',
	high: 'red'
}

export default defineComponent({
	mounted() {
		if (this.project) {
			const issueProgressCanvas = this.$refs['issue-progress'] as HTMLCanvasElement ?? document.createElement('canvas');
			createActiveProjectIssuesChart(issueProgressCanvas, this.project, this.theme, { mini: false });

			const complexityVsPerformanceCanvas = this.$refs['complexity-vs-performance'] as HTMLCanvasElement ?? document.createElement('canvas');
			const data = this.complexityMetrics.sort().reverse();

			createComplexityVsPerformanceChart(complexityVsPerformanceCanvas, data, this.theme);
		}
	},
	setup() {
		const projectStore = useProjectStore();
		const themeStore = useThemeStore()
		const theme = themeStore.config;
		const project = projectStore.currentProject;
		const complexityMetrics = projectStore.currentProjectComplexityMetrics;
		const bugRate = project?.bugRate ?? 0;
		const bugRateSeverity: Severity = bugRate < .76 ? 'low'
			: bugRate < 1 && bugRate > .75 ? 'medium'
				: 'high';

		return {
			project,
			complexityMetrics,
			bugRateSeverity,
			theme
		}
	},
	render() {
		return (
			<Page header={`${this.project?.projectName} - ${this.project?.versionName}`}>
				<Card>{{
					heading: () => 'Issue Progress',
					default: () => <div class="relative">
						<canvas ref="issue-progress" id="issue-progress" width="100%"></canvas>
					</div>
				}}</Card>

				<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
					<DataCard color="orange">{{
						icon: () => <BookOpenIcon class="size-5"></BookOpenIcon>,
						heading: () => 'Stories',
						data: () => <>
							<span>{this.project?.completedStories}</span>
							<span class={colorMap.gray.text.hv}> &#47; </span>
							<span class={colorMap.gray.text.hv}>{this.project?.totalStories}</span>
						</>
					}}</DataCard>
					<DataCard color="green">{{
						icon: () => <BookOpenIcon class="size-5"></BookOpenIcon>,
						heading: () => 'Improvements',
						data: () => <>
							<span>{this.project?.completedImprovements}</span>
							<span class={colorMap.gray.text.hv}> &#47; </span>
							<span class={colorMap.gray.text.hv}>{this.project?.totalImprovements}</span>
						</>
					}}</DataCard>
					<DataCard color="blue">{{
						icon: () => <WrenchScrewdriverIcon class="size-5"></WrenchScrewdriverIcon>,
						heading: () => 'Tasks',
						data: () => <>
							<span>{this.project?.completedTasks}</span>
							<span class={colorMap.gray.text.hv}> &#47; </span>
							<span class={colorMap.gray.text.hv}>{this.project?.totalTasks}</span>
						</>
					}}</DataCard>
					<DataCard color="teal">{{
						icon: () => <BugAntIcon class="size-5"></BugAntIcon>,
						heading: () => 'Bugs',
						data: () => <>
							<span>{this.project?.completedBugs}</span>
							<span class={colorMap.gray.text.hv}> &#47; </span>
							<span class={colorMap.gray.text.hv}>{this.project?.totalBugs}</span>
						</>
					}}</DataCard>
					<DataCard color={severityColorMap[this.bugRateSeverity]} colorText>{{
						icon: () => <BugAntIcon class="size-5 "></BugAntIcon>,
						heading: () => 'Bugs Found',
						data: () => this.project?.bugsFound
					}}</DataCard>
					<DataCard color={severityColorMap[this.bugRateSeverity]} colorText>{{
						icon: () => <BugAntIcon class="size-5"></BugAntIcon>,
						heading: () => 'Bug Rate',
						data: () => this.project?.bugRate
					}}</DataCard>
				</div>

				<div class="grid gap-6 mb-8 md:grid-cols-5">
					<Card class="min-w-0 col-span-3">{{
						heading: () => 'Complexity vs. Performance',
						default: () => <>
							<div>
								<canvas ref="complexity-vs-performance" id="complexity-vs-performance"></canvas>
							</div>
							<div class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
								<div class="flex items-center">
									<span class="inline-block w-3 h-3 mr-1 bg-blue-600 rounded-full"></span>
									<span>Below Average</span>
								</div>
								<div class="flex items-center">
									<span class="inline-block w-3 h-3 mr-1 bg-yellow-600 rounded-full"></span>
									<span>Above Average</span>
								</div>
							</div>
						</>
					}}</Card>
				</div>
			</Page>
		)
	}
})