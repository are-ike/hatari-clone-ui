import React, { useEffect } from "react";
import Select from "react-select";
import { components } from "react-select";
import "./index.css";
import { cls } from "../../utils/functions";

const Dropdown = ({ value, options, setValue, placeholder }) => {
  const CustomGroupHeading = (props) => {
    useEffect(() => {
      const header = document.getElementById(props.id);

      header.parentElement.nextElementSibling.classList.add("options");

      if (header.textContent === value?.parent) {
        header.parentElement.classList.add("open");
        header.parentElement.nextElementSibling.classList.add("options-open");
      }
    }, [props.id]);

    const handleHeaderClick = (id) => {
      const heading = document.getElementById(id);

      if (heading.parentElement.classList.contains("open")) {
        heading.parentElement.classList.remove("open");
      } else {
        heading.parentElement.classList.add("open");
      }

      const options = heading.parentElement.nextElementSibling;
      if (options.classList.contains("options-open")) {
        options.classList.remove("options-open");
      } else {
        options.classList.add("options-open");
      }
    };

    return (
      <div
        className="group-heading-wrapper cursor-pointer flex items-center justify-between py-1 group"
        onClick={() => handleHeaderClick(props.id)}
      >
        <components.GroupHeading
          {...props}
          className={cls(
            " !duration-300 !text-sm !cursor-pointer",
            props.data.label === value?.parent
              ? "!text-primary"
              : "group-hover:!text-primary !text-darkgrey"
          )}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className={cls(
            "w-4 h-4 down mr-4 duration-300",
            props.data.label === value?.parent
              ? "text-primary"
              : "group-hover:text-primary text-darkgrey"
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    );
  };

  return (
    <Select
      options={options}
      onChange={setValue}
      value={value}
      placeholder={placeholder}
      components={{ GroupHeading: CustomGroupHeading }}
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
        option: (base, state) => ({
          ...base,
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "16px",
          color:
            state.isSelected && state.data.parent === value?.parent
              ? "#fff !important"
              : "#4A4A68",
          display: "flex",
          alignItems: "center",
          background:
            state.isSelected && state.data.parent === value?.parent
              ? "#1343C7 !important"
              : "transparent",
          padding: "15px 16px",
          ":hover": {
            background: "#D0D9F4",
          },
        }),
        indicatorSeparator: () => ({ display: "none" }),
        container: (base) => ({ ...base, width: "100%" }),
        menuList: (base) => ({ ...base, maxHeight: "200px", overflow: "auto" }),
        placeholder: (base) => ({ ...base, color: "#AFAFB9" }),
      }}
    />
  );
};

export default Dropdown;
