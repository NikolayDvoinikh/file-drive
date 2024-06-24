"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import UploadButton from "@/components/upload-button";
import FileCard from "@/components/file-card";
import { Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import BgPlaceholder from "@/components/BgPlaceholder";

export default function FileBrowser({
  title,
  favoritesOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly } : "skip"
  );
  const isLoading = files === undefined;

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row items-center justify-between mb-12">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>
          {files?.length === 0 && <BgPlaceholder />}
          <div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-4">
            {files?.map((file) => (
              <FileCard
                favorites={favorites ?? []}
                key={file._id}
                file={file}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
