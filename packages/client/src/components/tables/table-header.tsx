import { defineComponent, PropType, VNode } from 'vue';

export default defineComponent({
	props: {
		columns: {
			required: true,
			type: Array as PropType<string[] | VNode[]>
		}
	},
	render() {
		return (
			<thead>
				<tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
					{this.columns.map(column => <th class="px-4 py-3">{column}</th>)}
				</tr>
			</thead>
		)
	}
});