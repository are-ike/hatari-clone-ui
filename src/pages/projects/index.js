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

const columns = ["project name", "created on", "actions"];

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
        <td className="p-4" title={row.name}>
          {/* <span className="truncate max-w-[200px] inline-block "> */}
          {row.name}
          {/* </span> */}
        </td>
        <td className="p-4">{format(new Date(row.createdAt), "dd-MM-yyyy")}</td>
        <td className="flex gap-2 p-4">
          <button
            onClick={(e) => {
              //   e.stopPropagation();

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
          </button>
          <button
            onClick={(e) => {
              //e.stopPropagation();
              setOpenDeleteModal({ id: row.id, isOpen: true, name: row.name });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-[18px] h-[18px] text-darkgrey "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
                  //   onRowClick={
                  //   }
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
