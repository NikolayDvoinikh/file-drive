"use client";

import FileBrowser from "@/components/file-browser";

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
};

export default FavoritesPage;
