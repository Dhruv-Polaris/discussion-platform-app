"use client";
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions/search";
import { Search } from "lucide-react";

const SearchInput = () => {
  const searchParams = useSearchParams();

  return (
    <form action={search} className="relative group/search">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within/search:text-white" />
      <Input
        defaultValue={searchParams.get("term") || ""}
        type="text"
        name="term"
        placeholder="Search posts..."
        className="pl-10 w-full bg-white/10 border-transparent text-white placeholder:text-gray-400 transition-all duration-300 focus-visible:bg-white/20 focus-visible:border-white/20 focus-visible:ring-offset-0 focus-visible:ring-0"
      />
    </form>
  );
};

export default SearchInput;
