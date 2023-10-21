import React from "react";
import Button from ".";

const PrimaryButton = ({ children, onClick }) => {
  return (
    <Button className={"bg-primary text-white"} onClick={onClick}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
