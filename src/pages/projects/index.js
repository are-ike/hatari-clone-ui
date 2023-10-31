import React, { useState } from "react";
import SearchBar from "../../components/searchbar";
import Table from "../../components/table";
import AddProjectModal from "../../components/modal/add-project-modal";
import DeleteModal from "../../components/modal/delete-modal";
import PrimaryButton from "../../components/button/primary-button";
import EmptyContainer from "../../components/empty-container";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import projectApis from "../../api/projects";
import loader from "../../assets/loader.svg";
import ErrorMessage from "../../components/error-message";
import { useHistory } from "react-router-dom";
import Tag from "../../components/tag";
import { projectStatuses } from "../../constants";

const columns = ["project name", "created on", "data stream", "actions"];

const Projects = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [openAddModal, setOpenAddModal] = useState({
    isOpen: false,
    project: {
      id: null,
      name: "",
      description: "",
    },
  });
  const [openDeleteModal, setOpenDeleteModal] = useState({
    isOpen: false,
    id: null,
    name: "",
  });

  const getProjects = useQuery({
    queryKey: ["projects"],
    queryFn: projectApis.getProjects,
  });

  const renderRows = (row) => {
    return (
      <>
        <td className="px-4" title={row.name}>
          <span className="truncate max-w-[200px] inline-block ">
          {row.name}
          </span>
        </td>
        <td className="p-4">{format(new Date(row.createdAt), "dd MMM, yyyy")}</td>
        <td className="py-2 px-4">
          <Tag type={row.status}>{projectStatuses[row.status]}</Tag>
        </td>
        <td className="flex gap-2 p-4">
          {/* <button
          onClick={(e) => {
             e.stopPropagation();

            history.push(`/projects/${row.id}/events`);
          }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-[18px] h-[18px] text-darkgrey"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button> */}
          <button
            className="hover:text-[#5E5E72] text-darkgrey h-full"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal({ id: row.id, isOpen: true, name: row.name });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[18px] h-[18px]"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </td>
      </>
    );
  };

  const render = () => {
    if (getProjects.isLoading)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-62px)]">
          <img src={loader} alt="" width={60} height={60} />
        </div>
      );

    if (getProjects.isError)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-62px)]">
          <ErrorMessage
            message={
              "An error occured while fetching projects. Please try again."
            }
            refetch={getProjects.refetch}
          />
        </div>
      );

    return (
      <div className="">
        <AddProjectModal open={openAddModal} setOpen={setOpenAddModal} />
        <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} />

        <div className="py-4 max-w-page mx-auto flex justify-between items-center">
          <p className="text-2xl font-medium">Projects</p>
          <PrimaryButton
            onClick={() =>
              setOpenAddModal({
                isOpen: true,
                project: {
                  id: null,
                  name: "",
                  description: "",
                },
              })
            }
          >
            Create Project
          </PrimaryButton>
        </div>

        <div className="bg-backg py-8 h-[calc(100vh-142px)] overflow-y-auto">
          {!getProjects.data?.length ? (
            <EmptyContainer
              text={
                "You haven’t created any projects yet. When you do, it’ll show up here."
              }
              buttonText={"Create Project"}
              onClick={() =>
                setOpenAddModal({
                  isOpen: true,
                  project: {
                    id: null,
                    name: "",
                    description: "",
                  },
                })
              }
            />
          ) : (
            <div className="max-w-page mx-auto">
              <div className="py-6 px-10 bg-white rounded-lg">
                <SearchBar
                  placeholder={"Search projects"}
                  query={query}
                  setQuery={setQuery}
                />
                <Table
                  columns={columns}
                  rows={getProjects.data}
                  renderRows={renderRows}
                  className="mt-4"
                  onRowClick={(row) =>
                    history.push(`/projects/${row.id}/events`)
                  }
                />
              </div>

              <ReactPaginate
                className="flex p-2 bg-white w-fit rounded mt-4 ml-auto items-center"
                pageLinkClassName="h-8 w-8 text-body flex items-center justify-center hover:bg-primary hover:text-white rounded"
                nextLabel={"Next >"}
                onPageChange={(e) => console.log(e.selected)}
                pageRangeDisplayed={5}
                pageCount={5}
                previousLabel={"< Previous"}
                previousLinkClassName="mr-2"
                nextLinkClassName="ml-2"
                disabledLinkClassName="text-darkgrey cursor-not-allowed"
                activeLinkClassName="bg-primary text-white"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return render();
};

export default Projects;
