import React, { useCallback, useRef } from "react";
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

const nodeTypes = {
  action: ActionNode,
  inputNode: InputNode,
  rule: RuleNode,
};

const Workflow = () => {
  const selectedNodeCard = useRef();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),

    [setEdges]
  );

  const createNode = (e, type) => {
    return {
      id: `${nodes.length + 1}`,
      position: { x: e.pageX - 130, y: e.pageY - 130 },
      data: {
        label: "Untitled",
        updateNodeLabel: updateNodeLabel(`${nodes.length + 1}`),
      },
      type,
    };
  };

  const onDrop = (e) => {
    const newNode = createNode(e, selectedNodeCard.current);

    setNodes((nodes) => {
      const newNodes = JSON.parse(JSON.stringify(nodes));
      newNodes.push(newNode);

      return newNodes;
    });

    selectedNodeCard.current = null
  };

  const updateNodeLabel = (nodeId) => (label) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (nodeId === node.id) {
          node.data.label = label;
        }

        return { ...node, data: { ...node.data } };
      })
    );
  };

  return (
    <div>
      <WorkflowHeader
        selectedNodeCardRef={selectedNodeCard}
        nodes={nodes}
      />

      <div
        style={{ width: "100vw", height: "100vh" }}
        className="bg-[#F6F6F8]"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
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
