import { ChartBarIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon as ChartBarIconSolid, HomeIcon as HomeIconSolid, MagnifyingGlassIcon as MagnifyingGlassIconSolid, PlusIcon as PlusIconSolid, UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import React from "react";
import NavButton from "./NavButton";

export default function Navbar() {
  return (
    <nav className="fixed bg-white lg:h-dvh w-full lg:w-fit lg:top-0 left-0 bottom-0 flex lg:flex-col items-center  justify-center gap-10 p-4 z-50 shadow-lg lg:shadow-none">
      <NavButton id="home" Icon={HomeIcon} IconSolid={HomeIconSolid} path="/" />
      <NavButton id="explore" Icon={MagnifyingGlassIcon} IconSolid={MagnifyingGlassIconSolid} path="/explore" />
      <NavButton
        id="create"
        Icon={PlusIcon}
        IconSolid={PlusIconSolid}
        path="/post/create"
        className="bg-gray-100"
      />
      <NavButton id="leaderboard" Icon={ChartBarIcon} IconSolid={ChartBarIconSolid} path="/leaderboard" />
      <NavButton id="profile" Icon={UserIcon} IconSolid={UserIconSolid} path="/profile" />
    </nav>
  );
}
