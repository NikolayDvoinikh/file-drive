"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc } from "../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";

export const columns: ColumnDef<Doc<"files">>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "Uploaded on",
    cell: ({ row }) => {
      return (
        <div>
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </div>
      );
    },
  },
];
