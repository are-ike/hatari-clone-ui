import React from "react";
import Modal from ".";
import DangerButton from "../button/danger-button";
import SecondaryButton from "../button/secondary-button";
import { useMutation } from "@tanstack/react-query";
import projectApis from "../../api/projects";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const DeleteModal = ({ open, setOpen }) => {
  const queryClient = useQueryClient();

  const deleteProject = useMutation({
    mutationFn: projectApis.deleteProject,
    onSuccess: () => {
      toast.success("Successfully deleted project");
      queryClient.invalidateQueries(["projects"]);
      onClose();
    },
    onError: () => toast.error("An error occured. Try again"),
  });

  const onDelete = () => {
    deleteProject.mutate(open.id);
  };

  const onClose = () => {
    setOpen({
      isOpen: false,
      id: null,
      name: open.name,
    });
  };
  return (
    <Modal
      open={open.isOpen}
      setOpen={onClose}
      className="py-8"
      canClose={!deleteProject.isPending}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-backg mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-del "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
        <p className="font-medium text-darkblue text-xl mb-4">Are you sure?</p>
        <p className="text-center mb-8">
          You're about to permanently delete "{open.name}"
        </p>
        <div className="flex gap-4">
          <SecondaryButton onClick={onClose} disabled={deleteProject.isPending}>
            Cancel
          </SecondaryButton>
          <DangerButton onClick={onDelete} isLoading={deleteProject.isPending}>
            Yes, delete
          </DangerButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
