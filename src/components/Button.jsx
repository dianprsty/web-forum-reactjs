import cn from "@/utlis/classname";
import PropTypes from "prop-types";
import React from "react";

export default function Button({
  children,
  type = "button",
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};
