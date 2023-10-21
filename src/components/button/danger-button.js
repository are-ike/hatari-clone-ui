import React from 'react';
import Button from '.';
import { cls } from "../../utils/functions";

const DangerButton = ({ children, onClick, className }) => {
    return (
        <Button
          className={cls("bg-del text-white", className)}
          onClick={onClick}
        >
          {children}
        </Button>
      );
};

export default DangerButton;