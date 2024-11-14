import { ChartData } from 'chart.js';
import { createBarChart } from './bar';
import { createTooltip } from './tooltips/createTooltip';

export function createActiveProjectIssuesChart(
	canvas: HTMLCanvasElement,
	issueCounts: { done: number, selectedForDevelopment: number, inProgress: number, todo: number },
	theme: any, // TYPEME
	opts?: { mini?: boolean }
) {
	const mini = opts?.mini ?? true;

	const chartData: ChartData<'bar'> = {
		labels: ['Issues'],
		datasets: [
			{
				label: 'Completed',
				data: [issueCounts.done || null],
				backgroundColor: theme.colors.green[500],
				barThickness: 10
			},
			{
				label: 'Selected for Development',
				data: [issueCounts.selectedForDevelopment || null],
				backgroundColor: theme.colors.yellow[500],
				barThickness: 14
			},
			{
				label: 'In Progress',
				data: [issueCounts.inProgress || null],
				backgroundColor: theme.colors.orange[500],
				barThickness: 14
			},
			{
				label: 'Remaining',
				data: [issueCounts.todo || null],
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