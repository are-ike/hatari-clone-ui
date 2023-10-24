import React from "react";
import Button from ".";
import { cls } from "../../utils/functions";

const PrimaryButton = ({
  children,
  onClick,
  className,
  disabled,
  isLoading,
}) => {
  return (
    <Button
      className={cls(
        "bg-primary text-white disabled:cursor-not-allowed disabled:bg-btnDisabled hover:bg-btnHover",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
