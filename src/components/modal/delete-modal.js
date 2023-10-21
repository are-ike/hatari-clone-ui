import React from "react";
import Button from "../button";
import Modal from ".";

const DeleteModal = ({ open, setOpen, header, text }) => {
  return (
    <Modal open={open} setOpen={setOpen} header={header}>
      <p>Are you sure?</p>
      <p>{text}</p>
      <Button>Cancel</Button>
      <Button>Yes, delete</Button>
    </Modal>
  );
};

export default DeleteModal;
