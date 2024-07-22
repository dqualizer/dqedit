<script lang="ts">
  import Flow from "$components/graph/flow.svelte";
  import { Button } from "$components/ui/button/index.js";
  import { Separator } from "$components/ui/separator/index.js";
  import * as Tabs from "$components/ui/tabs/index.js";

	import type { PageData } from './$types';

  export let data: PageData
</script>

<div class="flex flex-col h-dvh">
  <div
    class="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
  >
    <h2 class="text-lg font-semibold">dqedit</h2>
  </div>
  <Separator />
  <Tabs.Root value="complete" class="flex-1">
    <div class="container h-full py-6">
      <div class="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
        <Tabs.Content value="complete" class="mt-0 border-0 p-0">
          <div class="flex h-full flex-col space-y-4">
            <Flow initialNodes={data.dst.nodes()} initialEdges={data.dst.edges()} ></Flow>
            <div class="flex items-center space-x-2">
              <Button>Submit</Button>
            </div>
          </div>
        </Tabs.Content>
      </div>
    </div>
  </Tabs.Root>
</div>
