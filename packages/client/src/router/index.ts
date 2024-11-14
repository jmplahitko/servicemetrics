import { useProjectStore } from '../state/projects';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import dashboard from '../pages/dashboard';
import developers from '../pages/developers';
import projects from '../pages/projects';
import project from '../pages/projects/project';
import forms from '../pages/forms';
import { useDeveloperStore } from '../state/developers';
import home from '../pages/home';
import oidcCallback from '../pages/oidc-callback';
import { routeAuthorization } from './middlewares/routeAuthorization';
import { RoleFlags } from '../model/User';
import employees from '../pages/employees';
import { useEmployeeStore } from '../state/employees';
import employee from '../pages/employees/employee';
import { useJobsStore } from '../state/jobs';


const routes: RouteRecordRaw[] = [
	{
		name: 'home',
		path: '/',
		component: home,
	},
	{
		name: 'oidcCallback',
		props: true,
		path: '/auth/:provider/callback',
		component: oidcCallback
	},
	{
		name: 'dashboard',
		path: '/dashboard',
		component: dashboard,
		meta: {
			authorize: RoleFlags.user
		}
	},
	{
		name: 'devs',
		path: '/devs',
		component: developers,
		meta: {
			authorize: RoleFlags.user
		},
		async beforeEnter(to, from, next) {
			const developerStore = useDeveloperStore();
			await developerStore.getAppDevTeam();
			next();
		}
	},
	{
		name: 'projects',
		path: '/projects',
		component: projects,
		meta: {
			authorize: RoleFlags.user
		},
		async beforeEnter(to, from, next) {
			const projectStore = useProjectStore();
			await projectStore.getActiveProjects()
			next();
		}
	},
	{
		name: 'project',
		path: '/projects/:versionId',
		meta: {
			authorize: RoleFlags.user
		},
		component: project,
		async beforeEnter(to, from, next) {
			const projectStore = useProjectStore();
			await projectStore.getActiveProjects()
			await projectStore.getProjectByVersion(Number(to.params?.versionId));
			await projectStore.getComplexityMetrics();
			await projectStore.getComplexityMetricsByVersion(Number(to.params?.versionId));
			next();
		}
	},
	{
		name: 'employees',
		path: '/employees',
		meta: {
			authorize: RoleFlags.user
		},
		component: employees,
		async beforeEnter(to, from, next) {
			const employeeStore = useEmployeeStore();
			await employeeStore.getEmployees();

			next();
		}
	},
	{
		name: 'employee',
		path: '/employees/:id',
		meta: {
			authorize: RoleFlags.user
		},
		component: employee,
		async beforeEnter(to, from, next) {
			const employeeId = to.params.id as string;
			const employeeStore = useEmployeeStore();
			const jobsStore = useJobsStore();

			await employeeStore.getEmployees();
			await jobsStore.getJobsByEmployeeId(employeeId);

			next();
		}
	},
	{
		name: 'forms',
		path: '/forms',
		component: forms,
		meta: {
			authorize: RoleFlags.user
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
});

// router.beforeEach(routeAuthorization);

export {
	router
};