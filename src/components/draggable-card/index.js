import React from "react";
import { cls } from "../../utils/functions";
import { nodeTypes } from "../../constants";

const DraggableCard = ({
  children,
  type,
  onDragEnd,
  onDragStart,
  disabled = false,
}) => {
  return (
    <div
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={!disabled}
      className={cls(
        "nodrag cursor-grab active:cursor-grabbing py-2 px-4 rounded font-medium text-xs",
        type === nodeTypes.input
          ? "bg-[#F3F7FE] border border-primary"
          : type === nodeTypes.rule
          ? "bg-[#F0FFF8] border border-[#10DEB8]"
          : "bg-[#FFFBE6] border border-[#FFC12F]",
        disabled && "!cursor-not-allowed !bg-backg border border-darkgrey select-none"
      )}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
