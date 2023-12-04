"use client";

import { Badge } from "@/app/components/ui/badge";
import { Checkbox } from "@/app/components/ui/checkbox";

import { DataTableColumnHeader } from "@/app/components/table/data-table-column-header";
import { DataTableRowActions } from "@/app/components/table/data-table-row-actions";
import { titles } from "@/data/data";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id_titulo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titulo" />
    ),
    cell: ({ row }) => {
      const title = titles.find(
        (label) => label.value === row.original.id_titulo
      );

      return (
        <span>
          {title && (
            <Badge variant="outline" className="">
              {title.label}
            </Badge>
          )}
        </span>
      );
    },
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      // const title = titles.find((label) => label.value === row.original.titulo)

      return (
        <div className="flex space-x-2">
          {/* {title && <Badge variant="outline">{title.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("nombre")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("apellido")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "nombre_empresa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[125px] items-center">
          <span>{row.getValue("nombre_empresa")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "ano_egreso",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Egreso" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("ano_egreso")}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
