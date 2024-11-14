import { defineComponent, PropType } from 'vue';
import { ColorKey, colorMap } from '../../constants/color-map';
import { SizeKey, sizeMap } from '../../constants/size-map';

export default defineComponent({
	props: {
		color: {
			required: true,
			type: String as PropType<ColorKey>
		},
		size: {
			required: true,
			type: String as PropType<SizeKey>
		},
		compact: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		disabled: {
			required: false,
			type: Boolean as PropType<boolean>
		},
		title: {
			required: false,
			type: String as PropType<string>,
			default: ''
		}
	},
	emits: ['click'],
	render() {
		return (
			<button
				class={`flex items-center justify-between leading-5 
					transition-colors duration-150 border border-transparent rounded-lg 
					${colorMap[this.color].button} 
					${colorMap[this.color].interaction}
					${this.compact ? sizeMap[this.size].compact : sizeMap[this.size].default}
				`}
				title={this.title}
				onClick={(e) => this.$emit('click', e)}
			>
				{<span class="mr-2 -ml-1">{this.$slots.iconleft?.()}</span>}
				<span>{this.$slots.default?.()}</span>
				{<span>{this.$slots.iconright?.()}</span>}
			</button>
		)
	}
})