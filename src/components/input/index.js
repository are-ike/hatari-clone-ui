import React from "react";

const Input = ({ value, setValue, placeholder }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="border-none bg-backg px-4 h-12 outline-none p-4 w-full rounded"
    />
  );
};

export default Input;
