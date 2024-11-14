import { defineComponent, ref } from 'vue';
import Page from '../../components/page';
import Card from '../../components/cards/card';
import Input from '../../components/forms/input';

export default defineComponent({
	setup() {
		const test = ref('');
		return {
			test
		}
	},
	render() {
		return (
			<Page header="Forms">
				<Card>
					<Input id="test" v-model={this.test}>{{
						label: () => 'Test'
					}}</Input>
				</Card>
				{this.test}
			</Page>
		)
	}
})