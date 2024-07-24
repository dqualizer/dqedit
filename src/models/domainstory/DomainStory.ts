import type { Identifiable } from "$models/Identifiable";
import type { Activity, Actor, WorkObject } from "$models/domainstory";
import { type Edge, MarkerType, type Node } from "@xyflow/svelte";

export class DomainStory implements Identifiable {
  id: string;
  actors: Actor[];
  work_objects: WorkObject[];
  activities: Activity[];

  constructor({
    id,
    actors,
    work_objects,
    activities,
  }: {
    id: string;
    actors: Actor[];
    work_objects: WorkObject[];
    activities: Activity[];
  }) {
    this.id = id;
    this.actors = actors;
    this.work_objects = work_objects;
    this.activities = activities;
  }

  nodes(): Node[] {
    return [
      this.actors.map((actor) => {
        return {
          id: actor.id,
          data: {
            label: actor.name,
          },
          position: {
            x: 0,
            y: 0,
          },
        };
      }),
      this.work_objects.map((work_object) => {
        return {
          id: work_object.id,
          data: {
            label: work_object.name,
          },
          position: {
            x: 0,
            y: 0,
          },
        };
      }),
    ].flat();
  }

  edges(): Edge[] {
    return this.activities.flatMap((activity) => {
      return activity.work_objects.reduce<Edge[]>((acc, work_object, index) => {
        if (index === 0) {
          console.debug(
            `First work_object.. going from ${activity.id} to ${work_object}`,
          );
          acc.push({
            id: `${activity.id}-${work_object}`,
            source: activity.initiators[0],
            target: work_object,
            label: activity.name,
            markerEnd: MarkerType.ArrowClosed,
            data: {
              number: activity.number,
            },
          });
        }

        if (index === activity.work_objects.length - 1) {
          console.debug(
            `Last workobject.. going from ${work_object} to ${activity.id}`,
          );
          acc.push({
            id: `${work_object}-${activity.id}`,
            source: work_object,
            target: activity.targets[0],
            label: "to",
            markerEnd: MarkerType.ArrowClosed,
            data: {
              number: activity.number,
            },
          });
          return acc;
        }

        const nextWorkObject = activity.work_objects[index + 1];
        acc.push({
          id: `${work_object}-${nextWorkObject}`,
          source: work_object,
          target: nextWorkObject,
          label: "to",
          markerEnd: MarkerType.ArrowClosed,
          data: {
            number: activity.number,
          },
        });

        return acc;
      }, []);
    });
  }
}
