import React from "react";
import { cls } from "../../utils/functions";
import loader from "../../assets/loader.svg";

const Table = ({
  columns,
  rows,
  renderRows,
  className,
  onRowClick,
  isLoading,
}) => {
  return (
    <div className="relative">
      <table className={cls("w-full", className)}>
        <tbody>
          <tr className="bg-backg">
            {columns.map((col, i) => (
              <th
                key={col}
                className={cls(
                  "capitalize p-4 text-left text-sm !font-semibold text-darkblue font-normal",
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
              key={row.id}
              className="border-b border-[#f1f2f4] text-body text-sm font-medium cursor-pointer hover:bg-blueLight/40 duration-300"
              onClick={() => onRowClick(row)}
            >
              {renderRows(row)}
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <img src={loader} height={30} width={30}/>
        </div>
      )}
    </div>
  );
};

export default Table;
