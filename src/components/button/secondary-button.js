import React from "react";
import { cls } from "../../utils/functions";
import Button from ".";
import loader from '../../assets/loader-btn-dark.svg'

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
        "bg-backg text-darkblue disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
      loaderSrc={loader}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
