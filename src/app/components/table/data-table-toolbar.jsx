"use client";

import { X } from "lucide-react";

import { DataTableViewOptions } from "@/app/components/table/data-table-view-options";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { DataTableFacetedFilter } from "@/app/components/table/data-table-faceted-filter";
import { titles } from "@/data/data";

export function DataTableToolbar({ graduates, table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const getOptions = (columnName) => {
    return graduates
      .map((row) => row[columnName])
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((value) => ({
        label: value,
        value,
      }));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={table.getColumn("nombre")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("id_titulo") && (
          <DataTableFacetedFilter
            column={table.getColumn("id_titulo")}
            title="Titulo"
            options={getOptions("id_titulo").map((option) => ({
              ...option,
              label: titles.find((title) => title.value === option.value)
                ?.label,
            }))}
          />
        )}
        {table.getColumn("nombre_empresa") && (
          <DataTableFacetedFilter
            column={table.getColumn("nombre_empresa")}
            title="Empresa"
            options={getOptions("nombre_empresa")}
          />
        )}
        {table.getColumn("ano_egreso") && (
          <DataTableFacetedFilter
            column={table.getColumn("ano_egreso")}
            title="Egreso"
            options={getOptions("ano_egreso")}
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
  );
}
