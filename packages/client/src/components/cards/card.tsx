import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		shadow: {
			type: Boolean as PropType<boolean>,
			default: true
		}
	},
	render() {
		return (
			<div class={[`px-4 py-3 mb-8 bg-white rounded-lg dark:bg-gray-800`, { 'shadow-md': this.shadow }]}>
				{this.$slots.heading && <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
					{this.$slots.heading()}
				</h4>}
				{this.$slots.default?.()}
			</div>
		)
	}
})