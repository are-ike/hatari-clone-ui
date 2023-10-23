import React from "react";
import Project from "../project";
import { Link, useLocation, useParams, Redirect } from "react-router-dom";

const Events = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  if (
    !pathname.includes("events") &&
    !pathname.includes("workflow") &&
    !pathname.includes("configuration")
  )
    return <Redirect to={`${pathname}/events`} />;

  return <Project id={id}>events</Project>;
};

export default Events;
