import { TooltipPositionerFunction } from 'chart.js';
import type { StoreMap } from './state';

declare module 'ui-library-color' {
	const lightenHex = (color: string, percent: number) => string;
	const hexTransition = (from: string, to: string, steps: number) => string;
}

declare module 'alpinejs' {
	class Alpine {
		store<TName extends string>(name: TName): StoreMap[TName];
		store<TName extends string>(name: TName, store: StoreMap[TName]): void;
	}
}

declare module 'chart.js' {
	interface TooltipPositionerMap {
		cursor: TooltipPositionerFunction<'bar'>
	}
}

declare type RequestLogEntry = {
	"Id": number;
	"DateTimeUtc": string,
	"DateUtc": string,
	"Application": string,
	"Machine": string,
	"HttpMethod": string,
	"StatusCode": number,
	"StatusDescription": string | null,
	"PathInfo": string,
	"AbsoluteUri": string,
	"Username": string | null,
	"IpAddress": string,
	"Referer": string | null,
	"Session": string | null,
	"RequestBody": string | null,
	"ResponseDto": string | null,
	"RequestDuration": number
}
