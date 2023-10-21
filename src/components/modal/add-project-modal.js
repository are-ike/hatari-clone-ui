import React, { useState } from "react";
import Modal from ".";
import Input from "../input";
import Textarea from "../input/textarea";
import Button from "../button";

const AddProjectModal = ({ open, setOpen }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  return (
    <Modal open={open} setOpen={setOpen} header={"Create Project"}>
      <p>Project Name</p>
      <Input value={projectName} setValue={setProjectName} />
      <p>Project Description</p>
      <Textarea value={projectDescription} setValue={setProjectDescription} />
      <Button>Save</Button>
    </Modal>
  );
};

export default AddProjectModal;
