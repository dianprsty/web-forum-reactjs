import Navbar from "@/components/Navbar";
import { getUserProfile } from "@/redux/actions/user";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AppLayout({ children }) {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfile());
    }
  }, []);

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
