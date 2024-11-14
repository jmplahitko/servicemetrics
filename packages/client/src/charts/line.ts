import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

export const createLineGraph = (element: HTMLCanvasElement, data: ChartData<'line'> = { labels: [], datasets: [] }, options: Partial<ChartOptions<'line'>> = {}) => {
	const ctx = element.getContext('2d') ?? element;

	return new Chart(ctx, {
		type: 'line',
		data,
		options: Object.assign({}, {
			// indexAxis: 'y'
			responsive: true
		}, options)
	})
}