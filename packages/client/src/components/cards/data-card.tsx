import { computed, defineComponent, PropType } from 'vue';
import Card from './card';
import { ColorKey, colorMap } from '../../constants/color-map';

export default defineComponent({
	props: {
		color: {
			type: String as PropType<ColorKey>,
			default: 'gray'
		},
		colorText: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},
	setup({ colorText, color }) {
		const heavyTextColor = computed(() => colorText
			? colorMap[color].text.md
			: colorMap.gray.text.md
		);
		const mediumTextColor = computed(() => colorText
			? colorMap[color].text.lt
			: colorMap.gray.text.lt
		);

		return {
			heavyTextColor,
			mediumTextColor
		}
	},
	render() {
		return (
			<Card class="flex items-center">
				{this.$slots.icon && <div class={`p-3 mr-4 rounded-full ${colorMap[this.color].button}`}>
					{this.$slots.icon()}
				</div>}
				<div>
					<p class={`text-sm font-medium ${this.heavyTextColor}`}>
						{this.$slots.heading?.()}
					</p>
					<p class={`text-md font-bold ${this.mediumTextColor}`}>
						{this.$slots.data?.()}
					</p>
				</div>
			</Card>
		)
	}
})