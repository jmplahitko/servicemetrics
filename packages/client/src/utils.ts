import Chart, { ChartData } from 'chart.js/auto';


export const updateChart = (chart: Chart, data: ChartData) => {
	chart.data = data;
	chart.update();
}