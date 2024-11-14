import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

export const createBarChart = (element: HTMLCanvasElement, data: ChartData<'bar'> = { labels: [], datasets: [] }, options: Partial<ChartOptions<'bar'>> = {}) => {
	const ctx = element.getContext('2d') ?? element;

	return new Chart(ctx, {
		type: 'bar',
		data,
		options: Object.assign({}, {
			// indexAxis: 'y'
			responsive: true
		}, options)
	})
}