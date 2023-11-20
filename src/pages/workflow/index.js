import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import ActionNode from "../../components/nodes/action-node";
import InputNode from "../../components/nodes/input-node";
import RuleNode from "../../components/nodes/rule-node";
import WorkflowHeader from "../../components/workflow-header";
import RuleNodeModal from "../../components/modal/rule-node-modal";
import {
  isWorkflowDirty,
  nodeTypes as nodeValues,
  ruleRow,
} from "../../constants";
import ActionNodeModal from "../../components/modal/action-node-modal";
import { useMutation } from "react-query";
import projectApis from "../../api/projects";
import { toast } from "react-toastify";
import useUndo from "../../hooks/useUndo";
import { useHistory } from "react-router-dom";
import { queryClient } from "../../App";

const nodeTypes = {
  action: ActionNode,
  inputNode: InputNode,
  rule: RuleNode,
};

const WorkflowWrapper = ({ project }) => {
  return (
    <ReactFlowProvider>
      <Workflow project={project} />
    </ReactFlowProvider>
  );
};

const Workflow = ({ project }) => {
  const history = useHistory();
  const [draggableCard, setDraggableCard] = useState({
    isDragging: false,
    isDropped: false,
    type: null,
  });
  const [openRuleNode, setOpenRuleNode] = useState(false);
  const [openActionNode, setOpenActionNode] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    project.nodes ? transformApiData(project.nodes).nodes : []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    project.nodes ? transformApiData(project.nodes).edges : []
  );

  const canvasContainer = useRef();
  const reactFlowInstance = useReactFlow();
  const setWorkflow = (nodes, edges) => {
    setNodes(nodes);
    setEdges(edges);
  };

  const { undo, redo, canRedo, canUndo, push, block } = useUndo(setWorkflow);

  const updateProject = useMutation({
    mutationFn: projectApis.updateProject,
    onSuccess: (_, {data: d}) => {
      toast.success("Saved");
      queryClient.setQueryData(["project", project.id], data => {
        const newData = {...data, nodes:d.nodes }
        console.log(data, newData);
        return newData

      })

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

      const updatedParams = { ...params };
      updatedParams.markerEnd = {
        type: MarkerType.ArrowClosed,
        color: "#1343C7",
        width: 18,
        height: 18,
        strokeWidth: 3.5,
      };

      updatedParams.style = { stroke: "#1343C7" };

      return setEdges((eds) => addEdge(updatedParams, eds));
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

  function transformApiData(graph) {
    const json = JSON.parse(graph);
    const edges = json.edges;

    const nodes = json.nodes.map((node) => {
      // node.data.open =
      //   node.type === nodeValues.rule ? openRuleNode : openActionNode;
      node.data.setOpen =
        node.type === nodeValues.rule ? setOpenRuleNode : setOpenActionNode;
      node.data.onDelete = () => deleteNode(node.type);

      return node;
    });

    return {
      nodes,
      edges,
    };
  }

  const isDirty = useMemo(() => {
    if (project.nodes)
      return isWorkflowDirty(
        transformApiData(project.nodes),
        { nodes, edges },
        true
      );

    return false;
  }, [project, nodes, edges]);

  useEffect(() => {
    push({ nodes, edges });
  }, [nodes, edges]);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [isDirty]);

  useEffect(() => {
    let unblock;
    if (isDirty) {
      unblock = history.block(() => {
        if (
          window.confirm(
            "You have unsaved changes, are you sure you want to leave?"
          )
        ) {
          return true;
        }
        return false;
      });
    }

    return () => {
      unblock && unblock();
    };
  }, [isDirty]);

  const createNode = (e, type) => {
    const reactFlowBounds = canvasContainer.current.getBoundingClientRect();

    const position = reactFlowInstance.project({
      x: e.clientX - reactFlowBounds.left,
      y: e.clientY - reactFlowBounds.top,
    });

    const node = {
      id: type,
      position,
      data: {
        label: type !== "inputNode" ? "Untitled" : project.name,
        //open: type === nodeValues.rule ? openRuleNode : openActionNode, --not needed
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

  const onNodeDragStart = useCallback(() => block(true, true), [block]);
  const onNodeDragStop = useCallback(() => {
    block(false);
    push({ nodes, edges });
  }, [block, push, nodes, edges]);

  const updateRuleNode = ({ label = null, rules = null }) => {
    setNodes((nodes) => {
      const newNodes = getNewNodesArray(nodes);
      const ruleNode = newNodes.filter(
        (node) => node.type === nodeValues.rule
      )[0];

      if (label) ruleNode.data.label = label;

      if (rules) ruleNode.data.rules = rules;

      return newNodes;
    });
  };

  const updateActionNode = ({
    label = null,
    action = null,
    isCustom = null,
  }) => {
    setNodes((nodes) => {
      const newNodes = getNewNodesArray(nodes);
      const actionNode = newNodes.filter(
        (node) => node.type === nodeValues.action
      )[0];

      if (label) actionNode.data.label = label;
      if (action) actionNode.data.action = action;
      if (isCustom) actionNode.data.isCustom = isCustom;

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
  // console.log(nodes);
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
        isLoading={updateProject.isLoading}
        isWorkflowDirty={isDirty}
        undo={undo}
        redo={redo}
        canRedo={canRedo}
        canUndo={canUndo}
      />

      <div
        className="bg-[#F6F6F8] h-[calc(100vh-192px)] w-screen overflow-hidden"
        onDrop={onDrop}
        onDragOver={(e) => {
          if (draggableCard.isDragging) {
            e.preventDefault();
          }
        }}
        ref={canvasContainer}
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineStyle={{
            stroke: "#1343C7",
          }}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowWrapper;
