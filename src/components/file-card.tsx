import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import FileCardActions from "./file-card-actions";

const FileCard = ({ file }: { file: Doc<"files"> }) => {
  return (
    <Card>
      <CardHeader className="relative">
        <div className="absolute top-2 right-2">
          <FileCardActions file={file} />
        </div>
        <CardTitle>{file.name}</CardTitle>
        <CardDescription>{file._creationTime}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
