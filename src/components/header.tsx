import React, { Suspense } from "react";
import AuthHeader from "./auth-header";
import SearchInput from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { MessageSquareQuote } from "lucide-react";
import Link from "next/link";

const HeaderPage = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#24292E] text-white shadow-md">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <MessageSquareQuote className="size-7 text-white transition-transform group-hover:scale-105" />
            <span className="font-bold text-xl hidden sm:inline-block">Discuss</span>
          </Link>
        </div>
        <div className="flex-1 max-w-md mx-auto">
          <Suspense fallback={<div className="h-9 w-full bg-muted animate-pulse rounded-md" />}>
            <SearchInput />
          </Suspense>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <AuthHeader />
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;