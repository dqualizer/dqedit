<script lang="ts">
	import * as DomainStory from "$components/domainstory";
	import { ScrollArea } from "$components/ui/scroll-area";

  export let ids: string[];
</script>

<ScrollArea
  class="flex-1 whitespace-nowrap rounded-md"
  orientation="horizontal"
>
  <div class="flex w-max space-x-4 py-4">
    {#each ids as id}
      <a href="/{id}">
        <DomainStory.Card {id} />
      </a>
    {/each}
  </div>
</ScrollArea>
