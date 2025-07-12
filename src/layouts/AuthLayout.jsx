import PropTypes from "prop-types";
import React from "react";

export default function AuthLayout({ children, imageSrc, imageAlt = "" }) {
  return (
    <main className="flex w-full min-h-screen">
      <section className="w-6/12 hidden lg:flex justify-center items-center">
        <img src={imageSrc} alt={imageAlt} />
      </section>
      <section className="w-full lg:w-6/12 flex justify-center items-center bg-blue-900">
        {children}
      </section>
    </main>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
