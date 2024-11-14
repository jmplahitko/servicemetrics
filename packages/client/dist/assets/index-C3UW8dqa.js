const t=`<div class="container px-6 mx-auto grid">
	<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Active Projects</h2>
	<!--	<div class="grid gap-6 mb-8 md:grid-cols-3">
		<div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
			<h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
				Complexity vs. Performance
			</h4>
			<canvas id="complexity-vs-performance"></canvas>
			<div
				class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
			>
				Chart legend
				<div id="" class="flex items-center">
					<span
						class="inline-block w-3 h-3 mr-1 bg-teal-500 rounded-full"
					></span>
					<span>Average</span>
				</div>
			</div>
		</div>
	</div> -->

	<div class="min-w-0 px-6 bg-white rounded-lg shadow-xs dark:bg-gray-800">
		<div class="w-full overflow-x-auto">
			<table class="w-full whitespace-no-wrap table-fixed">
				<!--<thead>
					<tr
						class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
					>
						<th class="px-4 py-3">Project</th>
						<th class="px-4 py-3">Key</th>
						<th class="px-4 py-3">Version</th>
						<th></th>
					</tr>
				</thead>-->
				<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" x-data="{ projects: $store.projects.activeProjects }">
					<template x-for="project in projects">
						<tr class="text-gray-700 dark:text-gray-400">
							<td class="px-4 py-3">
								<div class="flex items-center text-sm">
									<!-- Avatar with inset shadow -->
									<div class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
										x-data="{ url: 'https://jira.ai.org/secure/projectavatar?pid=' + project.projectId + '&avatarId=' + project.projectAvatarId }">
										<img class="object-cover w-full h-full rounded-full" :src="url" alt="" loading="lazy" />
										<div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
									</div>
									<div>
										<p class="font-semibold">
											<a :href="'/projects/' + project.versionId" data-navigo x-text="project.projectName"></a>
										</p>
										<!--<p class="text-xs text-gray-600 dark:text-gray-400" x-text="project.projectDescription"></p>-->
									</div>
								</div>
							</td>
							<td class="px-4 py-3 text-sm" x-text="project.projectKey"></td>
							<td class="px-4 py-3 text-sm" x-text="project.versionName"></td>
							<td>
								<div class="relative h-8">
									<canvas :id="'issue-progress-' + project.projectKey + '-' + project.versionId"></canvas>
								</div>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</div>`;export{t as default};
