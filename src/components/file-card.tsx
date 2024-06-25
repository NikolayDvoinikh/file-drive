import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRelative } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ReactNode } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import FileCardActions from "./file-card-actions";
import {
  BookTypeIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const typeIcons = {
  image: <ImageIcon />,
  pdf: <FileTextIcon />,
  xlsx: <FileSpreadsheetIcon />,
  docs: <BookTypeIcon />,
} as Record<Doc<"files">["type"], ReactNode>;

export default function FileCard({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}) {
  const userProfile = useQuery(api.users.getUserPofile, {
    userId: file.userId,
  });

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  );

  return (
    <Card>
      <CardHeader className="relative mb-2">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={isFavorited} file={file} />
        </div>
        {/* <CardDescription>{file._creationTime}</CardDescription> */}
      </CardHeader>
      <CardContent className="h-52 flex justify-center items-center">
        {file.type === "image" && (
          <Image alt={file.name} width={200} height={100} src={file.url} />
        )}
        {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
        {file.type === "xlsx" && <FileSpreadsheetIcon className="w-20 h-20" />}
        {file.type === "docs" && <BookTypeIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
