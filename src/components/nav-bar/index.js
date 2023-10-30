import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../../utils/functions";

const pages = [{ link: "/projects", name: "Projects" }];

const NavBar = () => {
  return (
    <div className="flex bg-darkblue px-8 gap-4 text-white pt-1">
      {pages.map((page) => (
        <Link to={page.link} className={cls("py-4 font-medium border-b-2")} key={page.link}>
          {page.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
