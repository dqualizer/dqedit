"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { parse as parse_api } from "../models/api.model";
import {
  DomainStory,
  DomainStoryImpl,
  parse as parse_domain_story,
} from "../models/domain_story.model";
import { ActorNode, ApiMapperNode, FieldNode, MapperNode } from "./CustomNode";
import { SidebarControls } from "./SideBarControls";
import { UtilityBar } from "./UtilityBar";

/*
const initialNodes = [
  {
    id: "0",
    type: "actorNode",
    data: { label: "Node" },
    position: { x: 0, y: 50 },
  },
  {
    id: "1",
    type: "actorNode",
    data: { dst: "Node 1" },
    position: { x: 0, y: 150 },
  },
];

const initialEdges = [
  {
    id: "0",
    source: "0",
    target: "1",
  },
];
*/
const flowKey = "example-flow";

let id = 2;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  const [isLoading, setLoading] = useState(true);
  const [rfInstance, setRfInstance] = useState(null);
  const [isToastVisible, setToastVisibility] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dstData, setDstData] = useState<DomainStory>();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { project, setViewport } = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      actor: ActorNode,
      field: FieldNode,
      mapper: MapperNode,
      apiMapper: ApiMapperNode,
    }),
    []
  );

  useEffect(() => {
    const data_file = fetch("http://localhost:3000/wps_example.dst")
      .then((file) => file.text())
      .then((data) => parse_domain_story(data))
      .then(({ domain, dsts }) => {
        fetch("http://localhost:3000/api.json")
          .then((file) => file.text())
          .then((data) => new DomainStoryImpl(domain, dsts, parse_api(data)))
          .then((data) => {
            console.log("setting data", data);
            //filter out empty names
            data.dsts = data.dsts.filter((dst) => dst.get("name") != "");
            //sort by name
            data.dsts.sort((a, b) => {
              //@ts-ignore
              if (a.get("type") < b.get("type")) {
                return -1;
                //@ts-ignore
              } else if (a.get("type") > b.get("type")) {
                return 1;
              } else {
                return 0;
              }
            });
            setDstData(data);
            setLoading(false);
          });
      });
  }, []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNodeWithData = (
    posX: number,
    posY: number,
    nodeTypeString: string,
    nodeData: any
  ) => {
    const id = getId();
    const newNode = {
      id,
      type: nodeTypeString,
      position: project({
        x: posX,
        y: posY,
      }),
      data: { dst: nodeData },
    };

    console.log("adding node", newNode);

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds: Edge[]) =>
      //@ts-ignore
      eds.concat({ id, source: connectingNodeId.current, target: id })
    );
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reviver = (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (value.dataType === "Map") {
            return new Map(value.value);
          }
        }
        return value;
      };

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const data = JSON.parse(
        event.dataTransfer.getData("application/json"),
        reviver
      );

      const x = event.clientX - reactFlowBounds.left;
      const y = event.clientY - reactFlowBounds.top; 

      if (typeof type === "undefined" || !type) {
        return;
      }
      
      addNodeWithData(x, y, type, data);
    },
    [project]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: any) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      toggleToast("Saved flow");
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        toggleToast("Restored flow");
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onExport = useCallback(() => {
    toggleToast("Not yet implemented");
  }, []);

  const onDelete = (node:Node) => {
    if (rfInstance !== null) {
      rfInstance.removeElements([node]);
    } else {
      console.log("rfInstance is null");
    }
  };

  const toggleToast = (message: string) => {
    setToastMessage(message);
    setToastVisibility(true);
    setTimeout(() => {
      setToastVisibility(false);
      setToastMessage("");
    }, 3000);
  };

  if (isLoading) {
    console.log("loading");
    return <span className="loading loading-dots loading-md"></span>;
  } else {
    return (
      <ReactFlowProvider>
        <div className="wrapper" ref={reactFlowWrapper}>
          <SidebarControls addNode={addNodeWithData} dstData={dstData}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onConnect={onConnect}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              nodeTypes={nodeTypes}
              onInit={setRfInstance}
              fitView
              fitViewOptions={fitViewOptions}
            >
              <Background />
              <UtilityBar
                onSave={onSave}
                onRestore={onRestore}
                onExport={onExport}
              />
              <Controls />
              {isToastVisible && (
                <div className="toast toast-end">
                  <div className="alert alert-success">
                    <span>{toastMessage}</span>
                  </div>
                </div>
              )}
            </ReactFlow>
          </SidebarControls>
        </div>
      </ReactFlowProvider>
    );
  }
};

export default () => (
  <ReactFlowProvider>
    <Canvas />
  </ReactFlowProvider>
);
