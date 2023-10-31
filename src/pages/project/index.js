import React, { useEffect, useState } from "react";
import { Link, useLocation, Redirect, useParams } from "react-router-dom";
import { cls } from "../../utils/functions";
import { useQuery } from "react-query";
import projectApis from "../../api/projects";
import loader from "../../assets/loader.svg";
import ErrorMessage from "../../components/error-message";
import Events from "../events";
import Workflow from "../workflow";
import Config from "../config";

const tabIds = {
  events: "events",
  workflow: "workflow",
  config: "config",
};

const tabs = [
  {
    name: "Events",
    tabId: tabIds.events,
  },
  {
    name: "Workflow",
    tabId: tabIds.workflow,
  },
  {
    name: "Configuration",
    tabId: tabIds.config,
  },
];

const components = {
  [tabIds.events]: Events,
  [tabIds.workflow]: Workflow,
  [tabIds.config]: Config,
};

const Project = () => {
  const { pathname } = useLocation();
  const { id, tab } = useParams();
  const [showNotFound, setShowNotFound] = useState(false);

  const getProject = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectApis.getProject(id),
  });

  useEffect(() => {
    if (getProject.isError && getProject.error.message.includes("404"))
      setShowNotFound(true);
  }, [getProject.isError]);

  const renderComponent = () => {
    if (!tabIds.hasOwnProperty(tab))
      return <Redirect to={`/projects/${id}/events`} />;

    const Component = components[tab];

    return <Component project={getProject.data} />;
  };

  const render = () => {
    if (showNotFound) return <Redirect to="/404" />;

    if (getProject.isLoading)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-62px)]">
          <img src={loader} alt="" width={60} height={60} />
        </div>
      );

    if (getProject.isError && !showNotFound)
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
        {tab === tabIds.workflow ? (
          renderComponent()
        ) : (
          <>
            <div className="py-4 max-w-page mx-auto">
              <p className="text-2xl font-medium h-12 flex items-center ">
                {getProject.data?.name}
              </p>
            </div>

            <div className="flex gap-4 max-w-page mx-auto">
              {tabs.map((tab) => (
                <Link
                  key={tab.tabId}
                  to={`/projects/${id}/${tab.tabId}`}
                  className={cls(
                    "py-3 font-medium duration-300 !border-b-2",
                    pathname === `/projects/${id}/${tab.tabId}`
                      ? "text-primary border-primary "
                      : "text-darkgrey border-transparent"
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
            <div className="bg-backg py-8 h-[calc(100vh-192px)] overflow-y-auto">
              <div className="max-w-page mx-auto">{renderComponent()}</div>
            </div>
          </>
        )}
      </div>
    );
  };

  return render();
};

export default Project;
