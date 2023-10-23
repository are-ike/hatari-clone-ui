import React, { useState } from "react";
import { Link, useLocation, useParams, Redirect } from "react-router-dom";
import { cls } from "../../utils/functions";
import PrimaryButton from "../../components/button/primary-button";
import AddProjectModal from "../../components/modal/add-project-modal";

const tabs = [
  {
    name: "Events",
    link: "/events",
  },
  {
    name: "Workflow",
    link: "/workflow",
  },
  {
    name: "Configuration",
    link: "/configuration",
  },
];

const Project = ({ children, id }) => {
  const { pathname } = useLocation();


  if (id == "123") {
    return <Redirect to="*" />;
  }

  return (
    <div>
      <div className="py-4 max-w-page mx-auto">
        <p className="text-2xl font-medium h-12 flex items-center">Projects Name</p>
      </div>

      <div className="flex gap-4 max-w-page mx-auto">
        {tabs.map((tab) => (
          <Link
            to={`/projects/${id}${tab.link}`}
            className={cls(
              "py-3 font-medium duration-300 !border-b-2",
              pathname === `/projects/${id}${tab.link}`
                ? "text-primary border-primary "
                : "text-darkgrey border-transparent"
            )}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      <div className="bg-backg py-8 h-[calc(100vh-192px)] overflow-y-auto">
        <div className="max-w-page mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Project;
