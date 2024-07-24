<script lang="ts">
  import Flow from "$components/graph/flow.svelte";
  import { Button } from "$components/ui/button";
  import * as Tabs from "$components/ui/tabs";
  import { DomainStory } from "$models/domainstory";

  import type { PageData } from "./$types";

  export let data: PageData;

  $: domainStory = new DomainStory({
    id: data.domainStory.id,
    actors: data.domainStory.actors,
    work_objects: data.domainStory.work_objects,
    activities: data.domainStory.activities,});

</script>

<Tabs.Root value="complete" class="flex-1">
  <div class="container h-full py-6">
    <div class="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
      <Tabs.Content value="complete" class="mt-0 border-0 p-0">
        <div class="flex h-full flex-col space-y-4">
          <Flow
            initialNodes={domainStory.nodes()}
            initialEdges={domainStory.edges()}
          ></Flow>
          <div class="flex items-center space-x-2">
            <Button>Submit</Button>
          </div>
        </div>
      </Tabs.Content>
    </div>
  </div>
</Tabs.Root>
