import type { DSTElement } from "$models/domainstory/DSTElement";

export interface Activity extends DSTElement {
  action: string;
  number: number;
  initiators: string[];
  targets: string[];
  work_objects: string[];
}
