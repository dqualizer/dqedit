import { useWritable } from "$lib/shared-store";
import type { DST } from "$models/domain_story.model";
import { writable } from "svelte/store";

export const DSTStore = (value?: DST) => {
  const { set, update, subscribe } = writable(value);
  return {
    set,
    update,
    subscribe,
  };
};

export const useDST = (dst: DST) => useWritable("DST-store", dst);
