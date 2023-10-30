import React from "react";
import DraggableCard from "../draggable-card";
import { nodeTypes } from "../../constants";
import PrimaryButton from "../button/primary-button";
import SecondaryButton from "../button/secondary-button";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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
  const history = useHistory();

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
    <div className="flex items-center py-4 px-12 justify-between">
      <SecondaryButton
        className={"flex items-center gap-2"}
        onClick={() => {
          //if (!isWorkflowDirty) {
            history.goBack();
          // } else {
          //   toast.warn(
          //     <div>
          //       <span>"Your changes have not been saved"</span>
          //       <SecondaryButton
          //         className={"px-3 h-8 text-sm"}
          //         onClick={(e) => {e.stopPropagation(); history.goBack();}}
          //       >
          //         Leave
          //       </SecondaryButton>
          //     </div>
          //   );
          // }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
          strokeWidth={3}
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>

        <span>Back</span>
      </SecondaryButton>

      <div className="flex">
        <div className="flex gap-2 mr-6">
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

        <div className="flex gap-2 mr-6">
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
          className={"px-3 h-8 text-sm"}
          onClick={onSave}
          isLoading={isLoading}
          disabled={!isWorkflowDirty}
        >
          Save
        </PrimaryButton>
      </div>
    </div>
  );
};

export default WorkflowHeader;
