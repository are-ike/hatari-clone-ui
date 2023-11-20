import React, { useEffect, useRef, useState } from "react";
import Modal from ".";
import Input from "../input";
import Textarea from "../input/textarea";
import PrimaryButton from "../button/primary-button";
import { useMutation } from "react-query";
import projectApis from "../../api/projects";
import { useParams, useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Toast, { types } from "../toast";

const AddProjectModal = ({ open, setOpen, isEdit = false }) => {
  const history = useHistory()
  const { id } = useParams();
  const [projectName, setProjectName] = useState(
    isEdit ? open.project.name : ""
  );
  const [projectDescription, setProjectDescription] = useState(
    isEdit ? open.project.description : ""
  );

  const inputRef = useRef();
  const queryClient = useQueryClient();
  const createUpdateProject = useMutation({
    mutationFn: isEdit ? projectApis.updateProject : projectApis.createProject,
    onSuccess: (data) => {
      const project = { name: projectName, description: projectDescription };
      if (isEdit) {
        queryClient.invalidateQueries(["project", id]);
        toast.success(
          <Toast type={types.success}>Successfully edited project</Toast>
        );
        project.id = open.project.id;
        queryClient.invalidateQueries();
      } else {
        toast.success("Successfully created project");
        history.push(`/projects/${data.project.id}`)
        project.id = null;
      }

      setOpen({
        isOpen: false,
        project,
      });
    },
    onError: (e) => {
      toast.error(
        <Toast type={types.error}>An error occured. Please try again.</Toast>
      );
    },
  });

  useEffect(() => {
    setProjectName(isEdit ? open.project.name : "");
    setProjectDescription(isEdit ? open.project.description : "");
  }, [open]);

  useEffect(() => {
    if (open.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, inputRef.current]);

  const onClose = () => {
    setOpen((state) => ({
      isOpen: false,
      project: {
        ...state.project,
      },
    }));
  };

  const isDirty =
    projectName.trim() !== open.project.name ||
    projectDescription.trim() !== open.project.description;

  const isValid = !!projectName.trim().length;

  const onSave = () => {
    const data = {
      name: projectName.trim(),
      description: projectDescription.trim(),
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
      canClose={!createUpdateProject.isLoading}
    >
      <div className="mb-4">
        <p className="text-sm mb-2 text-body">Project Name</p>
        <Input
          value={projectName}
          setValue={setProjectName}
          placeholder={"ex. IT Project "}
          innerRef={inputRef}
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
      <PrimaryButton
        className="w-full"
        onClick={onSave}
        isLoading={createUpdateProject.isLoading}
        disabled={!(isDirty && isValid)}
      >
        Save
      </PrimaryButton>
    </Modal>
  );
};

export default AddProjectModal;
