import { RouteLocationRaw } from 'vue-router'

export type OauthState = {
	returnRoute: RouteLocationRaw;
	[key: string]: any;
}