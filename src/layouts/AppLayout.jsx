import Navbar from "@/components/Navbar";
import {
  ChartColumnBig,
  ChartColumnBigIcon,
  House,
  HouseIcon,
  PlusIcon,
  SearchIcon,
  User2Icon,
} from "lucide-react";
import PropTypes from "prop-types";
import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="relative min-h-dvh">
      <Navbar />
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node,
};
