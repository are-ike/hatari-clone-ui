import React from "react";
import Node from ".";
import { nodeTypes } from "../../constants";

const RuleNode = ({ data }) => {
  return <Node type={nodeTypes.rule} data={data} />;
};

export default RuleNode;
