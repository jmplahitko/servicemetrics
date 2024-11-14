import { Employee } from './Employee';

export type Job = {
	"id": string;
	"customer": {
		"id": string,
		"first_name": string,
		"last_name": string,
		"lead_source": null,
		"created_at": string,
		"updated_at": string,
		"tags": string[]
	},
	"address": {
		"zip": string,
	},
	"work_status": string,
	"work_timestamps": {
		"on_my_way_at": string | null,
		"started_at": string | null,
		"completed_at": string | null
	},
	"schedule": {
		"scheduled_start": string,
		"scheduled_end": string,
		"arrival_window": number
	},
	"total_amount": number,
	"outstanding_balance": number,
	"assigned_employees": Employee[],
	"tags": string[],
	"lead_source": string | null,
	"created_at": string,
	"updated_at": string,
}

export enum JobStatus {
	inProgress = 'in progress',
	completeUnrated = 'complete unrated',
	scheduled = 'scheduled',
	completedRated = 'complete rated',
	userCancelled = 'user canceled',
	proCancelled = 'pro canceled'
}