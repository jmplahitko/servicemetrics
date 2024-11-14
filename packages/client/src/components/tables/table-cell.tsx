
import { defineComponent } from 'vue';

export default defineComponent({
	render() {
		return (
			<td class="px-4 py-3">
				{this.$slots.default?.()}
			</td>
		)
	}
});