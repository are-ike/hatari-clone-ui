import React, { useState } from "react";
import SearchBar from "../../components/searchbar";
import Table from "../../components/table";
import AddProjectModal from "../../components/modal/add-project-modal";
import DeleteModal from "../../components/modal/delete-modal";
import PrimaryButton from "../../components/button/primary-button";
import EmptyContainer from "../../components/empty-container";

const girl = false;
const columns = ["project name", "created at", "actions"];
const rows = [
  {
    name: "Ike",
    createdAt: "55555",
  },
  {
    name: "Ikeffooooooooooooo",
    createdAt: "55555",
  },
  {
    name: "Ike",
    createdAt: "55555",
  },
  {
    name: "Ike",
    createdAt: "55555",
  },
];

const Projects = () => {
  const [query, setQuery] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const renderRows = (row) => {
    return (
      <>
        <div>{row.name}</div>
        <div>{row.createdAt}</div>
        <div className="flex gap-2">
          <button onClick={() => setOpenAddModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[18px] h-[18px] text-darkgrey"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button onClick={() => setOpenDeleteModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
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
        </div>
      </>
    );
  };

  const render = () => {
    if (girl) return "hi";

    return (
      <div className="">
        <AddProjectModal open={openAddModal} setOpen={setOpenAddModal} />
        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          text={`You're about to permanently delete this project`}
        />

        <div className="py-4 max-w-page mx-auto flex justify-between items-center">
          <p className="text-2xl font-medium">Projects</p>
          <PrimaryButton onClick={() => setOpenAddModal(true)}>
            Create Project
          </PrimaryButton>
        </div>

        <div className="bg-backg py-8 h-[calc(100vh-142px)] overflow-y-auto">
          {!rows.length ? (
            <EmptyContainer
              text={
                "You haven’t created any projects yet. When you do, it’ll show up here."
              }
              buttonText={"Create Project"}
              onClick={() => setOpenAddModal(true)}
            />
          ) : (
            <div className="max-w-page mx-auto py-6 px-10 bg-white rounded-lg">
              <SearchBar
                placeholder={"Search projects"}
                query={query}
                setQuery={setQuery}
              />
              <Table
                columns={columns}
                rows={rows}
                renderRows={renderRows}
                className="mt-4"
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
