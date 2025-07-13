import {
  ChartColumnBigIcon,
  HouseIcon,
  PlusIcon,
  SearchIcon,
  User2Icon,
} from "lucide-react";
import React from "react";
import NavButton from "./NavButton";

export default function Navbar() {
  return (
    <div className="absolute lg:h-full w-full lg:w-fit lg:top-0 left-0 bottom-0 flex lg:flex-col items-center  justify-center gap-10 p-4 z-50 shadow-lg lg:shadow-none">
      <NavButton Icon={HouseIcon}  path="/" />
      <NavButton Icon={SearchIcon} path="/explore" />
      <NavButton
        Icon={PlusIcon}
        path="/post/create"
        className="bg-gray-100
"
      />
      <NavButton Icon={ChartColumnBigIcon} path="/leaderboard" />
      <NavButton Icon={User2Icon} path="/profile" />
    </div>
  );
}
