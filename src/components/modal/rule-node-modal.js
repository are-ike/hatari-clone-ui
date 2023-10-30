import React, { useEffect, useState } from "react";
import EditViewName from "../edit-view-name";
import RuleRow from "../rule-row";
import SecondaryButton from "../button/secondary-button";
import PrimaryButton from "../button/primary-button";
import { conditions, ruleRow } from "../../constants";
import NodeModal from "./node-modal";

const newRow = () => ({
  ...ruleRow,
});

const RuleNodeModal = ({ ruleNode, open, setOpen, updateRuleNode }) => {
  const [rows, setRows] = useState(ruleNode ? ruleNode.rules : []);
  const [label, setLabel] = useState(ruleNode ? ruleNode.label : "");

  const addNewRow = (idx) => {
    const newRows = JSON.parse(JSON.stringify(rows));
    newRows.splice(idx + 1, 0, newRow());

    if ((idx === 0 && !rows[idx].condition) || idx === rows.length - 1) {
      newRows[idx].condition = conditions.AND;
    } else {
      newRows[idx + 1].condition = conditions.AND;
    }

    setRows(newRows);
  };

  useEffect(() => {
    if (ruleNode && ruleNode.rules) setRows(ruleNode.rules);
    if (ruleNode && ruleNode.label) setLabel(ruleNode.label);
  }, [ruleNode]);

  const onDelete = (idx) => {
    const newRows = JSON.parse(JSON.stringify(rows));
    newRows.splice(idx, 1);

    if (idx === rows.length - 1) {
      newRows[idx - 1].condition = null;
    }
    setRows(newRows);
  };

  const onReset = () => {
    setRows([newRow()]);
  };

  const onApply = () => {
    updateRuleNode({ rules: rows });
    setOpen(false);
  };

  const onClose = () => {
    setRows([newRow()]);
    setLabel("");
    setOpen(false);
  };

  const updateRow =
    (idx) =>
    ({ key, value }) => {
      const newRows = JSON.parse(JSON.stringify(rows));
      const row = newRows[idx];
      row[key] = value;

      setRows(newRows);
    };

  const isValid = rows.every(
    (row, idx) =>
      row.field &&
      row.operator &&
      row.value &&
      ((idx < rows.length - 1 && row.condition) || !row.condition)
  );

  const isDirty =
    JSON.stringify(rows) !== JSON.stringify(ruleNode?.rules) 

  return (
    <NodeModal open={open} setOpen={setOpen} header={"Rule Editor"}>
      <div className="max-h-[75vh] overflow-auto">
        <div className="flex items-center gap-2 mb-8">
          <p>Rule Name: </p>
          <EditViewName
            value={label}
            onSave={(label) => updateRuleNode({ label })}
          />
        </div>
        <p className="font-medium mb-2">If statement</p>
        <div className="flex flex-col gap-4 border min-h-[80px] p-4 rounded">
          {rows.map((row, idx) => (
            <RuleRow
              key={"rule-row" + idx}
              field={row.field}
              operator={row.operator}
              value={row.value}
              condition={row.condition}
              onDelete={() => onDelete(idx)}
              canDelete={idx > 0}
              updateRow={updateRow(idx)}
              addRow={() => addNewRow(idx)}
            />
          ))}
        </div>

        <div className="flex gap-4 mt-[150px] w-fit ml-auto">
          <SecondaryButton onClick={onReset}>Reset</SecondaryButton>
          <PrimaryButton onClick={onApply} disabled={!(isDirty && isValid)}>
            Apply
          </PrimaryButton>
        </div>
      </div>
    </NodeModal>
  );
};

export default RuleNodeModal;
