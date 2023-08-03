import { v4 } from "uuid";

export interface Field {
  dq_id: string;
  operation_id: string;
  operation: string;
  input: { name: string; in: string; required: boolean; type: string }[];
  body: { type: string };
  output: { type: string; expected_code: number }[];
}

export interface Api {
  version: number;
  context: string;
  api: string;
  server_info: {
    host: string;
    environment: string;
  };
  field: Map<string, Field>;
}

export class ApiImpl implements Api {
  version: number;
  context: string;
  api: string;
  server_info: {
    host: string;
    environment: string;
  };
  field: Map<string, Field>;

  constructor(
    version: number,
    context: string,
    api: string,
    server_info: { host: string; environment: string },
    field: Map<string, Field>
  ) {
    this.version = version;
    this.context = context;
    this.api = api;
    this.server_info = server_info;
    this.field = field;
  }
}

export const parse = (input: string): Api => {
  const parsed: Api = JSON.parse(input);
  parsed.field = new Map(Object.entries(parsed.field));
  parsed.field.forEach((field) => (field.dq_id = v4()));
  return parsed;
};
