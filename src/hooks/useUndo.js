import React, { useRef, useState } from "react";
import { isWorkflowDirty } from "../constants";

const useUndo = (setState) => {
  const [stack, setStack] = useState([]);
  const [pointer, setPointer] = useState(-1);
  const [blockUndoRedo, setBlockUndoRedo] = useState(false);

  const canUndo = pointer > 0;
  const canRedo = pointer < stack.length - 1;
  const keepBlock = useRef(false);

  const undo = () => {
    setState(stack[pointer - 1].nodes, stack[pointer - 1].edges);
    setPointer(pointer - 1);
    setBlockUndoRedo(true);
  };

  const redo = () => {
    setState(stack[pointer + 1].nodes, stack[pointer + 1].edges);
    setPointer(pointer + 1);
    setBlockUndoRedo(true);
  };

  const updateStackNodeData = (state, push = null) => {
    setStack((stack) => {
      const newStack = stack.map((st) => ({
        nodes: st.nodes.map((node) => ({
          ...node,
          data:
            state.nodes.filter((n) => node.id === n.id)[0]?.data ?? node.data,
        })),
        edges: st.edges.map((edge) => ({ ...edge })),
      }));

      if (push) {
        newStack.push(push);
      }
      return newStack;
    });
  };

  const push = (state) => {
    if (blockUndoRedo) {
      if (!keepBlock.current) setBlockUndoRedo(false);
      return;
    }

    if (stack.length && !isWorkflowDirty(stack[stack.length - 1], state)) {
      updateStackNodeData(state);
      return;
    }

    if (!stack.length) {
      setPointer(0);
    } else {
      if (stack.length - pointer > 1) {
        const newStack = stack.filter((_, i) => i <= pointer);
        setStack(newStack);
        setPointer(newStack.length);
      } else {
        setPointer(stack.length);
      }
    }

    updateStackNodeData(state, state);
  };

  const block = (val, keep = false) => {
    setBlockUndoRedo(val);
    keepBlock.current = !val ? false : keep;
  };
//   console.log(stack);
  return {
    undo,
    redo,
    canUndo,
    canRedo,
    push,
    block,
  };
};

export default useUndo;
