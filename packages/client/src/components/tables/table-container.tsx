import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		fixed: Boolean as PropType<boolean>
	},
	render() {
		return (
			<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
				<table class={['w-full whitespace-no-wrap', { 'table-fixed': this.fixed }]}>
					{this.$slots.thead?.()}
					<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
						{this.$slots.default?.()}
					</tbody>
					{this.$slots.tfoot?.()}
				</table>
				{this.$slots.tbottom?.()}
			</div>
		)
	}
});