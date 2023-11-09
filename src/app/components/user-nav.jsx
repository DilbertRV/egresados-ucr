"use client";

import { AuthButton } from "@/app/components/auth-button-client";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Separator } from "@/app/components/ui/separator";
import useAuthStore from "@/store/userStore";
import {
  convertNameAndLastNameToInitials,
  convertNameAndLastNameWordToUppercase,
} from "@/utils/navbar-convertions";
import Image from "next/image";
import { useEffect } from "react";
import { MenubarSeparator } from "./ui/menubar";
import { Skeleton } from "./ui/skeleton";

export function UserNav({ session }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-[175px]" />
        <Skeleton className="h-9 w-[1px]" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Button variant="outline" className="relative flex gap-x-2 ">
        Monitoreo del sistema
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3  bg-[#6dc067]"></span>
        </span>
      </Button>
      <Separator
        decorative
        orientation="vertical"
        className="h-8 border-l border-muted-foreground/40"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {convertNameAndLastNameToInitials(user?.nombre, user?.apellido)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/girasol-logo.png"
                alt=""
                width={30}
                height={30}
              />
              <div className="flex flex-col space-y-1">
                <p className="first-letter:uppercase text-sm font-medium leading-none">
                  {convertNameAndLastNameWordToUppercase(
                    user?.nombre,
                    user?.apellido
                  )}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:text-primary">
              Perfil
            </DropdownMenuItem>
            <MenubarSeparator />
            <DropdownMenuItem>
              <AuthButton session={session} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
