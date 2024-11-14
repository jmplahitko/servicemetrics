import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		modelValue: {
			type: String as PropType<string>,
			default: ''
		},
		id: {
			required: true,
			type: String as PropType<string>
		},
		placeholder: {
			type: String as PropType<string>,
			default: ''
		},
		validation: {
			required: false,
			type: {} as PropType<{ warnings?: Record<string, string>, errors?: Record<string, string> }>
		}
	},
	emits: {
		'update:modelValue': (value: string) => typeof value === 'string'
	},
	setup(props, { emit }) {
		const value = computed({
			get: () => props.modelValue,
			set: (val) => {
				emit('update:modelValue', val)
			}
		});

		const hasWarnings = computed(() => !!Object.keys(props.validation?.warnings ?? {}).length);
		const hasErrors = computed(() => !!Object.keys(props.validation?.errors ?? {}).length);

		return {
			value,
			hasWarnings,
			hasErrors
		};
	},
	render() {
		return (
			<div class="relative">
				{this.$slots.label && <label for={this.id ?? ''} class="text-gray-700 dark:text-gray-300 font-medium">{this.$slots.label()}</label>}
				<input
					class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-gray-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray rounded-md form-input"
					v-model={this.value}
					id={this.id}
					placeholder={this.placeholder}
				/>
				{this.hasWarnings && <div class="text-xs text-orange-700 dark:text-orange-400 mt-1">
					{Object.entries(this.validation?.warnings ?? {})?.map(([key, message]) => (<div data-name={key}>{message}</div>))}
				</div>}
				{this.hasErrors && <div class="text-xs text-red-700 dark:text-red-400 mt-1">
					{Object.entries(this.validation?.errors ?? {})?.map(([key, message]) => (<div data-name={key}>{message}</div>))}
				</div>}
			</div>
		)
	}
});