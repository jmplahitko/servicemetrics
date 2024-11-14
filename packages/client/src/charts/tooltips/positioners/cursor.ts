import { TooltipPositionerFunction } from 'chart.js';

export const cursor: TooltipPositionerFunction<'bar' | 'line'> = (chartEls, coords) => ({
	x: coords.x,
	y: coords.y
});