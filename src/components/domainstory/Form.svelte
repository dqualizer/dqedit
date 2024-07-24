<script lang="ts">
  import * as Form from "$components/ui/form";
  import { Input } from "$components/ui/input";
  import { toast } from "svelte-sonner";
  import { zodClient } from "sveltekit-superforms/adapters";
  import {
    type Infer,
    type SuperValidated,
    superForm,
  } from "sveltekit-superforms/client";
  import { type FormSchema, formSchema } from "./schema";

  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(f.message);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance enctype="multipart/form-data">
  <Form.Field {form} name="files">
    <Form.Control let:attrs>
      <Form.Label>Domain Story File</Form.Label>
      <Input
        {...attrs}
        type="file"
        multiple
        accept=".dst,.egn"
        on:input={(e) =>
          ($formData.files = Array.from(e.currentTarget.files ?? []))}
      />
    </Form.Control>
    <Form.Description>The file to upload as Domain Story</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
