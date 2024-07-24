<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";

  export let id: string;
</script>

<Card>
  <CardHeader>
    <CardTitle>Domain Story</CardTitle>
    <CardDescription>Domain Story to select</CardDescription>
  </CardHeader>
  <CardContent></CardContent>
  <CardFooter>{id}</CardFooter>
</Card>
