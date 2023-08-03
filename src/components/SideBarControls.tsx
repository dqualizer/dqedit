import { DomainStory } from "@/models/domain_story.model";
import { useEffect, useState } from "react";
import { AddDstButtonGroup, AddFieldButtonGroup } from "./AddButtonGroups";

export const SidebarControls: React.FC<{
  children?: React.ReactNode;
  addNode: Function;
  dstData?: DomainStory;
}> = ({ children, addNode, dstData }) => {
  const [typeArr, setTypeArr] = useState<string[]>([]);
  const [domainElements, setDomainElements] = useState<
    Map<string, Map<string, string>[]>
  >(new Map());

  // Initialize typeArr when component mounts
  useEffect(() => {
    if (dstData) {
      const localTypeArr = Array.from(
        new Set(dstData.dsts.map((dst) => dst.get("type") as string))
      );
      setTypeArr(localTypeArr);
    }
  }, [dstData]);

  useEffect(() => {
    if (dstData) {
      const elems = new Map<string, Map<string, string>[]>();
      dstData.dsts.forEach((dst) => {
        const type = dst.get("type");
        if (type) {
          const existingDsts = elems.get(type) ?? [];
          elems.set(type, [...existingDsts, dst]);
        }
      });
      setDomainElements(elems);
    }
  }, [dstData]);

  const addApiMapperNode = (event: React.MouseEvent) => {
    event.preventDefault();
    addNode(0, 0, "apiMapper", "apiMapper");
  };

  const addMapperNode = (event: React.MouseEvent) => {
    event.preventDefault();
    addNode(0, 0, "mapper", "mapper");
  };

  const onDragStart = (event: DragEvent, nodeType: string) => {
    if (event) {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.setData("application/json", "{}");
      event.dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items center justify-content">
        {children}
      </div>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary drawer-button lg:hidden"
      >
        Open drawer
      </label>

      <div className="drawer-side space-x-2 p-5 bg-base-200">
        <button
          value="AddApiMapper"
          draggable
          onDragStart={(event) => {
            onDragStart(event, "apiMapper");
          }}
          onClick={addApiMapperNode}
          className="btn btn-accent"
        >
          Add Api Mapper
        </button>
        <button
          value="AddMapper"
          draggable
          onDragStart={(event) => {
            onDragStart(event, "mapper");
          }}
          onClick={addMapperNode}
          className="btn btn-accent"
        >
          Add Mapper
        </button>
        <AddFieldButtonGroup api={dstData?.api} addNode={addNode} />
        {typeArr?.map((type) => (
          <AddDstButtonGroup
            key={type}
            dsts={domainElements.get(type) ?? []}
            mapType={type}
            addNode={addNode}
          />
        ))}
      </div>
    </div>
  );
};
