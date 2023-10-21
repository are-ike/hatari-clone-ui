import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../../utils/functions";

const pages = [
  { link: "/projects", name: "Projects" },
  { link: "/workflows", name: "Workflows" },
];

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex bg-darkblue px-8 gap-4 text-white pt-1">
      {pages.map((page) => (
        <Link
          to={page.link}
          className={cls(
            pathname === page.link && "border-b-2 ",
            "py-4 font-medium"
          )}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
