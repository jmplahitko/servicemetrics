import { Chart, ChartTypeRegistry, FontSpec, TooltipModel } from 'chart.js';
import { toFont } from 'chart.js/helpers';

const getOrCreateTooltip = <T extends keyof ChartTypeRegistry>(chart: Chart<T>) => {
	let tooltipEl = chart.canvas.parentNode?.querySelector('div');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
		tooltipEl.style.borderRadius = '3px';
		tooltipEl.style.color = 'white';
		tooltipEl.style.opacity = '1';
		tooltipEl.style.pointerEvents = 'none';
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.transform = 'translate(-50%, 0)';
		tooltipEl.style.transition = 'all .1s ease';
		tooltipEl.style.zIndex = '60';

		const table = document.createElement('table');
		table.style.margin = '0px';

		tooltipEl.appendChild(table);
		chart.canvas.parentNode?.appendChild(tooltipEl);
	}

	return tooltipEl;
};

export const createTooltip = <T extends keyof ChartTypeRegistry>(context: { chart: Chart<T>, tooltip: TooltipModel<T> }) => {
	// Tooltip Element
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = '0';
		return;
	}

	// Set Text
	if (tooltip.body) {
		const titleLines = tooltip.title || [];
		const bodyLines = tooltip.body.map(b => b.lines);

		const tableHead = document.createElement('thead');
		const titleFont = toFont(tooltip.options.titleFont as Partial<FontSpec>);

		titleLines.forEach(title => {
			const tr = document.createElement('tr');
			tr.style.borderWidth = '0';
			tr.style.color = tooltip.options.titleColor as string;
			tr.style.fontFamily = titleFont.family;
			tr.style.fontSize = titleFont.size + 'px';
			tr.style.fontStyle = titleFont.style;
			tr.style.lineHeight = titleFont.lineHeight + 'px';

			const th = document.createElement('th');
			th.style.borderWidth = '0';
			const text = document.createTextNode(title);

			th.appendChild(text);
			tr.appendChild(th);
			tableHead.appendChild(tr);
		});


		const tableBody = document.createElement('tbody');
		const bodyFont = toFont(tooltip.options.bodyFont as Partial<FontSpec>);

		bodyLines.forEach((body, i) => {
			const colors = tooltip.labelColors[i];

			const span = document.createElement('span');
			span.style.background = colors.backgroundColor as string;
			span.style.borderColor = colors.borderColor as string;
			span.style.borderWidth = '2px';
			span.style.marginRight = '10px';
			span.style.height = '10px';
			span.style.width = '10px';
			span.style.display = 'inline-block';

			const tr = document.createElement('tr');
			tr.style.backgroundColor = 'inherit';
			tr.style.borderWidth = '0';

			const td = document.createElement('td');
			td.style.borderWidth = '0';
			td.style.color = tooltip.options.bodyColor as string;
			td.style.fontFamily = bodyFont.family;
			td.style.fontSize = bodyFont.size + 'px';
			td.style.fontStyle = bodyFont.style;
			td.style.lineHeight = bodyFont.lineHeight + 'px';

			const text = document.createTextNode(body[0]);

			td.appendChild(span);
			td.appendChild(text);
			tr.appendChild(td);
			tableBody.appendChild(tr);
		});

		const tableRoot = tooltipEl.querySelector('table');

		// Remove old children
		while (tableRoot?.firstChild) {
			tableRoot.firstChild.remove();
		}

		// Add new children
		tableRoot?.appendChild(tableHead);
		tableRoot?.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	// Display, position, and set styles for font
	tooltipEl.style.opacity = '1';
	tooltipEl.style.left = positionX + tooltip.caretX + 'px';
	tooltipEl.style.top = positionY + tooltip.caretY + 'px';
	tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};