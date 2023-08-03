import { v4 } from "uuid";
import type { Api } from "../models/api.model";

export interface DomainStoryParser {
  domain: string;
  dst: string;
}

interface DomainParser {
  name: string;
  actors: object;
  workObjects: object;
}

export enum DomainStoryType {
  WorkObejct = "domsinStory:Workobject",
  TextAnnotation = "domainStory:textAnnotation",
  Activity = "domainStory:activity",
  Connection = "domainStory:connection",
}

export const parse_domain_story_type = (input: string): DomainStoryType => {
  switch (input) {
    case "domainStory:textAnnotation":
      return DomainStoryType.TextAnnotation;

    case "domainStory:activity":
      return DomainStoryType.Activity;

    default:
      return DomainStoryType.WorkObejct;
  }
};

export interface Domain {
  name: string;
  actors: Map<string, string>;
  work_objects: Map<string, string>;
}

export class DomainImpl implements Domain {
  name: string;
  actors: Map<string, string>;
  work_objects: Map<string, string>;

  constructor(name: string, actors: Map<string, string>, work_objects: Map<string, string>) {
    this.name = name;
    this.actors = actors;
    this.work_objects = work_objects;
  }
}

export interface DomainStory {
  domain: Domain;
  dsts: Map<string, string>[];
  api: Api;
}

export class DomainStoryImpl implements DomainStory {
  domain: Domain;
  dsts: Map<string, string>[];
  api: Api;

  constructor(domain: Domain, dsts: Map<string, string>[], api: Api) {
    this.domain = domain;
    this.dsts = dsts;
    this.api = api;
  }
}

export enum Type {
  DomainStoryElement = "DomainStory",
  Endpoint = "Endpoint",
  Mapping = "Mapping",
  Activity = "Activity",
}

export const parse = (input: string) => {
  const raw: DomainStoryParser = JSON.parse(input);
  const raw_domain: DomainParser = JSON.parse(raw.domain);

  const name = raw_domain.name;
  const actors = new Map(Object.entries(raw_domain.actors));
  const work_objects = new Map(Object.entries(raw_domain.workObjects));

  const domain: Domain = { name, actors, work_objects };

  const raw_dsts: [] = JSON.parse(raw.dst);

  const mapped_dsts = raw_dsts.map(
    (dst) => new Map(Object.entries<string>(dst))
  );

  const dsts = mapped_dsts
    .filter((dst) => dst.get("type"))
    .filter((dst) => dst.get("type") != DomainStoryType.TextAnnotation)
    .filter((dst) => {
      if (dst.get("type") === DomainStoryType.Activity) {
        return dst.get("number");
      } else {
        return true;
      }
    });

  dsts.forEach((dst) => dst.set("dq_id", v4()));

  return {
    domain,
    dsts,
  };
};
