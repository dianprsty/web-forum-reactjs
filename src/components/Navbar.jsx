import { ChartBarIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon as ChartBarIconSolid, HomeIcon as HomeIconSolid, MagnifyingGlassIcon as MagnifyingGlassIconSolid, PlusIcon as PlusIconSolid, UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import React from "react";
import NavButton from "./NavButton";

export default function Navbar() {
  return (
    <div className="fixed bg-white lg:h-dvh w-full lg:w-fit lg:top-0 left-0 bottom-0 flex lg:flex-col items-center  justify-center gap-10 p-4 z-50 shadow-lg lg:shadow-none">
      <NavButton Icon={HomeIcon} IconSolid={HomeIconSolid} path="/" />
      <NavButton Icon={MagnifyingGlassIcon} IconSolid={MagnifyingGlassIconSolid} path="/explore" />
      <NavButton
        Icon={PlusIcon}
        IconSolid={PlusIconSolid}
        path="/post/create"
        className="bg-gray-100"
      />
      <NavButton Icon={ChartBarIcon} IconSolid={ChartBarIconSolid} path="/leaderboard" />
      <NavButton Icon={UserIcon} IconSolid={UserIconSolid} path="/profile" />
    </div>
  );
}
