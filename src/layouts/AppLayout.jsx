import Navbar from "@/components/Navbar";
import PropTypes from "prop-types";
import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="p-4 lg:p-8 mb-12 lg:mb-0">{children}</main>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
};
