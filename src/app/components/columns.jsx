"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/app/components/ui/badge"
import { Checkbox } from "@/app/components/ui/checkbox"

import { titles, egresos, empresas } from "../../data/data"
import { taskSchema } from "../../data/schema"
import { DataTableColumnHeader } from "@/app/components/data-table-column-header"
import { DataTableRowActions } from "@/app/components/data-table-row-actions"

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
    accessorKey: "titulo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titulo" />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.getValue("titulo")}</Badge>,
    enableHiding: false,
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
      )
    },
  },
  {
    accessorKey: "empresa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ubic. Empresa" />
    ),
    cell: ({ row }) => {
      const empresa = empresas.find(
        (label) => label.value === row.getValue("empresa")
      )

      if (!empresa) {
        return null
      }

      return (
        <div className="flex w-[125px] items-center"> 
          <span>{empresa.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "egreso",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Egreso" />
    ),
    cell: ({ row }) => {
      return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("egreso")}
          </span>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
