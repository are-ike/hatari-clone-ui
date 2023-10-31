import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/input";
import SecondaryButton from "../../components/button/secondary-button";
import AddProjectModal from "../../components/modal/add-project-modal";
import { isValidUrl, projectStatuses } from "../../constants";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import projectApis from "../../api/projects";
import { toast } from "react-toastify";
import Tag from "../../components/tag";

const Config = ({ project }) => {
  const [webhook, setWebhook] = useState(project.webhook);
  const [isEditing, setIsEditing] = useState(false);
  const [openAddModal, setOpenAddModal] = useState({
    isOpen: false,
    project: project ?? {},
  });
  const [viewMore, setViewMore] = useState(false);
  const showViewMore = project.description.length > 200;
  const inputRef = useRef();
  const description =
    viewMore || !showViewMore
      ? project.description
      : `${project.description.slice(0, 200)}...`;

  useEffect(() => {
    if (project) setOpenAddModal({ isOpen: false, project });
  }, [project]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef.current]);

  const canSaveWebhook =
    webhook.trim() &&
    webhook.trim() !== project.webhook &&
    isValidUrl(webhook.trim());

  const updateProject = useMutation({
    mutationFn: projectApis.updateProject,

    onSuccess: ({ project }) => {
      setWebhook(project.webhook);
      if (project.webhook) {
        toast.success("Successfully added webhook");
        setIsEditing(false);
      } else {
        toast.success("Successfully deleted webhook");
      }
    },
    onError: (e) => {
      toast.error("An error occured. Try again");
    },
  });

  const updateWebhook = (value) => {
    const data = {
      webhook: value ?? webhook.trim(),
    };

    updateProject.mutate({ id: project.id, data });
  };

  return (
    <div>
      <AddProjectModal open={openAddModal} setOpen={setOpenAddModal} isEdit />
      <div className="flex items-stretch min-h-[520px] gap-8">
        <div className="rounded-lg bg-white p-8 text-darkblue w-[450px]   ">
          <div className="gap-8 flex flex-col">
            <div className="flex items-start justify-between">
              <div className="">
                <p className="font-semibold text-sm mb-2">Project Name</p>
                <p
                  className="text-body truncate max-w-[220px]"
                  title={project.name}
                >
                  {project.name}
                </p>
              </div>
              <button
                className=""
                onClick={() =>
                  setOpenAddModal((state) => ({
                    project: state.project,
                    isOpen: true,
                  }))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </button>
            </div>
            <div>
              <p className="font-semibold text-sm mb-2">Project Description</p>
              <p className="text-body">{description}</p>
              {showViewMore && (
                <button
                  onClick={() => setViewMore(!viewMore)}
                  className="text-primary"
                >
                  {!viewMore ? "view more" : "view less"}
                </button>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm mb-2">Data Stream Status</p>
              <Tag className="!py-2" type={project.status}>
                {projectStatuses[project.status]}
              </Tag>
            </div>
            <div>
              <p className="font-semibold text-sm mb-2">Date & Time created</p>
              <p className="text-body">
                {format(
                  new Date(project.createdAt),
                  "dd MMM yyyy, hh:mm aaaaa'm'"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 w-full ">
          <div className="mb-6">
            <p className="font-medium text-body text-sm mb-2">Project URL</p>

            <div className="flex gap-4 w-[600px]">
              <Input value={project.project_url} disabled />
              <SecondaryButton
                className={"flex items-center gap-2"}
                onClick={() => {
                  if (!project.project_url) return alert("workflow");
                  navigator.clipboard
                    .writeText("hiiiii")
                    .then(() => alert("yh"))
                    .catch(() => alert("no"));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                  <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                </svg>

                <span>Copy</span>
              </SecondaryButton>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium text-body text-sm mb-2">Webhook</p>
            <div className="flex gap-4 w-[600px]">
              <Input
                value={webhook}
                setValue={setWebhook}
                disabled={!isEditing || updateProject.isPending}
                placeholder={"Enter a valid webhook URL"}
                innerRef={inputRef}
              />
              {!isEditing ? (
                <div className="flex gap-4">
                  <SecondaryButton
                    className={"flex items-center px-3 "}
                    onClick={() => setIsEditing(true)}
                    disabled={updateProject.isPending}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                  </SecondaryButton>

                  <SecondaryButton
                    className={"flex items-center px-3"}
                    isLoading={updateProject.isPending}
                    onClick={() => {
                      updateWebhook("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SecondaryButton>
                </div>
              ) : (
                <div className="flex gap-4">
                  <SecondaryButton
                    disabled={updateProject.isPending}
                    onClick={() => {
                      setWebhook(project.webhook);
                      setIsEditing(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </SecondaryButton>
                  <SecondaryButton
                    disabled={!canSaveWebhook}
                    isLoading={updateProject.isPending}
                    onClick={() => {
                      updateWebhook();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </SecondaryButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;
