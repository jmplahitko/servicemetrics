import { defineComponent, PropType } from 'vue';
import Avatar from './avatar';

export default defineComponent({
	props: {
		src: {
			required: true,
			type: String as PropType<string>
		},
		alt: {
			default: '',
			type: String as PropType<string>
		}
	},
	render() {
		return (
			<div class="flex items-center text-sm">
				<Avatar src={this.src} alt={this.alt}></Avatar>
				<div>
					<p class="font-semibold">{this.$slots.default?.()}</p>
					{
						this.$slots.subtitle && <p class="text-xs text-gray-600 dark:text-gray-400">
							{this.$slots.subtitle()}
						</p>
					}
				</div>
			</div>
		);
	}
})