import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
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
import ActionNodeModal from "../../components/modal/action-node-modal";
import { useMutation } from "@tanstack/react-query";
import projectApis from "../../api/projects";
import { toast } from "react-toastify";

const nodeTypes = {
  action: ActionNode,
  inputNode: InputNode,
  rule: RuleNode,
};

const Workflow = ({ project }) => {
  const [draggableCard, setDraggableCard] = useState({
    isDragging: false,
    isDropped: false,
    type: null,
  });
  const [openRuleNode, setOpenRuleNode] = useState(false);
  const [openActionNode, setOpenActionNode] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const updateProject = useMutation({
    mutationFn: projectApis.updateProject,
    onSuccess: () => {
      toast.success("Saved");
    },
    onError: () => toast.error("Unable to save workflow. Try again"),
  });

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

  const deleteNode = (type) => {
    setNodes((nodes) => {
      let newNodes = getNewNodesArray(nodes);
      newNodes = newNodes.filter((node) => node.id !== type);
      return newNodes;
    });

    setEdges((edges) => {
      let newEdges = edges.map((edge) => ({ ...edge }));
      newEdges = newEdges.filter(
        (edge) => edge.source !== type && edge.target !== type
      );
      return newEdges;
    });
  };

  const transformApiData = (graph) => {
    const json = JSON.parse(graph);
    const edges = json.edges;

    const nodes = json.nodes.map((node) => {
      node.data.open =
        node.type === nodeValues.rule ? openRuleNode : openActionNode;
      node.data.setOpen =
        node.type === nodeValues.rule ? setOpenRuleNode : setOpenActionNode;
      node.data.onDelete = () => deleteNode(node.type);

      return node;
    });

    return {
      nodes,
      edges,
    };
  };

  useEffect(() => {
    if (project.nodes) {
      setEdges(transformApiData(project.nodes).edges);
      setNodes(transformApiData(project.nodes).nodes);
    }
  }, [project]);

  const createNode = (e, type) => {
    const node = {
      id: type,
      position: { x: e.pageX - 130, y: e.pageY - 130 },
      data: {
        label: "Untitled",
        open: type === nodeValues.rule ? openRuleNode : openActionNode,
        setOpen: type === nodeValues.rule ? setOpenRuleNode : setOpenActionNode,
        onDelete: () => deleteNode(type),
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
      nodes: JSON.parse(JSON.stringify(nodes)), //remove functions
      edges,
    };

    updateProject.mutate({
      id: project.id,
      data: { nodes: JSON.stringify(payload) },
    });
  };

  //console.log(JSON.parse(project.nodes));
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
        isLoading={updateProject.isPending}
        // undo={undo}
        // undo={undo}
      />

      <div
        className="bg-[#F6F6F8] h-[calc(100vh-142px)] w-screen overflow-hidden"
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
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Workflow;
