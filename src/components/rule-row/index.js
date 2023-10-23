import React, { useEffect, useState } from "react";
import Input from "../input";
import Dropdown from "../dropdown";
import { conditions } from "../../constants";
import { cls } from "../../utils/functions";

const fieldOptions = [
  { label: "payment", value: "payment" },
  { label: "payment", value: "payment" },
  { label: "payment", value: "payment" },
];
const operatorOptions = [
  { label: "payment", value: "payment" },
  { label: "payment", value: "payment" },
  { label: "payment", value: "payment" },
];

const RuleRow = ({
  canDelete = true,
  field,
  operator,
  value,
  condition,
  onDelete,
  updateRow,
}) => {
  return (
    <div className="flex items-center">
      {canDelete && (
        <button className="mr-2" onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-body"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      )}
      <div
        className={cls(
          "grid grid-cols-3 gap-4 mr-6",
          !canDelete && "ml-[28px]"
        )}
      >
        <Dropdown
          options={fieldOptions}
          value={
            fieldOptions.filter((option) => option.value === field)[0] ?? null
          }
          setValue={(option) =>
            updateRow({ key: "field", value: option.value })
          }
          placeholder={"Field"}
        />
        <Dropdown
          options={operatorOptions}
          value={
            operatorOptions.filter((option) => option.value === operator)[0] ??
            null
          }
          setValue={(option) =>
            updateRow({ key: "operator", value: option.value })
          }
          placeholder={"Operator"}
        />
        <Input
          value={value}
          setValue={(value) => updateRow({ key: "value", value })}
          placeholder={"Value"}
        />
      </div>

      {condition && (
        <div className={cls("flex items-center gap-2")}>
          <input
            type="radio"
            checked={condition === conditions.AND}
            onChange={() =>
              updateRow({ key: "condition", value: conditions.AND })
            }
          />

          <label>And</label>

          <input
            type="radio"
            checked={condition === conditions.OR}
            onChange={() =>
              updateRow({ key: "condition", value: conditions.OR })
            }
          />
          <label>Or</label>
        </div>
      )}
    </div>
  );
};

export default RuleRow;
