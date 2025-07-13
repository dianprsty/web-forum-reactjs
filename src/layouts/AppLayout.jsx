import Navbar from "@/components/Navbar";
import PropTypes from "prop-types";
import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="relative min-h-dvh">
      <Navbar />
      <main className="p-4 lg:p-8">{children}</main>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
};
