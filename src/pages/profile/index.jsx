import AppLayout from "@/layouts/AppLayout";
import { getUserProfile, getUserThreads } from "@/redux/actions/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutConfirmModal from "@/components/LogoutConfirmModal";
import { logoutAction } from "@/redux/actions/auth";
import { useNavigate } from "react-router-dom";
import ThreadCard from "@/components/ThreadCard";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { profile, threads, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/auth/login");
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      dispatch(getUserThreads(profile.id));
    }
  }, [dispatch, profile]);

  return (
    <AppLayout>
      <div className="flex flex-col max-w-xl mx-auto sm:border sm:border-gray-300 lg:shadow rounded-2xl">
        {!profile ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading profile data...</p>
          </div>
        ) : (
          <>
            <div className="p-4 flex flex-row justify-between items-center border-b border-gray-300">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-gray-600 mb-4">{profile.email}</p>
                
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 px-2 py-1 border border-gray-400 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </div>
              
              <div>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full"
                />
              </div>
            </div>
            
            <LogoutConfirmModal 
              isOpen={showLogoutModal}
              onClose={() => setShowLogoutModal(false)}
              onConfirm={handleLogout}
            />

            <div>
              <h2 className="text-xl font-bold p-4 border-b border-gray-300">
                My Threads
              </h2>
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Loading your threads...
                </div>
              ) : threads.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  You haven&lsquo;t created any threads yet.
                </div>
              ) : (
                threads.map((thread) => (
                  <div key={thread.id} className="border-b border-gray-300">
                    <ThreadCard thread={thread} />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}