import { createBarChart } from './bar';
import { createTooltip } from './tooltips/createTooltip';
export function createComplexityVsPerformanceChart(canvas: HTMLCanvasElement, data: any[], theme: any) {

	return createBarChart(canvas, {
		labels: data.map((x) => x.storyPoints),
		datasets: [
			{
				// @ts-ignore
				data: data.map((x) => ({ y: x.storyPoints, x: x.avg })),
				backgroundColor: theme.colors.white,
				pointRadius: 5,
				// @ts-ignore - ts doesn't think we can do this...
				type: "scatter"
			},
			{
				data: data.map((x) => x.min === x.max
					? null
					: [x.min, x.avg]),
				barThickness: 10,
				backgroundColor: theme.colors.blue[500],
				borderRadius: {
					bottomLeft: 10,
					topLeft: 10,
				},
				borderSkipped: false,
			},
			{
				data: data.map((x) => x.min === x.max
					? null
					: x.max),
				barThickness: 10,
				backgroundColor: theme.colors.yellow[500],
				borderRadius: {
					bottomRight: 10,
					topRight: 10
				},
				borderSkipped: false,
			},
		]
	}, {
		indexAxis: 'y',
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
		scales: {
			x: {
				stacked: true,
				// display: false,
				grid: { display: false }
			},
			y: {
				stacked: true,
				// display: false,
				grid: { display: false }
			}
		}
	});
}