import cn from "@/utlis/classname";
import PropTypes from "prop-types";
import React from "react";

export default function InputWithLabel({
  label,
  className,
  errors,
  register,
  name,
  placeholder,
  id,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-white">
        {label}
      </label>
      <input
        type="text"
        className={cn(
          "border rounded bg-white border-white h-11 p-2 outline-none focus:outline-none",
          className
        )}
        placeholder={placeholder}
        {...register(name)}
        {...props}
      />
      {errors && <p className="text-red-600 text-sm">{errors}</p>}
    </div>
  );
}

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  errors: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
};
