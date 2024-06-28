import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRelative } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ReactNode } from "react";
import { Doc } from "../../convex/_generated/dataModel";
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
  excel: <FileSpreadsheetIcon />,
  msword: <BookTypeIcon />,
} as Record<Doc<"files">["type"], ReactNode>;

export default function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean };
}) {
  const userProfile = useQuery(api.users.getUserPofile, {
    userId: file.userId,
  });

  return (
    <Card className="mx-auto flex flex-col justify-between max-w-[300px]">
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex max-h-96 justify-center items-center">
        {file.type === "image" && (
          <Image
            alt={file.name}
            width={200}
            height={200}
            className="max-h-full w-auto"
            src={file.url}
          />
        )}
        {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
        {file.type === "excel" && <FileSpreadsheetIcon className="w-20 h-20" />}
        {file.type === "msword" && <BookTypeIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-end">
        <div className="text-end flex gap-2 text-[10px] md:text-sm text-gray-700 max-w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-end text-[10px] md:text-sm text-gray-700 capitalize">
          {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
