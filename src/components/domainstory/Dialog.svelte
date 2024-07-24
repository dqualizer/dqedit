<script lang="ts">
  import { Button } from "$components/ui/button";
  import * as Dialog from "$components/ui/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger><Button>Upload new domain story</Button></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Do you want to upload a new domain story?</Dialog.Title>
      <Dialog.Description>
        You can upload a new domain story by filling out the form below.
      </Dialog.Description>
    </Dialog.Header>
    <slot></slot>
  </Dialog.Content>
</Dialog.Root>
