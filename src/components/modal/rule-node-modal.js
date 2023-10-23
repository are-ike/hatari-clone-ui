import React, { useEffect, useState } from "react";
import Modal from ".";
import EditViewName from "../edit-view-name";
import RuleRow from "../rule-row";
import SecondaryButton from "../button/secondary-button";
import PrimaryButton from "../button/primary-button";
import { conditions, ruleRow } from "../../constants";

const newRow = () => ({
  ...ruleRow,
});

const RuleNodeModal = ({ ruleNode, open, setOpen, updateRuleNode }) => {
  const [rows, setRows] = useState(ruleNode ? ruleNode.rules : []);
  const [label, setLabel] = useState(ruleNode ? ruleNode.label : "");

  const addNewRow = () => {
    setRows((rows) => {
      const newRows = rows.map((row, idx) => ({
        ...row,
        condition: idx === rows.length - 1 ? conditions.AND : row.condition,
      }));
      newRows.push(newRow());

      return newRows;
    });
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

  const onSave = () => {
    updateRuleNode({ label, rules: rows });
    setOpen(false);
  };

  const onClose = () => {
    setRows([newRow()]);
    setLabel("");
    setOpen(false);
  };

  const updateRow = (idx) => ({key, value})=>{
    const newRows = JSON.parse(JSON.stringify(rows));
    const row = newRows[idx]
    row[key] = value

    setRows(newRows)
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className={"!w-[60%] p-6"}
      header={"Rule Editor"}
    >
      <div className="flex items-center justify-between mb-8">
        <EditViewName value={label} onSave={setLabel} />
        <PrimaryButton
          className={
            "text-xs h-8 !px-4 border border-primary bg-white text-primary"
          }
          onClick={addNewRow}
        >
          Add Row
        </PrimaryButton>
      </div>
      <div className="flex flex-col gap-4 overflow-auto h-[200px]">
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
          />
        ))}
      </div>

      <div className="flex gap-4 mt-14 w-fit ml-auto">
        <SecondaryButton onClick={onReset}>Reset</SecondaryButton>
        <PrimaryButton onClick={onSave}>Save</PrimaryButton>
      </div>
    </Modal>
  );
};

export default RuleNodeModal;
