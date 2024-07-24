<script>
  import { Separator } from "$components/ui/separator";
  import { Toaster } from "$components/ui/sonner";
  import "../app.css";
</script>

<div class="flex flex-col h-dvh">
  <div
    class="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
  >
    <h2 class="text-lg font-semibold">dqedit</h2>
  </div>
  <Separator />
  <div class="container h-full flex flex-col">
    <slot></slot>
  </div>
</div>
<Toaster />
