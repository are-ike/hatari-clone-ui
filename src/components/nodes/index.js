import React, { useRef, useState } from "react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { nodeTypes } from "../../constants";
import { cls } from "../../utils/functions";

const Node = ({ type, data }) => {
  const isInput = type === nodeTypes.input;
  const isAction = type === nodeTypes.action;

  return (
    <>
      {!isInput && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#1343C7", border: "#1343C7" }}
        />
      )}
      <div className="border rounded w-[195px]">
        <div
          className={cls(
            isInput
              ? "bg-[#2E6AE7]"
              : type === nodeTypes.action
              ? "bg-[#FFC53D]"
              : "bg-[#40CCB2]",
            "px-3 py-2 text-xs font-medium text-white rounded-t flex items-center justify-between"
          )}
        >
          <p className="capitalize font-semibold">{type}</p>
          <div className="flex items-center gap-2">
            {!isInput && (
              <button onClick={() => data.setOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </button>
            )}

            <button onClick={data.onDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-white "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-3 py-2.5 h-[65px] rounded-b bg-white">
          <p className="truncate max-w-full text-sm nodrag" title={data.label}>
            {data.label}
          </p>
        </div>
      </div>
      {!isAction && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#1343C7", border: "#1343C7" }}
        />
      )}
    </>
  );
};

export default Node;
