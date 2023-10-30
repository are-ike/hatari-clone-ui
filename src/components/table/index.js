import React from "react";
import { cls } from "../../utils/functions";

const Table = ({ columns, rows, renderRows, className, onRowClick }) => {
  return (
    <table className={cls("w-full", className)}>
      <tr className="bg-backg">
        {columns.map((col, i) => (
          <th
            className={cls(
              "capitalize p-4 text-left text-sm font-bold text-darkblue font-normal",
              i === 0 && "rounded-tl-lg",
              i === columns.length - 1 && "rounded-tr-lg"
            )}
          >
            {col}
          </th>
        ))}
      </tr>

      {rows.map((row) => (
        <tr
          className="border-b text-body text-sm font-medium cursor-pointer hover:bg-blueLight/40 duration-300"
          onClick={() => onRowClick(row)}
        >
          {renderRows(row)}
        </tr>
      ))}
    </table>
  );
};

export default Table;
