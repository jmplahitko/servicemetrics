
export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roleFlags: RoleFlags
}

export enum RoleFlags {
	none = 0,
	user = (1 << 0)
}