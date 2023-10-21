import React, { useState } from "react";
import Modal from ".";
import Input from "../input";
import Textarea from "../input/textarea";
import PrimaryButton from "../button/primary-button";

const AddProjectModal = ({ open, setOpen }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  return (
    <Modal open={open} setOpen={setOpen} header={"Create Project"}>
      <div className="mb-4">
        <p className="text-sm mb-2 text-body">Project Name</p>
        <Input
          value={projectName}
          setValue={setProjectName}
          placeholder={"ex. IT Project "}
        />
      </div>
      <div className="mb-4">
        <p className="text-sm mb-2 text-body">Project Description</p>
        <Textarea
          value={projectDescription}
          setValue={setProjectDescription}
          placeholder={"ex. Project for IT defence"}
        />
      </div>
      <PrimaryButton className="w-full">Save</PrimaryButton>
    </Modal>
  );
};

export default AddProjectModal;
