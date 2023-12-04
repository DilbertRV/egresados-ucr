import { graduateSchema } from "@/data/schema";
import { z } from "zod";

export async function getGraduate(supabase) {
  const { data: graduate, error } = await supabase.from("egresado").select("*");

  if (error) {
    throw new Error("Error al obtener los datos del egresado");
  }

  return z.array(graduateSchema).parse(graduate);
}
