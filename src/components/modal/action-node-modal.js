import React, { useEffect, useState } from "react";
import EditViewName from "../edit-view-name";
import NodeModal from "./node-modal";
import Dropdown from "../dropdown";
import Input from "../input";
import PrimaryButton from "../button/primary-button";

const actionOptions = [
  { label: "Allow", value: "allow" },
  { label: "Block", value: "block" },
];

const ActionNodeModal = ({ actionNode, open, setOpen, updateActionNode }) => {
  const [label, setLabel] = useState(actionNode ? actionNode.label : "");
  const [action, setAction] = useState(
    actionNode ? (actionNode.isCustom ? "" : actionNode.action) : ""
  );
  const [isCustom, setIsCustom] = useState(
    actionNode ? actionNode.isCustom : false
  );
  const [customValue, setCustomValue] = useState(
    actionNode ? (actionNode.isCustom ? actionNode.action : "") : ""
  );

  const isValid = (isCustom && !!customValue) || (!isCustom && !!action);
  const isDirty = () => {
    if (isCustom !== actionNode?.isCustom) return true;

    if (isCustom) return customValue !== actionNode?.action;
    if (!isCustom) return action !== actionNode?.action;
  };

  useEffect(() => {
    if (!actionNode) return;

    setIsCustom(actionNode.isCustom);
    setAction(actionNode.action);
    setLabel(actionNode.label);
  }, [actionNode]);

  const toggleCustom = () => {
    if (!isCustom) {
      setAction("");
      setIsCustom(true);
    } else {
      setCustomValue("");
      setIsCustom(false);
    }
  };

  const onApply = () => {
    updateActionNode({
      action: isCustom ? customValue : action,
      isCustom,
    });
    setOpen(false);
  };

  return (
    <NodeModal open={open} setOpen={setOpen} header={"Action Editor"}>
      <div className="flex items-center gap-2 mb-8">
        <p>Action Name: </p>
        <EditViewName
          value={label}
          onSave={(label) => updateActionNode({ label })}
        />
      </div>
      <p className="font-medium mb-2">Then statement</p>
      <div className="flex gap-4 w-[600px] items-center mx-auto border p-8 rounded">
        <div className="w-[500px]">
          {isCustom ? (
            <Input
              value={customValue}
              setValue={setCustomValue}
              placeholder={"Custom action"}
            />
          ) : (
            <Dropdown
              placeholder={"Select an action"}
              value={
                actionOptions.filter((opt) => opt.value === action)[0] ?? null
              }
              options={actionOptions}
              setValue={(opt) => setAction(opt.value)}
            />
          )}
        </div>
        <div className="flex min-w-[150px] items-center gap-2 h-fit">
          <input type="checkbox" checked={isCustom} onChange={toggleCustom} />
          <label>Custom action</label>
        </div>
      </div>

      <div className="flex gap-4 mt-14 w-fit ml-auto">
        <PrimaryButton onClick={onApply} disabled={!(isDirty() && isValid)}>
          Apply
        </PrimaryButton>
      </div>
    </NodeModal>
  );
};

export default ActionNodeModal;
