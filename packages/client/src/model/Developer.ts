export type Bit = 0 | 1;

export type Developer = {
	id: number;
	username: string;
	active: Bit;
	firstName: string;
	lastName: string;
	email: string;
}