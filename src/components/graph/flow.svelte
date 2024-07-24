<script lang="ts">
  import NumberEdge from '$components/graph/NumberEdge.svelte';
  import dagre from '@dagrejs/dagre';
  import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    Position,
    SvelteFlow,
    type Edge,
    type Node,
  } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import { writable } from 'svelte/store';

  export let initialNodes: Node[];
  export let initialEdges: Edge[];

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 400;
  const nodeHeight = 200;

  function getLayoutedElements(nodes: Node[], edges: Edge[], direction = 'LR') {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    for (const node of nodes) {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target);
    }

    dagre.layout(dagreGraph);

    for (const node of nodes) {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? Position.Left : Position.Top;
      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      };
    }

    return { nodes, edges };
  }

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const nodes = writable<Node[]>(layoutedNodes);
  const edges = writable<Edge[]>(layoutedEdges);

  const isLocked = true;

  const edgeTypes = {
    numberEdge: NumberEdge,
  };
</script>

<SvelteFlow
  {nodes}
  {edges}
  {edgeTypes}
  nodesConnectable={!isLocked}
  fitView
  on:nodeclick={(event) => console.log("on node click", event.detail.node)}
>
  <Controls />
  <Background variant={BackgroundVariant.Dots} />
  <MiniMap class="hidden lg:block" />
</SvelteFlow>
