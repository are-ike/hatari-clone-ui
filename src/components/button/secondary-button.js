import React from 'react';
import { cls } from "../../utils/functions";
import Button from '.';

const SecondaryButton = ({ children, onClick, className }) => {
    return (
        <Button
          className={cls("bg-backg text-darkblue", className)}
          onClick={onClick}
        >
          {children}
        </Button>
      );
};

export default SecondaryButton;