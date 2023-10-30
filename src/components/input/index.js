import React from "react";

const Input = ({ value, setValue, placeholder, disabled, innerRef }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="border-none bg-backg placeholder:text-darkgrey px-4 h-12 outline-none p-4 w-full rounded focus:ring-btnHover focus:ring-1 hover:ring-btnHover hover:ring-1 disabled:ring-0"
      disabled={disabled}
      ref={innerRef}
    />
  );
};

export default Input;
