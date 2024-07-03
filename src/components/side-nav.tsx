"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "All Files",
    path: "/dashboard/files",
    icon: FileIcon,
  },
  {
    name: "Favorites",
    path: "/dashboard/favorites",
    icon: StarIcon,
  },
  {
    name: "Trash",
    path: "/dashboard/trash",
    icon: Trash2Icon,
  },
];

export default function SideNav() {
  const pathanme = usePathname();

  return (
    <nav className="fixed z-20 flex-wrap bg-white flex top-[69px] min-[420px]:top-[81px] px-3 py-2 left-0 w-full xs:gap-3 sm:p-0 sm:flex-nowrap sm:items-start sm:w-40 sm:static sm:flex-col">
      {routes.map((route) => (
        <Link
          className="even:flex-grow xs:even:flex-grow-0"
          href={route.path}
          key={route.name}
        >
          <Button
            variant={"link"}
            className={clsx("flex gap-2 px-1 sm:px-0 mx-auto", {
              "text-blue-600": pathanme.includes(route.path),
            })}
          >
            <route.icon />
            {route.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
