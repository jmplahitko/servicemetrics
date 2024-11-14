
export type SizeMap = Record<SizeKey, SizeConfig>;
export type SizeKey = 'sm' | 'md' | 'lg' | 'xl';
export type SizeConfig = {
	default: string;
	compact: string
}

export const sizeMap: SizeMap = {
	sm: {
		default: 'px-1 py-1 text-sm font-medium',
		compact: 'px-1 py-1 text-sm font-medium',
	},
	md: {
		default: 'px-4 py-2 text-sm font-medium',
		compact: 'px-2 py-2 text-sm font-medium',
	},
	lg: {
		default: 'px-5 py-3 font-medium',
		compact: 'px-3 py-3 font-medium',
	},
	xl: {
		default: 'px-10 py-4 font-medium',
		compact: 'px-4 py-4 font-medium',
	},
};