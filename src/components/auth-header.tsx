"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import React from "react";
import { useSession } from "next-auth/react";

const AuthHeader = () => {
  const session = useSession();

  if(session.status === "loading") return null;

  let authContent: React.ReactNode;
  if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer border-2 border-white/20 hover:border-white transition-all">
            <AvatarImage src={session.data.user.image || ""} alt={session.data.user.name || "User"} />
            <AvatarFallback className="bg-white/10 text-white font-semibold">
              {session.data.user.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-56 p-2">
          <div className="px-2 py-1.5 mb-1">
            <p className="text-sm font-semibold">{session.data.user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{session.data.user.email}</p>
          </div>
          <Separator className="mb-1" />
          <form action={signOut}>
            <Button variant="ghost" type="submit" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <div className="flex items-center gap-2">
        <form action={signIn}>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">Sign in</Button>
        </form>
        <form action={signIn}>
          <Button size="sm" className="bg-white text-black hover:bg-gray-200 border-none">Sign up</Button>
        </form>
      </div>
    );
  }
  return authContent;
};

export default AuthHeader;
