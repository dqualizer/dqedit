import type { DSTElement } from "$models/domainstory/DSTElement";

export interface WorkObject extends DSTElement {
  "@type": string;
  value_objects: string[];
}
