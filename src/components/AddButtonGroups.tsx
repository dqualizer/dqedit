import { Api, Field } from "@/models/api.model";

const AddDstNodeButton: React.FC<{
  dst: Map<string, string>;
  addNode: Function;
}> = ({ dst, addNode }) => {
  const onDragStart = (event:any, type: string) => {
    const replacer = (key: any, value: any) => {
      if (value instanceof Map) {
        return {
          dataType: "Map",
          value: Array.from(value.entries()),
        };
      } else {
        return value;
      }
    };
    //@ts-ignore
    event.dataTransfer.setData("application/reactflow", type);
    //@ts-ignore
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify(dst, replacer)
      );
      //@ts-ignore
    event.dataTransfer.effectAllowed = "move";
  };

  const add = (event: React.MouseEvent) => {
    event.preventDefault();
    addNode(0, 0, "actor", dst);
  };

  return (
    <div>
      <button
        className="btn btn-neutral w-80"
        value="addNode"
        onClick={add}
        draggable
        onDragStart={(event) => {
          onDragStart(event, "actor");
        }}
      >
        {dst.get("name")}
      </button>
    </div>
  );
};

export const AddDstButtonGroup: React.FC<{
  dsts: Map<string, string>[];
  mapType: string;
  addNode: Function;
}> = ({ dsts, mapType, addNode }) => {
  const filteredDsts = dsts?.filter((dst) => dst.get("type") === mapType) || [];

  return (
    <div className="fl space-y-4">
      <h3 className="join-item">{mapType}</h3>
      {filteredDsts.map((dst) => (
        <AddDstNodeButton key={dst.get("id")} dst={dst} addNode={addNode} />
      ))}
    </div>
  );
};

const AddFieldButton: React.FC<{
  field: Field;
  addNode: Function;
}> = ({ field, addNode }) => {
  const onDragStart = (event: any, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.setData("application/json", JSON.stringify(field));
    event.dataTransfer.effectAllowed = "move";
  };

  const add = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("adding field is pressed with field", field);
    addNode(0, 0, "field", field);
  };

  return (
    <div>
      <button
        className="btn btn-neutral w-80"
        value="addNode"
        onDragStart={(event) => onDragStart(event, "field")}
        draggable
        onClick={add}
      >
        {field.operation_id}
      </button>
    </div>
  );
};

export const AddFieldButtonGroup: React.FC<{
  api: Api | undefined;
  addNode: Function;
}> = ({ api, addNode }) => {
  if (!api) {
    console.log("api undefined", api);
    return <div>No</div>;
  }

  const fieldArray = Array.from(api.field.values());
  return (
    <div className="fl space-y-4">
      <h3 className="secondary join-item">Fields</h3>
      {fieldArray.map((field) => (
        <AddFieldButton key={field.dq_id} field={field} addNode={addNode} />
      ))}
    </div>
  );
};