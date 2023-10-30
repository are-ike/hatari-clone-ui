import React from "react";
import { cls } from "../../utils/functions";
import Button from ".";
import loaderBlack from "../../assets/loader-btn-dark.svg";

const SecondaryButton = ({
  children,
  onClick,
  className,
  disabled,
  isLoading,
}) => {
  return (
    <Button
      className={cls(
        "bg-backg text-darkblue disabled:cursor-not-allowed disabled:text-darkgrey hover:text-primary",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
      loaderSrc={loaderBlack}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
