import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export const createTimeline = (element: HTMLCanvasElement, data: ChartData, opts?: ChartOptions) => {
	const ctx = element.getContext('2d') ?? element;
	const options = Object.assign({}, {
		// plugins: {
		// 	legend: {
		// 		display: false
		// 	}
		// },
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'second',
					tooltipFormat: 'MM/dd/yyyy h:mm:sss'
				}
			},
			y: {
				display: false,
			}
		}
	}, opts ?? {});

	return new Chart(ctx, {
		type: 'line',
		data,
		options
	});
}