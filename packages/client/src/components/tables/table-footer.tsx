import { defineComponent } from 'vue';

export default defineComponent({
	render() {
		return (
			<div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
				<div class="flex items-center col-span-3">{this.$slots.left?.()}</div>
				<div class="flex items-center justify-center col-span-3">{this.$slots.center?.()}</div>
				<div class="flex col-span-3 mt-2 sm:mt-auto sm:justify-end">{this.$slots.right?.()}</div>
			</div>
		)
	}
});