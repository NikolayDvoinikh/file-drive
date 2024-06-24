import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export default function FileCard({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}) {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    xlsx: <FileSpreadsheetIcon />,
    docs: <BookTypeIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  );

  return (
    <Card>
      <CardHeader className="relative mb-2">
        <CardTitle className="flex gap-2">
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
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => {
            console.log(file);
            window.open(file.url, "_blank");
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
