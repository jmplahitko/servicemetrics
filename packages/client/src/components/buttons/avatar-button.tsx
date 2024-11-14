import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		src: {
			type: String as PropType<string>,
			default: ''
		}
	},
	emits: ['click'],
	render() {
		return (
			<button class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
				onClick={(e) => this.$emit('click', e)}>
				<img class="object-cover w-8 h-8 rounded-full"
					src={this.src} alt="Avatar"
					aria-hidden="true" />
			</button>
		)
	}
})