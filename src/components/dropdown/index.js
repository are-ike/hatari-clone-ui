import React from "react";
import Select from "react-select";

const Dropdown = ({ value, options, setValue, placeholder }) => {
  return (
    <Select
      options={options}
      onChange={setValue}
      value={value}
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          height: "48px",
          background: "#f9f9f9",
          borderColor: "transparent",
          outline: "none",
          padding: "0 16px",
          boxShadow: "none",
          ":hover": {
            borderColor: "#1343C7",
          },
          ":focus": {
            borderColor: "#1343C7 !important",
          },
        }),
        dropdownIndicator: (base) => ({ ...base, color: "#0E0E2C" }),
        option: (base) => ({
          ...base,
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "16px",
          color: "#4A4A68",
          display: "flex",
          alignItems: "center",
          background: "transparent",
          padding: "15px 16px",
          ":hover": {
            background: "#D0D9F4",
          },
        }),
        indicatorSeparator: () => ({ display: "none" }),
        container: (base) => ({ ...base, width: "100%" }),
        placeholder: (base) => ({ ...base, color: "#AFAFB9" }),
      }}
    />
  );
};

export default Dropdown;
