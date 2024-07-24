<script lang="ts">
  import * as DomainStory from "$components/domainstory";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<DomainStory.CardList ids={data.domainStoryIds} />

<DomainStory.Dialog>
  <DomainStory.Form data={data.form} />
</DomainStory.Dialog>
