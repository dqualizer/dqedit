import { Handle, Position } from "reactflow";

import { useEffect, useState } from "react";
import "../app/globals.css";

export const ActorNode: React.FC<{ data: any }> = (data) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    //@ts-ignore
    if (data.selected) {
      setSelected("border-accent-focus");
    } else {
      setSelected("");
    }
  }, [data]);

  const deleteNode = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("deleting node is pressed with node", data.data.dst);
  };

  const waypoints = () => {
    const waypointsArray = data.data.dst.get("waypoints");
    if (waypointsArray) {
      const waypointsString = waypointsArray.map((point:any) => {
        return `[x: ${point.x}, y: ${point.y}]`;
      }).join(" ");
      return waypointsString;
    } else {
      return "";
    }
  };

  return (
    <div className={"card card-bordered w-96 bg-primary-focus " + selected}>
      <div className="card-body">
        <h3 className="card-title">
          {data.data.dst.get("type")} - {data.data.dst.get("name")}
        </h3>
        <div>
          <Handle
            type="target"
            className="bg-neutral border-neutral w-3 h-3"
            id="map"
            position={Position.Left}
            style={{ top: 80 }}
          />
          <h5>Mapping</h5>
        </div>
        <div>
          <Handle
            type="target"
            className="bg-neutral border-neutral w-3 h-3"
            id="class"
            position={Position.Left}
            style={{ top: 110 }}
          />
          <h5>Field</h5>
        </div>
        <div className="join join-vertical space-y-2">
          <p>waypoints: {waypoints()}</p>
          <p>pickedColor: {data.data.dst.get("pickedColor")}</p>
          <p>dq_id: {data.data.dst.get("dq_id")}</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-neutral" onClick={deleteNode}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const MapperNode: React.FC<{ data: any }> = (data) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    //@ts-ignore
    if (data.selected) {
      setSelected("border-accent-focus");
    } else {
      setSelected("");
    }
  }, [data]);

  const deleteNode = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("deleting node is pressed with node", data.data.dst);
  };

  return (
    <div className={"card card-bordered w-96 bg-neutral " + selected}>
      <div className="card-body">
        <h3 className="card-title">Mapping</h3>
        <Handle
          type="source"
          id="apiMapping"
          className="bg-primary border-primary w-3 h-3"
          position={Position.Right}
        />
        <div className="join join-vertical space-y-2">
          <input
            className="input input-bordered w-full max-w-xs join-item"
            type="text"
            name="operation_id"
            placeholder="operation_id"
          />
          <select
            className="select select-bordered w-full max-w-ws join-item"
            defaultValue="select"
          >
            <option value="select" disabled>
              select a type
            </option>
            <option value="class">Class</option>
            <option value="method">Method</option>
            <option value="interface">Interface</option>
          </select>
          <input
            className="input input-bordered w-full max-w-xs join-item"
            type="text"
            name="implements"
            placeholder="implements"
          />
          <input
            className="input input-bordered w-full max-w-xs join-item"
            type="text"
            name="objects"
            placeholder="objects"
          />
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={deleteNode}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const ApiMapperNode: React.FC<{ data: any }> = (data) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    //@ts-ignore
    if (data.selected) {
      setSelected("border-accent-focus");
    } else {
      setSelected("");
    }
  }, [data]);

  const deleteNode = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("deleting node is pressed with node", data.data.dst);
  };

  return (
    <div className={"card card-bordered w-96 bg-neutral " + selected}>
      <div className="card-body">
        <h3 className="card-title">Api Mapping</h3>
        <Handle
          type="source"
          id="apiMapping"
          className="bg-primary border-primary w-3 h-3"
          position={Position.Right}
        />
        <div className="join join-vertical space-y-2">
          <input
            className="input input-bordered w-full max-w-xs join-item"
            type="text"
            name="operation_id"
            placeholder="operation_id"
          />
          <select
            className="select select-bordered w-full max-w-ws join-item"
            defaultValue="select"
          >
            <option value="select" disabled>
              select a type
            </option>
            <option value="class">Class</option>
            <option value="method">Method</option>
            <option value="interface">Interface</option>
          </select>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={deleteNode}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const FieldNode: React.FC<{
  data: any;
}> = (data) => {
  const [body, setBody] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    //@ts-ignore
    if (data.selected) {
      setSelected("border-accent-focus");
    } else {
      setSelected("");
    }
  }, [data]);

  useEffect(() => {
    let str = "";
    Object.entries(data.data.dst.body).forEach(([key, value]) => {
      str = str.concat(key + " - " + value + " ");
    });
    setBody(str);
  }, []);

  useEffect(() => {
    let str = "";
    data.data.dst.output.forEach((elem: any) => {
      //console.log("elem", elem);
      Object.entries(elem).forEach(([key, value]) => {
        //console.log("key", key, "value", value);
        str = str.concat(' "' + key + " - " + value + '" \n');
      });
    });
    setOutput(str);
  }, []);

  useEffect(() => {
    let str = "";
    data.data.dst.input.forEach((elem: any) => {
      //console.log("elem", elem);
      Object.entries(elem).forEach(([key, value]) => {
        //console.log("key", key, "value", value);
        str = str.concat('"' + key + " - " + value + '" \n');
      });
    });
    setInput(str);
  }, []);

  const deleteNode = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("deleting node is pressed with node", data.data.dst);
  };

  return (
    <div className={"card card-bordered w-96 bg-base-200 " + selected}>
      <div className="card-body">
        <h3 className="card-title">{data.data.dst.operation_id}</h3>
        <Handle
          type="source"
          id="fieldSource"
          position={Position.Right}
          className="bg-primary border-primary w-3 h-3"
        />
        <label htmlFor="fieldSource">Field --&rsaquo;</label>
        <Handle
          type="target"
          id="ApiMappingTarget"
          position={Position.Left}
          className="bg-primary border-primary w-3 h-3"
        />
        <label htmlFor="ApiMappingTarget">&lsaquo;--Api Mapping</label>
        <p>dq_id: {data.data.dst.dq_id}</p>
        <p>body type: {body}</p>
        <p>operation: {data.data.dst.operation}</p>
        <p>operation_id: {data.data.dst.operation_id}</p>
        <p>output: {output}</p>
        <p>input: {input}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={deleteNode}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
