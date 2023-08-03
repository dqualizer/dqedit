export interface Mapping {
	operation_id: string;
	type: string;
	implements: string;
	objects: string[];
}

export interface APIMapping {
	type: string;
}

export enum MappingType {
	Class = 'class',
	Method = 'method',
	Interface = 'interface'
}

export enum APIMappingType {
	Class = 'class',
	Method = 'method'
}
