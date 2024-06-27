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
    <nav className="hidden w-24 sm:w-40 min-h-[calc(100vh-226px)] sm:flex flex-col gap-4">
      {routes.map((route) => (
        <Link href={route.path} key={route.name}>
          <Button
            variant={"link"}
            className={clsx("flex gap-2 px-0", {
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
