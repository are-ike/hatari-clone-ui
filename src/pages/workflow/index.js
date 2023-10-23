import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ActionNode from "../../components/nodes/action-node";
import InputNode from "../../components/nodes/input-node";
import RuleNode from "../../components/nodes/rule-node";
import WorkflowHeader from "../../components/workflow-header";
import RuleNodeModal from "../../components/modal/rule-node-modal";
import { nodeTypes as nodeValues, ruleRow } from "../../constants";
import NodeModal from "../../components/modal/node-modal";
import ActionNodeModal from "../../components/modal/action-node-modal";

const nodeTypes = {
  action: ActionNode,
  inputNode: InputNode,
  rule: RuleNode,
};

const Workflow = () => {
  const [draggableCard, setDraggableCard] = useState({
    isDragging: false,
    isDropped: false,
    type: null,
  });
  const [openRuleNode, setOpenRuleNode] = useState(false);
  const [openActionNode, setOpenActionNode] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.filter((node) => node.id === params.source)[0]
        ?.type;
      const targetNode = nodes.filter((node) => node.id === params.target)[0]
        ?.type;

      if (sourceNode === "inputNode" && targetNode === nodeValues.action)
        return alert("non");

      return setEdges((eds) => addEdge(params, eds));
    },

    [setEdges, nodes]
  );

  const getNewNodesArray = (nodes) => {
    return nodes.map((node) => ({ ...node, data: { ...node.data } }));
  };

  const createNode = (e, type) => {
    const node = {
      id: `${nodes.length + 1}`,
      position: { x: e.pageX - 130, y: e.pageY - 130 },
      data: {
        label: "Untitled",
        open: type === nodeValues.rule ? openRuleNode : openActionNode,
        setOpen: type === nodeValues.rule ? setOpenRuleNode : setOpenActionNode,
      },
      type,
    };

    if (type === nodeValues.rule) {
      node.data.rules = [{ ...ruleRow }];
    }

    if (type === nodeValues.action) {
      node.data.action = "";
      node.data.isCustom = false;
    }

    return node;
  };

  const onDrop = (e) => {
    const newNode = createNode(e, draggableCard.type);

    setNodes((nodes) => {
      const newNodes = getNewNodesArray(nodes);
      newNodes.push(newNode);

      return newNodes;
    });

    setDraggableCard({
      isDragging: false,
      isDropped: false,
      type: null,
    });
  };

  const updateRuleNode = ({ label, rules }) => {
    setNodes((nodes) => {
      const newNodes = getNewNodesArray(nodes);
      const ruleNode = newNodes.filter(
        (node) => node.type === nodeValues.rule
      )[0];

      ruleNode.data.label = label;
      ruleNode.data.rules = rules;

      return newNodes;
    });
  };

  const updateActionNode = ({ label, action, isCustom }) => {
    setNodes((nodes) => {
      const newNodes = getNewNodesArray(nodes);
      const actionNode = newNodes.filter(
        (node) => node.type === nodeValues.action
      )[0];

      actionNode.data.label = label;
      actionNode.data.action = action;
      actionNode.data.isCustom = isCustom;

      return newNodes;
    });
  };

  const onSave = () => {
    const payload = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges,
    };
  };
  return (
    <div>
      <RuleNodeModal
        open={openRuleNode}
        setOpen={setOpenRuleNode}
        ruleNode={
          nodes.filter((node) => node.type === nodeValues.rule)[0]?.data ?? null
        }
        updateRuleNode={updateRuleNode}
      />
      <ActionNodeModal
        open={openActionNode}
        setOpen={setOpenActionNode}
        actionNode={
          nodes.filter((node) => node.type === nodeValues.action)[0]?.data ??
          null
        }
        updateActionNode={updateActionNode}
      />
      <WorkflowHeader
        setDraggableCardState={setDraggableCard}
        nodes={nodes}
        onSave={onSave}
      />

      <div
        style={{ width: "100vw", height: "100vh" }}
        className="bg-[#F6F6F8]"
        onDrop={onDrop}
        onDragOver={(e) => {
          if (draggableCard.isDragging) {
            e.preventDefault();
          }
        }}
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Workflow;
