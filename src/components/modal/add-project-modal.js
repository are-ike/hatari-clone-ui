import React, { useEffect, useState } from "react";
import Modal from ".";
import Input from "../input";
import Textarea from "../input/textarea";
import PrimaryButton from "../button/primary-button";
import { useMutation } from "@tanstack/react-query";
import projectApis from "../../api/projects";

const AddProjectModal = ({ open, setOpen, isEdit = false }) => {
  const [projectName, setProjectName] = useState(
    isEdit ? open.project.name : ""
  );
  const [projectDescription, setProjectDescription] = useState(
    isEdit ? open.project.description : ""
  );

  const createUpdateProject = useMutation({
    mutationFn: isEdit
      ? projectApis.updateProjectConfig
      : projectApis.createProject,
    onSuccess: () => {
      onClose();
    },
    onError: (e) => {
      alert(e);
    },
  });

  useEffect(() => {
    setProjectName(isEdit ? open.project.name : "");
    setProjectDescription(isEdit ? open.project.description : "");
  }, [open]);

  const onClose = () => {
    setOpen({
      isOpen: false,
      project: {
        id: null,
        name: "",
        description: "",
      },
    });
  };

  const onSave = () => {
    const data = {
      name: projectName,
      description: projectDescription,
    };

    if (!isEdit) {
      createUpdateProject.mutate(data);
    } else {
      createUpdateProject.mutate({ id: open.project.id, data });
    }
  };

  return (
    <Modal
      open={open.isOpen}
      setOpen={onClose}
      header={isEdit ? "Edit Project" : "Create Project"}
    >
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
      <PrimaryButton className="w-full" onClick={onSave}>
        Save
      </PrimaryButton>
    </Modal>
  );
};

export default AddProjectModal;
