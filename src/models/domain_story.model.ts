import { type Edge, MarkerType, type Node } from "@xyflow/svelte";

enum DomainStoryType {
  ActorSystem = "domainStory:actorSystem",
  WorkObject = "domainStory:Workobject",
  WorkObjectDocument = "domainStory:workObjectDocument",
  TextAnnotation = "domainStory:textAnnotation",
  Activity = "domainStory:activity",
  Connection = "domainStory:connection",
}

interface DSTModel {
  type: DomainStoryType;
  name: string;
  id: string;
  number: number;
  pickedColor: string;
  $type: string;
  waypoints: { original: { x: number; y: number }; x: number; y: number }[];
  source?: string;
  target?: string;
}

interface Identifiable {
  id: string;
}

interface DSTElement extends Identifiable {
  name: string;
}

class Actor implements DSTElement {
  name: string;
  id: string;
  constructor({ name, id }: { name: string; id: string }) {
    this.name = name;
    this.id = id;
  }
}

class Person extends Actor {
  personName: string;

  constructor({ name, id }: { name: string; id: string }) {
    super({ name, id });
    this.personName = name;
  }
}

class System extends Actor {
  systemName: string;

  constructor({ name, id }: { name: string; id: string }) {
    super({ name, id });
    this.systemName = name;
  }
}

class Group extends Actor {
  groupName: string;

  constructor({ name, id }: { name: string; id: string }) {
    super({ name, id });
    this.groupName = name;
  }
}

class WorkObject implements DSTElement {
  name: string;
  id: string;
  constructor({ name, id }: { name: string; id: string }) {
    this.name = name;
    this.id = id;
  }
}

class Activity implements DSTElement {
  name: string;
  id: string;
  source: string;
  target: string;
  numuber?: number;

  constructor({
    name,
    id,
    source,
    target,
    number,
  }: {
    name: string;
    id: string;
    source: string;
    target: string;
    number?: number;
  }) {
    this.name = name;
    this.id = id;
    this.source = source;
    this.target = target;
    this.numuber = number;
  }
}

interface Domain {
  name: string;
  actors: Map<string, string>;
  workObjects: Map<string, string>;
}

type DomainStoryEelement = Actor | WorkObject | Activity;

export class DST {
  domain: Domain;
  domainstoryElements: DomainStoryEelement[];

  constructor({ domain, dst }: { domain: string; dst: string }) {
    this.domain = this.parseDomain(domain);
    this.domainstoryElements = this.parseDst(dst);
  }

  edges(): Edge[] {
    return this.domainstoryElements
      .filter((element) => element instanceof Activity)
      .map((element) => {
        return {
          id: element.id,
          source: element.source,
          target: element.target,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          label: element.name,
        };
      });
  }

  nodes(): Node[] {
    return this.domainstoryElements
      .filter((element) => !(element instanceof Activity))
      .map((element) => {
        const isSource = this.domainstoryElements
          .filter((element) => element instanceof Activity)
          .find((activity) => activity.source === element.id);
        const isTarget = this.domainstoryElements
          .filter((element) => element instanceof Activity)
          .find((activity) => activity.target === element.id);

        return {
          id: element.id,
          data: {
            label: element.name,
          },
          position: { x: 0, y: 0 },
          type:
            isSource && isTarget ? "default" : isSource ? "input" : "output",
        };
      });
  }

  parseDst(input: string): DomainStoryEelement[] {
    const dstObj: DSTModel[] = JSON.parse(input);

    return dstObj
      .filter((element) => element.type)
      .map((element) => {
        const dstType = element.type.split(":")[1];
        switch (true) {
          case dstType.includes("actor"):
            return new Actor({ name: element.name, id: element.id });
          case dstType.includes("workObject"):
            return new WorkObject({ name: element.name, id: element.id });
          case dstType.includes("activity"):
            return new Activity({
              name: element.name,
              id: element.id,
              source: element.source as string,
              target: element.target as string,
            });

          default: {
            throw new Error("Invalid DST type");
          }
        }
      });
  }

  parseDomain(input: string): Domain {
    const domainObj = JSON.parse(input) as Domain;

    const actors = new Map(Object.entries(domainObj.actors));
    const work_objects = new Map(Object.entries(domainObj.workObjects));

    domainObj.actors = actors;
    domainObj.workObjects = work_objects;

    return domainObj;
  }

  static of(input: string) {
    return new DST(JSON.parse(input));
  }
}
