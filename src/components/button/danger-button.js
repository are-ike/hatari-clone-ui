import React from 'react';
import Button from '.';
import { cls } from "../../utils/functions";

const DangerButton = ({ children, onClick, className, isLoading }) => {
    return (
        <Button
          className={cls("bg-del text-white", className)}
          onClick={onClick}
          isLoading={isLoading}
        >
          {children}
        </Button>
      );
};

export default DangerButton;