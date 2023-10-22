import React from "react";
import Node from ".";
import { nodeTypes } from "../../constants";

const InputNode = ({ data }) => {
  return <Node type={nodeTypes.input} data={data} />;
};

export default InputNode;
