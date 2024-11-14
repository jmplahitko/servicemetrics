
export type User = {
	id: string;
	firstName: string;
	lastName: string;
	roleFlags: UserRole;
}

export enum UserRole {
	none = 0,
	user = 1
}