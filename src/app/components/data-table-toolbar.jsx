"use client"

import { X } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { DataTableViewOptions } from "@/app/components/data-table-view-options"

import { empresas, egresos } from "../../data/data"
import { DataTableFacetedFilter } from "@/app/components/data-table-faceted-filter"



export function DataTableToolbar({
  table,
}) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn("nombre")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("empresa") && (
          <DataTableFacetedFilter
            column={table.getColumn("empresa")}
            title="Ubic. Empresa"
            options={empresas}
          />
        )}
        {table.getColumn("egreso") && (
          <DataTableFacetedFilter
            column={table.getColumn("egreso")}
            title="Egreso"
            options={egresos}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpiar filtros
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
