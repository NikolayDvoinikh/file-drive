"use client";

import FileBrowser from "@/components/file-browser";

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title="Favorites" favorites={true} />
    </div>
  );
};

export default FavoritesPage;
