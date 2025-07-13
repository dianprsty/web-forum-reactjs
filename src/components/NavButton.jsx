import cn from "@/utlis/classname";
import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation } from "react-router";

export default function NavButton({ Icon, path, className }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={path}
      className={cn("py-2 px-3 rounded-lg cursor-pointer", className)}
    >
      <Icon
        className={cn(
          "w-6 h-6 font-bold",
          pathname === path ? "text-zinc-900" : "text-gray-400"
        )}
      />
    </Link>
  );
}

NavButton.propTypes = {
  Icon: PropTypes.node.isRequired,
  path: PropTypes.string,
  className: PropTypes.string,
};
