"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export function DropdownMenuCheckboxes({ carreers }) {
  const [selectedValues, setSelectedValues] = useState(new Set());

  //fill carreers
  const careers = [
    "Informática Empresarial",
    "Dirección de Empresas",
    "Ingeniería Industrial",
    "Ingeniería Mecánica",
  ];

  const handleCheckboxChange = (value) => {
    const updatedValues = new Set(selectedValues);

    if (updatedValues.has(value)) {
      updatedValues.delete(value);
    } else {
      updatedValues.add(value);
    }

    setSelectedValues(updatedValues);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Egresado de
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValues).map((selectedCareer) => (
                    <Badge
                      variant="secondary"
                      key={selectedCareer}
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedCareer}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {careers.map((career) => (
          <DropdownMenuCheckboxItem
            key={career}
            checked={selectedValues.has(career)}
            onCheckedChange={() => handleCheckboxChange(career)}
          >
            {career}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
