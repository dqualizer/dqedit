<script lang="ts">
  import { BaseEdge, EdgeLabel, type EdgeProps, getBezierPath } from "@xyflow/svelte";

  type $$Props = EdgeProps;

  export let id: $$Props["id"];
  export let label: $$Props["label"] = undefined;
  export let labelStyle: $$Props["labelStyle"] = undefined;

  export let sourceX: $$Props["sourceX"];
  export let sourceY: $$Props["sourceY"];
  export let sourcePosition: $$Props["sourcePosition"];

  export let targetX: $$Props["targetX"];
  export let targetY: $$Props["targetY"];
  export let targetPosition: $$Props["targetPosition"];

  export let markerEnd: $$Props["markerEnd"] = undefined;

  export let data: $$Props["data"] = undefined;

  const numberStyle = "background-color: lightblue; color: white; border-radius: 100%; width: 20px; height: 20px;";

  $: [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
</script>

<BaseEdge {id} {path} {markerEnd}/>

{#if label}
  <EdgeLabel x={labelX} y={labelY} style={labelStyle}>
    {label}
  </EdgeLabel>
{/if}

{#if data.number}
  <EdgeLabel x={labelX} y={labelY - 20} style={numberStyle}>
    <span class="edge-number-label">{data.number}</span>
  </EdgeLabel>
{/if}
