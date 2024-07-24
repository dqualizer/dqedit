import type { DSTElement } from "$models/domainstory/DSTElement";

export interface Actor extends DSTElement {
  "@type": string;
}

export interface Person extends Actor {
  personName: string;
}

export interface System extends Actor {
  systemName: string;
}

export interface Group extends Actor {
  groupName: string;
}
