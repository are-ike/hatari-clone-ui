import React from "react";
import { cls } from "../../utils/functions";

const Table = ({ columns, rows, renderRows, className }) => {
  return (
    <div className={cls("flex flex-col", className)}>
      <div className="flex justify-between bg-backg p-4 rounded-t-lg">
        {columns.map((col) => (
          <div className="capitalize text-darkblue">{col}</div>
        ))}
      </div>

      {rows.map((row) => (
        <div className="flex justify-between p-4 border-b text-body">{renderRows(row)}</div>
      ))}
    </div>
  );
};

export default Table;
