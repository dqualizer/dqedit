import type { DomainStory } from "./domainstory/DomainStory";

export interface DomainArchitectureMapping {
  id: string;
  software_system: SoftwareSystem;
  domain_story: DomainStory;
  mappings: Mapping[];
}

export interface SoftwareSystem {
  name: string;
  environment: string;
  services: Service[];
}

export interface Service {
  name: string;
  deployment_name: string;
  uri: string;
  programming_framework: ProgrammingFramework;
  programming_language: string;
  instrumentation_framework: InstrumentationFramework;
  runtime_platform_id: string;
  endpoints: Endpoint[];
  api_schema: ApiSchema;
  code_components: CodeComponent[];
}

export interface ProgrammingFramework {
  type: string;
  version: string;
}

export interface InstrumentationFramework {
  name: string;
  existing: boolean;
  has_metrics: boolean;
  has_traces: boolean;
  has_logging: boolean;
  options: { string: string }[];
}

export interface Endpoint {
  name: string;
  code_component: string;
  route: string;
  parameter: Parameter[];
  methods: string[];
  response_description: ResponseDescription;
}

export interface Parameter {
  type: string;
  data: string;
}

export interface ResponseDescription {
  format: string;
  expected_status_codes: number[];
}

export interface ApiSchema {
  version: string;
  context: string;
  api: string;
  server_info: ServerInfo[];
  field: { string: string }[];
  data_schemas: DataSchemas;
}

export interface ServerInfo {
  host: string;
  environment: string;
}

export type DataSchemas = { string: string };

export interface CodeComponent {
  name: string;
  identifier: string;
  file: string;
  type: string;
  implements?: { string: string }[];
  objects?: { string: string }[];
  activities?: { string: string }[];
  id: string;
}

export interface Mapping {
  "@type": string;
  dst_element_id: string;
  architecture_element_id: string;
}
