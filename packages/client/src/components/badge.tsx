import { defineComponent, PropType } from 'vue';
import { ColorKey, colorMap } from '../constants/color-map';

export default defineComponent({
	props: {
		color: {
			required: true,
			type: String as PropType<ColorKey>
		}
	},
	render() {
		return (
			<span class={`px-2 py-1 font-semibold leading-tight rounded-full ${colorMap[this.color].button}`}>
				{this.$slots.default?.()}
			</span>
		)
	}
})