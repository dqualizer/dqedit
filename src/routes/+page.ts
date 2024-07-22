import { DST } from "$models/domain_story.model";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch("/werkstatt.dst");

  const data = await res.text();

  const dst = DST.of(data);

  return {
    dst: dst,
  };
};
