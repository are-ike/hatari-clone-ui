import React from "react";
import Node from ".";
import { nodeTypes } from "../../constants";

const ActionNode = ({ data }) => {
  return <Node type={nodeTypes.action} data={data} />;
};

export default ActionNode;
