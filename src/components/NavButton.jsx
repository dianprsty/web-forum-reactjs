import cn from "@/utlis/classname";
import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavButton({ Icon, path, className, IconSolid }) {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <Link
      to={path}
      className={cn("py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-200", className)}
    >
      {isActive && IconSolid ? (
        <IconSolid
          className={cn(
            "w-6 h-6 font-bold",
            isActive ? "text-zinc-900" : "text-gray-400"
          )}
        />
      ) : (
        <Icon
          className={cn(
            "w-6 h-6 font-bold",
            isActive ? "text-zinc-900" : "text-gray-400"
          )}
        />
      )}
    </Link>
  );
}

NavButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  IconSolid: PropTypes.elementType,
  path: PropTypes.string,
  className: PropTypes.string,
};

NavButton.defaultProps = {
  IconSolid: null,
};
