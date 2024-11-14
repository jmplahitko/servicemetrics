const t=`<div class="container px-6 mx-auto grid" x-data="{ project: $store.projects.currentProject }">
	<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200" x-text="project.projectName  + ' - ' + project.versionName"></h2>

	<div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
		<h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
			Issue Progress
		</h4>
		<div class="relative h8">
			<canvas id="issue-progress" width="100%"></canvas>
		</div>
	</div>

	<div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-6">
		<!-- Card -->
		<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
			<div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
				</svg>
			</div>
			<div>
				<p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
					Stories
				</p>
				<p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
					<span x-text="project.completedStories"></span>
					<span class="text-gray-600 dark:text-gray-400">&#47;</span>
					<span class="text-gray-600 dark:text-gray-400" x-text="project.totalStories"></span>
				</p>
			</div>
		</div>
		<!-- Card -->
		<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
			<div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
					<path
						d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
				</svg>
			</div>
			<div>
				<p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
					Improvements
				</p>
				<p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
					<span x-text="project.completedImprovements"></span>
					<span class="text-gray-600 dark:text-gray-400">&#47;</span>
					<span class="text-gray-600 dark:text-gray-400" x-text="project.totalImprovements"></span>
				</p>
			</div>
		</div>
		<!-- Card -->
		<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
			<div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
				</svg>
			</div>
			<div>
				<p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
					Tasks
				</p>
				<p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
					<span x-text="project.completedTasks"></span>
					<span class="text-gray-600 dark:text-gray-400">&#47;</span>
					<span class="text-gray-600 dark:text-gray-400" x-text="project.totalTasks"></span>
				</p>
			</div>
		</div>
		<!-- Card -->
		<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
			<div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round"
						d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
				</svg>
			</div>
			<div>
				<p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
					Bugs
				</p>
				<p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
					<span x-text="project.completedBugs"></span>
					<span class="text-gray-600 dark:text-gray-400">&#47;</span>
					<span class="text-gray-600 dark:text-gray-400" x-text="project.totalBugs"></span>
				</p>
			</div>
		</div>
		<!-- Card -->
		<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 col-span-2">
			<div class="p-3 mr-4 rounded-full" :class="{ 'bg-green-500': project.bugRate < .76, 'bg-orange-500': project.bugRate < 1 && project.bugRate > .75, 'bg-red-500': project.bugRate > 1 }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
					<path fillRule="evenodd"
						d="M8.478 1.6a.75.75 0 0 1 .273 1.026 3.72 3.72 0 0 0-.425 1.121c.058.058.118.114.18.168A4.491 4.491 0 0 1 12 2.25c1.413 0 2.673.651 3.497 1.668.06-.054.12-.11.178-.167a3.717 3.717 0 0 0-.426-1.125.75.75 0 1 1 1.298-.752 5.22 5.22 0 0 1 .671 2.046.75.75 0 0 1-.187.582c-.241.27-.505.52-.787.749a4.494 4.494 0 0 1 .216 2.1c-.106.792-.753 1.295-1.417 1.403-.182.03-.364.057-.547.081.152.227.273.476.359.742a23.122 23.122 0 0 0 3.832-.803 23.241 23.241 0 0 0-.345-2.634.75.75 0 0 1 1.474-.28c.21 1.115.348 2.256.404 3.418a.75.75 0 0 1-.516.75c-1.527.499-3.119.854-4.76 1.049-.074.38-.22.735-.423 1.05 2.066.209 4.058.672 5.943 1.358a.75.75 0 0 1 .492.75 24.665 24.665 0 0 1-1.189 6.25.75.75 0 0 1-1.425-.47 23.14 23.14 0 0 0 1.077-5.306c-.5-.169-1.009-.32-1.524-.455.068.234.104.484.104.746 0 3.956-2.521 7.5-6 7.5-3.478 0-6-3.544-6-7.5 0-.262.037-.511.104-.746-.514.135-1.022.286-1.522.455.154 1.838.52 3.616 1.077 5.307a.75.75 0 1 1-1.425.468 24.662 24.662 0 0 1-1.19-6.25.75.75 0 0 1 .493-.749 24.586 24.586 0 0 1 4.964-1.24h.01c.321-.046.644-.085.969-.118a2.983 2.983 0 0 1-.424-1.05 24.614 24.614 0 0 1-4.76-1.05.75.75 0 0 1-.516-.75c.057-1.16.194-2.302.405-3.417a.75.75 0 0 1 1.474.28c-.164.862-.28 1.74-.345 2.634 1.237.371 2.517.642 3.832.803.085-.266.207-.515.359-.742a18.698 18.698 0 0 1-.547-.08c-.664-.11-1.311-.612-1.417-1.404a4.535 4.535 0 0 1 .217-2.103 6.788 6.788 0 0 1-.788-.751.75.75 0 0 1-.187-.583 5.22 5.22 0 0 1 .67-2.04.75.75 0 0 1 1.026-.273Z"
						clipRule="evenodd" />
				</svg>
			</div>
			<div class="flex-1 w-32">
				<p class="mb-2 text-sm font-medium" :class="{ 'text-green-500': project.bugRate < .76, 'text-orange-500': project.bugRate < 1 && project.bugRate > .75, 'text-red-500': project.bugRate > 1 }">
					Bugs Found
				</p>
				<p class="text-lg font-semibold" :class="{ 'text-green-500': project.bugRate < .76, 'text-orange-500': project.bugRate < 1 && project.bugRate > .75, 'text-red-500': project.bugRate > 1 }"
					x-text="project.bugsFound"></p>
			</div>
			<div class="flex-1 w-32">
				<p class="mb-2 text-sm font-medium" :class="{ 'text-green-500': project.bugRate < .76, 'text-orange-500': project.bugRate < 1 && project.bugRate > .75, 'text-red-500': project.bugRate > 1 }">
					Bug Rate
				</p>
				<p class="text-lg font-semibold" :class="{ 'text-green-500': project.bugRate < .76, 'text-orange-500': project.bugRate < 1 && project.bugRate > .75, 'text-red-500': project.bugRate > 1 }"
					x-text="project.bugRate"></p>
			</div>
		</div>
	</div>

	<div class="grid gap-6 mb-8 md:grid-cols-5">
		<div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 col-span-3">
			<h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
				Complexity vs. Performance
			</h4>
			<div>
				<canvas id="complexity-vs-performance"></canvas>
			</div>
			<div class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
				<div class="flex items-center">
					<span class="inline-block w-3 h-3 mr-1 bg-blue-600 rounded-full"></span>
					<span>Below Average</span>
				</div>
				<div class="flex items-center">
					<span class="inline-block w-3 h-3 mr-1 bg-yellow-600 rounded-full"></span>
					<span>Above Average</span>
				</div>
			</div>
		</div>
	</div>
</div>`;export{t as default};
