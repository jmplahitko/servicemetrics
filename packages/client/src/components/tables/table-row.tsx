
import { defineComponent } from 'vue';

export default defineComponent({
	render() {
		return (
			<tr class="text-gray-700 dark:text-gray-400">
				{this.$slots.default?.()}
			</tr>
		)
	}
});