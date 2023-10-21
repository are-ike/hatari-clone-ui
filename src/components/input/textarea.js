import React from "react";

const Textarea = ({ value, setValue, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    ></textarea>
  );
};

export default Textarea;
