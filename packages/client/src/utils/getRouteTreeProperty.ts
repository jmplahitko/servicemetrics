import { MatcherLocation } from 'vue-router';

export function getRouteTreeProperty<T>(route: MatcherLocation, property: string) {
	const matched = Object.assign([], route.matched) as MatcherLocation[];
	const foundRoute: MatcherLocation | void = matched
		.reverse()
		.find((route: MatcherLocation) => route.meta.hasOwnProperty(property));

	return foundRoute?.meta[property] as T;
}
