"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/app/components/ui/menubar";
import useAuthStore from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function MainNav() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  const user = useAuthStore((state) => state.user);

  console.log(user);

  return (
    <nav
      className={"mx-10 flex items-center space-x-4 px-2 lg:px-4 lg:space-x-6"}
    >
      <Image
        src="/images/firma-horizontal-una-linea-reverso.png"
        alt=""
        width={300}
        height={40}
      />
      <Link
        href="/"
        className="text-sm font-medium transition-colors text-primary-foreground"
      >
        Inicio
      </Link>

      <Menubar className="rounded-none border-b border-none text-primary-foreground">
        {user?.rol == 1 ? (
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-background hover:text-secondary-foreground">
              Cuentas
            </MenubarTrigger>
            <MenubarContent forceMount>
              <MenubarItem inset>
                <Link
                  href="/admin/accounts"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Administrar cuentas
                </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                <Link
                  href="/admin/add-account"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Añadir cuenta
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : null}
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-background hover:text-secondary-foreground">
            Gestionar carrera
          </MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarItem inset>
              <Link
                href="/admin/accounts"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Informática empresarial
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>
              <Link
                href="/admin/add-account"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dirección de empresas
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}
