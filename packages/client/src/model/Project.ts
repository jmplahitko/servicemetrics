
export type Project = {
	projectId: number;
	projectName: string;
	projectKey: string;
	projectUrl: string;
	projectDescription: string | null;
	projectAvatarId: string;
	versionId: number;
	versionName: string;
	versionDescription: string | null;
	releaseDate: string | null;
	startDate: string | null;
	todo: number;
	selectedForDevelopment: number;
	inProgress: number;
	done: number;
	completedStories: number;
	totalStories: number;
	completedImprovements: number;
	totalImprovements: number;
	completedTasks: number;
	totalTasks: number;
	completedBugs: number;
	totalBugs: number;
	bugsFound: number;
	bugRate: number;
}