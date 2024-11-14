import { defineComponent } from 'vue';
import TableContainer from '../../components/tables/table-container';
import TableRow from '../../components/tables/table-row';
import TableCell from '../../components/tables/table-cell';
import Page from '../../components/page';
import AvatarTitle from '../../components/avatars/avatar-title';
import { useEmployeeStore } from '../../state/employees';
import { RouterLink } from 'vue-router';
// import Button from '../../components/buttons/button';
// import { PencilIcon } from '@heroicons/vue/24/outline';
// import { TrashIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
	setup() {
		const employeeStore = useEmployeeStore();
		const employees = employeeStore.employees;

		return () => (
			<Page header="Employees">
				{/* <Button size="md" color="transparent" compact>
					<PencilIcon class="size-5" />
				</Button>
				<Button size="md" color="white">
					Special Button
				</Button> */}
				<TableContainer>{{
					default: () => <>
						{
							employees.map(employee => (
								<TableRow>
									<TableCell>
										<AvatarTitle src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ">{{
											default: () => <RouterLink to={{ 'name': 'employee', params: { id: employee.id } }}>{`${employee.first_name} ${employee.last_name}`}</RouterLink>,
											subtitle: () => employee.email
										}}</AvatarTitle>
									</TableCell>
									<TableCell>
										{employee.role}
									</TableCell>
								</TableRow>
							))
						}
					</>,
					// tbottom: () => <TableFooter>{{
					// 	left: () => 'Showing 21-30 of 100',
					// 	right: () => (
					// 		<nav aria-label="Table navigation">
					// 			<ul class="inline-flex items-center">
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
					// 						<svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
					// 							<path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
					// 						</svg>
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
					// 						1
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
					// 						2
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
					// 						3
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
					// 						4
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<span class="px-3 py-1">...</span>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
					// 						8
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
					// 						9
					// 					</button>
					// 				</li>
					// 				<li>
					// 					<button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
					// 						<svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
					// 							<path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
					// 						</svg>
					// 					</button>
					// 				</li>
					// 			</ul>
					// 		</nav>
					// 	)
					// }}</TableFooter>
				}}</TableContainer>
			</Page>
		)
	}
})