import tailwindConfig from '../../tailwind.config';

export type ColorMap = Record<ColorKey, ColorConfig>;
export type ColorKey = keyof typeof tailwindConfig.theme.colors;
export type ColorConfig = {
	button: string;
	text: { hv: string, md: string, lt: string };
	interaction: string;
}

export const colorMap: ColorMap = {
	transparent: {
		button: 'bg-transparent bg-gray-700 text-gray-700 dark:text-gray-500',
		text: {
			hv: '',
			md: '',
			lt: ''
		},
		interaction: 'active:bg-gray-500 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray'
	},
	white: {
		button: 'bg-white text-gray-700',
		text: {
			hv: 'text-white',
			md: 'text-white',
			lt: 'text-white'
		},
		interaction: 'active:white hover:bg-gray-100 focus:outline-none focus:shadow-outline-gray'
	},
	black: {
		button: 'bg-black text-gray-100',
		text: {
			hv: 'text-black',
			md: 'text-black',
			lt: 'text-black'
		},
		interaction: 'active:bg-black hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray'
	},
	gray: {
		button: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100',
		text: {
			hv: 'text-gray-700 dark:text-gray-500',
			md: 'text-gray-600 dark:text-gray-400',
			lt: 'text-gray-500 dark:text-gray-300'
		},
		interaction: 'active:bg-gray-700 hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray'
	},
	'cool-gray': {
		button: 'bg-cool-gray-100 text-cool-gray-700 dark:bg-cool-gray-700 dark:text-cool-gray-100',
		text: {
			hv: 'text-cool-gray-700 dark:text-cool-gray-500',
			md: 'text-cool-gray-600 dark:text-cool-gray-400',
			lt: 'text-cool-gray-500 dark:text-cool-gray-300'
		},
		interaction: 'active:bg-cool-gray-700 hover:bg-cool-gray-800 focus:outline-none focus:shadow-outline-cool-gray'
	},
	red: {
		button: 'bg-red-100 text-red-700 bg-red-700 dark:text-red-100',
		text: {
			hv: 'text-red-700 dark:text-red-500',
			md: 'text-red-600 dark:text-red-400',
			lt: 'text-red-500 dark:text-red-300'
		},
		interaction: 'active:bg-red-700 hover:bg-red-800 focus:outline-none focus:shadow-outline-red'
	},
	orange: {
		button: 'bg-orange-50 text-orange-600 dark:bg-orange-600 dark:text-orange-50',
		text: {
			hv: 'text-orange-700 dark:text-orange-500',
			md: 'text-orange-600 dark:text-orange-400',
			lt: 'text-orange-500 dark:text-orange-300'
		},
		interaction: 'active:bg-orange-600 hover:bg-orange-700 focus:outline-none focus:shadow-outline-orange'
	},
	yellow: {
		button: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-50',
		text: {
			hv: 'text-yellow-700 dark:text-yellow-500',
			md: 'text-yellow-600 dark:text-yellow-400',
			lt: 'text-yellow-500 dark:text-yellow-300'
		},
		interaction: 'active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow'
	},
	green: {
		button: 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100',
		text: {
			hv: 'text-green-700 dark:text-green-500',
			md: 'text-green-600 dark:text-green-400',
			lt: 'text-green-500 dark:text-green-300'
		},
		interaction: 'active:bg-green-700 hover:bg-green-800 focus:outline-none focus:shadow-outline-green'
	},
	teal: {
		button: 'bg-teal-100 text-teal-700 dark:bg-teal-700 dark:text-teal-100',
		text: {
			hv: 'text-teal-700 dark:text-teal-500',
			md: 'text-teal-600 dark:text-teal-400',
			lt: 'text-teal-500 dark:text-teal-300'
		},
		interaction: 'active:bg-teal-700 hover:bg-teal-800 focus:outline-none focus:shadow-outline-teal'
	},
	blue: {
		button: 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100',
		text: {
			hv: 'text-blue-700 dark:text-blue-500',
			md: 'text-blue-600 dark:text-blue-400',
			lt: 'text-blue-500 dark:text-blue-300'
		},
		interaction: 'active:bg-blue-700 hover:bg-blue-800 focus:outline-none focus:shadow-outline-blue'
	},
	indigo: {
		button: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100',
		text: {
			hv: 'text-indigo-700 dark:text-indigo-500',
			md: 'text-indigo-600 dark:text-indigo-400',
			lt: 'text-indigo-500 dark:text-indigo-300'
		},
		interaction: 'active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo'
	},
	purple: {
		button: 'bg-purple-100 text-purple-600 dark:bg-purple-600 dark:text-purple-100',
		text: {
			hv: 'text-purple-700 dark:text-purple-500',
			md: 'text-purple-600 dark:text-purple-400',
			lt: 'text-purple-500 dark:text-purple-300'
		},
		interaction: 'active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'
	},
	pink: {
		button: 'bg-pink-100 text-pink-700 dark:bg-pink-700 dark:text-pink-100',
		text: {
			hv: 'text-pink-700 dark:text-pink-500',
			md: 'text-pink-600 dark:text-pink-400',
			lt: 'text-pink-500 dark:text-pink-300'
		},
		interaction: 'active:bg-pink-700 hover:bg-pink-700 focus:outline-none focus:shadow-outline-pink'
	},
};