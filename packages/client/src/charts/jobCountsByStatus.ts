import { ChartData } from 'chart.js';
import { createBarChart } from './bar';
import { createTooltip } from './tooltips/createTooltip';
import { JobStatus } from '../model/Job';

export function createJobCountsByStatusChart(
	canvas: HTMLCanvasElement,
	jobCounts: { [status: string]: number },
	theme: any, // TYPEME
	opts?: { mini?: boolean }
) {
	const mini = opts?.mini ?? true;

	const chartData: ChartData<'bar'> = {
		labels: ['Jobs'],
		datasets: [
			{
				label: 'Cancelled',
				data: [jobCounts[JobStatus.proCancelled] + jobCounts[JobStatus.userCancelled]],
				backgroundColor: theme.colors.gray[900],
				barThickness: 10
			},
			{
				label: 'Completed',
				data: [jobCounts[JobStatus.completeUnrated] + jobCounts[JobStatus.completedRated]],
				backgroundColor: theme.colors.green[500],
				barThickness: 10
			},
			{
				label: 'In Progress',
				data: [jobCounts[JobStatus.inProgress]],
				backgroundColor: theme.colors.orange[500],
				barThickness: 14
			},
			{
				label: 'Scheduled',
				data: [jobCounts[JobStatus.scheduled]],
				backgroundColor: theme.colors['cool-gray'][600],
				barThickness: 10,
			},
		]
	}

	return createBarChart(canvas, chartData, {
		indexAxis: 'y',
		maintainAspectRatio: false,
		skipNull: true,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false,
				usePointStyle: true,
				position: 'cursor',
				external: createTooltip,
				bodyColor: theme.colors.white,
				titleColor: theme.colors.white,
				titleFont: {
					size: 16
				}
			}
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
				display: !mini,
				ticks: {
					display: !mini,
				},
				grid: {
					display: false
				}
			},
			y: {
				stacked: true,
				display: false,
				ticks: {
					display: false,
				},
				grid: {
					display: false
				}
			},
		}
	});
}