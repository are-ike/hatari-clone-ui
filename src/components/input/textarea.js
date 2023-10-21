import React from "react";

const Textarea = ({ value, setValue, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="border-none bg-backg px-4 h-[130px] outline-none p-4 w-full"
    ></textarea>
  );
};

export default Textarea;
