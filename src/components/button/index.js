import React from "react";
import { cls } from "../../utils/functions";
import loader from "../../assets/loader-btn.svg";

const Button = ({
  children,
  onClick,
  className,
  disabled,
  isLoading,
  loaderSrc = null,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cls(
        "h-12 px-6 font-medium rounded duration-300 flex items-center justify-center",
        className
      )}
    >
      {isLoading ? (
        <img src={loaderSrc ?? loader} alt="" width={20} height={20} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
