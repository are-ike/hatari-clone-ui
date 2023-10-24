import React, { useEffect, useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { cls } from "../../utils/functions";
import { useQuery } from "@tanstack/react-query";
import projectApis from "../../api/projects";
import loader from "../../assets/loader.svg";
import ErrorMessage from "../../components/error-message";

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

const Project = ({ children, id, isWorkflow = false, setProject }) => {
  const { pathname } = useLocation();
  const [showNotFound, setShowNotFound] = useState(false);

  const getProject = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectApis.getProject(id),
  });

  useEffect(() => {
    if (getProject.isError && getProject.error.message.includes("404"))
      setShowNotFound(true);
  }, [getProject.isError]);

  // useEffect(() => {
  //   if (getProject.isSuccess && getProject.data)
  //     setProject(getProject.data);
  // }, [getProject.isSuccess, getProject.data, setProject]);

  const render = () => {
    if (showNotFound) return <Redirect to="*" />;
    if (getProject.isLoading)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-62px)]">
          <img src={loader} alt="" width={60} height={60} />
        </div>
      );

    if (getProject.isError)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-62px)]">
          <ErrorMessage
            message={
              "An error occured while fetching this project. Please try again."
            }
            refetch={getProject.refetch}
          />
        </div>
      );

    return (
      <div>
        {isWorkflow ? (
          children
        ) : (
          <>
            <div className="py-4 max-w-page mx-auto">
              <p className="text-2xl font-medium h-12 flex items-center">
                Projects Name
              </p>
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
          </>
        )}
      </div>
    );
  };

  return render();
};

export default Project;
