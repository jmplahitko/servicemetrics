import { createActiveProjectIssuesChart } from '../../charts/activeProjectIssues';
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { useProjectStore } from '../../state/projects';
import { useThemeStore } from '../../state/controls/theme';
import TableContainer from '../../components/tables/table-container';
import TableRow from '../../components/tables/table-row';
import TableCell from '../../components/tables/table-cell';
import Page from '../../components/page';
import AvatarTitle from '../../components/avatars/avatar-title';

export default defineComponent({
	mounted() {
		this.projects.forEach(project => {
			const canvas = this.$refs[project.canvasId] as HTMLCanvasElement ?? document.createElement('canvas');

			createActiveProjectIssuesChart(canvas, project, this.theme);
		})
	},
	setup() {
		const projectStore = useProjectStore();
		const themeStore = useThemeStore()

		const projects = projectStore.activeProjects.map(project => ({
			...project,
			canvasId: `issue-progress-${project.projectKey}-${project.versionId}`,
			avatarSrc: `https://jira.ai.org/secure/projectavatar?pid=${project.projectId}&avatarId=${project.projectAvatarId}`
		}));

		return {
			projects,
			theme: themeStore.config
		}
	},
	render() {
		return (
			<Page header="Active Projects">
				<TableContainer fixed>
					{
						this.projects.map(project => (
							<TableRow>
								<TableCell>
									<AvatarTitle src={project.avatarSrc}>
										<RouterLink to={{ 'name': 'project', params: { versionId: project.versionId } }}>{project.projectName}</RouterLink>
									</AvatarTitle>
								</TableCell>
								<TableCell class="text-sm">{project.projectKey}</TableCell>
								<TableCell class="text-sm">{project.versionName}</TableCell>
								<TableCell class="text-sm">
									<div class="relative h-8">
										<canvas ref={project.canvasId} id={project.canvasId}></canvas>
									</div>
								</TableCell>
							</TableRow>
						))
					}
				</TableContainer>
			</Page>
		)
	}
})