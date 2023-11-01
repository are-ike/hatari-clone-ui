import React from "react";
import DraggableCard from "../draggable-card";
import { nodeTypes } from "../../constants";
import PrimaryButton from "../button/primary-button";

const WorkflowHeader = ({
  nodes,
  setDraggableCardState,
  onSave,
  undo,
  redo,
  canUndo,
  canRedo,
  isLoading,
  isWorkflowDirty,
}) => {
  const onDragEnd = (e) => {
    if (e.pageX > 120) {
      setDraggableCardState((state) => ({
        ...state,
        isDragging: false,
        isDropped: true,
      }));
    } else {
      setDraggableCardState({
        isDragging: false,
        isDropped: false,
        type: null,
      });
    }
  };

  const onDragStart = (type) => () => {
    setDraggableCardState((state) => ({
      ...state,
      isDragging: true,
      type: type,
    }));
  };

  const doesNodeExist = (type) =>
    !!nodes.filter((node) => node.type === type).length;

  return (
    <div className="p-2 absolute left-4 bg-white top-8 rounded z-50 border">
      <div className="flex flex-col gap-4 mb-4">
        <DraggableCard
          type={nodeTypes.input}
          disabled={doesNodeExist("inputNode")}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart("inputNode")}
          //not using the 'input' constant here because type of input is alredy defined in react flow and clashes with my custom type
        >
          Input Node
        </DraggableCard>
        <DraggableCard
          type={nodeTypes.rule}
          disabled={doesNodeExist(nodeTypes.rule)}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart(nodeTypes.rule)}
        >
          Rule Node
        </DraggableCard>
        <DraggableCard
          type={nodeTypes.action}
          disabled={doesNodeExist(nodeTypes.action)}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart(nodeTypes.action)}
        >
          Action Node
        </DraggableCard>
      </div>

      <div className="flex gap-2 mb-4 justify-center">
        <button
          className="bg-backg p-2 rounded-sm disabled:cursor-not-allowed disabled:text-darkgrey duration-300"
          onClick={undo}
          disabled={!canUndo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>

        <button
          className="bg-backg p-2 rounded-sm disabled:cursor-not-allowed disabled:text-darkgrey duration-300"
          onClick={redo}
          disabled={!canRedo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
            />
          </svg>
        </button>
      </div>

      <PrimaryButton
        className={"px-3 h-8 text-sm w-full"}
        onClick={onSave}
        isLoading={isLoading}
        disabled={!isWorkflowDirty}
      >
        Save
      </PrimaryButton>
    </div>
  );
};

export default WorkflowHeader;
