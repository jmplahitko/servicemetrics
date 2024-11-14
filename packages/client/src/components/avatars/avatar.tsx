import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		src: {
			required: true,
			type: String as PropType<string>
		},
		alt: {
			type: String as PropType<string>,
			default: ''
		}
	},
	render() {
		return (
			<div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
				<img class="object-cover w-full h-full rounded-full"
					src={this.src} alt={this.alt}
					loading="lazy" />
				<div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
			</div>
		)
	}
})