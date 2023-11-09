"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import { FormEgresado } from "@/app/components/form-egresado";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/components/ui/dropdown-menu";
import { Separator } from "@/app/components/ui/separator";
import { Settings2Icon, UserPlus } from "lucide-react";

export function DataTableViewOptions({ table }) {
  const handleInteractOutSide = () => {
    console.log("interact outside");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <Settings2Icon className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="ml-4 h-8" />
      <Dialog>
        <DialogTrigger className="flex items-center bg-primary rounded-md p-2 text-white text-sm ml-4 gap-2">
          <UserPlus size={18} />
          Agregar Egresado
        </DialogTrigger>
        <DialogContent onInteractOutside={() => handleInteractOutSide()}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Agregar un nuevo egresado
            </DialogTitle>
            <DialogDescription>
              El siguiente formulario te permitirá agregar un nuevo egresado a
              la carrera:{" "}
              <span className="text-primary">{"Dirección de empresas"}</span>
            </DialogDescription>
          </DialogHeader>
          <FormEgresado />
        </DialogContent>
      </Dialog>
    </>
  );
}
