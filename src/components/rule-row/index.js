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
  addRow,
}) => {
  return (
    <div className="flex items-center">
      <div className={cls("flex gap-2 mr-2", !canDelete && "ml-[28px]")}>
        <button className="" onClick={addRow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-primary"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {canDelete && (
          <button className="" onClick={onDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-del"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        className={cls("flex gap-4 mr-6  w-full", !condition && "mr-[122px]")}
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
