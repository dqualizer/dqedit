export enum ObjectType {
	Module,
	Class,
	Interface,
	Variable
}

export enum ActivityType {
	Method,
	Class
}

interface DqObject {
	dq_id: string;
	name: string;
	operation_id: string;
	type: ObjectType;
	implements: string[];
	objects: string[];
	activities: Activity[];
}

export interface DQ {
	version: number;
	context: string;
	server_info: { host: string; environment: string }[];
	objects: DqObject[];
}

interface Activity {
	dq_id: string;
	name: string;
	operation_id: string;
	type: ActivityType;
	parameter: string[];
	endpoint: Endpoint;
}

interface Response {
	expected_code: number;
	type: string;
}

interface Endpoint {
	field: string;
	operation: string;
	path_variables: string;
	parameter: string;
	payload: string;
	responses: Response[];
}
