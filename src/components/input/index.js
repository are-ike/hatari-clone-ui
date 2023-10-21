import React from "react";

const Input = ({ value, setValue, placeholder }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className=" outline-none p-4"
    />
  );
};

export default Input;
