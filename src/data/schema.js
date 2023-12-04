import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const taskSchema = z.object({
//   id: z.number(),
//   titulo: z.string(),
//   nombre: z.string(),
//   egreso: z.number(),
//   empresa: z.string(),
// });

/*create a new schema with this data  id_egresado: 4,
    created_at: '2023-10-31T17:25:01.042409+00:00',
    cedula: 118889977,
    nombre: 'Dilan',
    apellido: 'Castro',
    carnet: 'B89988',
    ano_egreso: 2022,
    tiempo_conseguir_trabajo: '6 meses',
    nombre_empresa: 'Babel',
    habilidades_adquiridas: 'Liderazgo',
    habilidades_necesarias: 'Trabajo en equipo',
    comentarios: 'Buen egresado',
    direccion: 'Av. 26',

    */

export const graduateSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  cedula: z.string().nullable(),
  nombre: z.string().nullable(),
  apellido: z.string().nullable(),
  carnet: z.string().nullable(),
  ano_egreso: z.number().nullable(),
  tiempo_conseguir_trabajo: z.string().nullable(),
  nombre_empresa: z.string().nullable(),
  habilidades_adquiridas: z.string().nullable(),
  habilidades_necesarias: z.string().nullable(),
  comentarios: z.string().nullable(),
  direccion: z.string().nullable(),
  id_titulo: z.number().nullable(),
});
