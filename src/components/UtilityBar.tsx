import { Panel } from "reactflow";

export const UtilityBar: React.FC<{
  onSave: Function;
  onRestore: Function;
  onExport: Function;
}> = ({ onSave, onRestore, onExport }) => {
  return (
    <Panel position="top-right" className="space-x-2">
      <button className="btn btn-accent" onClick={(event) => onSave()}>
        save
      </button>
      <button className="btn btn-accent" onClick={(event) => onRestore()}>
        restore
      </button>
      <button className="btn btn-accent" onClick={(event) => onExport()}>
        export
      </button>
    </Panel>
  );
};
