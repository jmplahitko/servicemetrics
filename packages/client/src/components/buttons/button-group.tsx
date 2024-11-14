import { defineComponent } from 'vue';

export default defineComponent({
	render() {
		return (
			<div class="flex items-center">
				{this.$slots.default?.()}
			</div>
		)
	}
})