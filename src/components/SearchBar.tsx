"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-2 border border-gray-300 rounded"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}
