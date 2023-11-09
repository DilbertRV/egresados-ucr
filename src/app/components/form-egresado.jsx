import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useToast } from "@/app/components/ui/use-toast";
import egresadoStore from "@/store/egresadoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { number, object, string } from "zod";
import { DropdownMenuCheckboxes } from "./DropdownMenuCheckboxes";

export function FormEgresado() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const store = egresadoStore();

  console.log(store.hasInfo);

  const EgresadoSchema = object({
    cedula: string().min(1, "La cédula es requerida"),
    nombre: string().min(1, "El nombre es requerido"),
    apellido: string().min(1, "El apellido es requerido"),
    carnet: string().min(1, "El carnet es requerido"),
    ano_egreso: number().min(1, "El año de egreso es requerido"),
    tiempo_conseguir_trabajo: string().nullable(),
    nombre_empresa: string().nullable(),
    habilidades_adquiridas: string().nullable(),
    habilidades_necesarias: string().nullable(),
    comentarios: string().nullable(),
    direccion: string().nullable(),
  });

  const form = useForm({
    resolver: zodResolver(EgresadoSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      apellido: "",
      carnet: "",
      ano_egreso: "",
      tiempo_conseguir_trabajo: "",
      nombre_empresa: "",
      habilidades_adquiridas: "",
      habilidades_necesarias: "",
      comentarios: "",
      direccion: "",
    },
  });

  const formValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    //If at least one field is filled, then store.hasInfo = true, use formValues to check
    const isFilled = Object.values(formValues).some(
      (value) => value !== "" || value !== null || value !== "undefined"
    );
    isFilled ? store.setHasInfo(isFilled) : store.setHasInfo(isFilled);

    console.log(formValues);
  }, [formValues]);

  async function onSubmit() {
    setIsLoading(true);
    try {
      console.log(form.getValues("cedula"));
      console.log(form.getValues("nombre"));
      console.log(form.getValues("apellido"));
      console.log(form.getValues("carnet"));
      console.log(form.getValues("ano_egreso"));
      console.log(form.getValues("tiempo_conseguir_trabajo"));
      console.log(form.getValues("nombre_empresa"));
      console.log(form.getValues("habilidades_adquiridas"));
      console.log(form.getValues("habilidades_necesarias"));
      console.log(form.getValues("comentarios"));
      console.log(form.getValues("direccion"));

      // const { error } = await supabase.auth.signInWithPassword({
      //   email: form.getValues("username"),
      //   password: form.getValues("password"),
      // });

      // if (error) {
      //   toast({
      //     variant: "warning",
      //     title: "Por favor, intente de nuevo.",
      //     description:
      //       "Verifique que el nombre de usuario y la contraseña sean correctos.",
      //   });
      // } else {
      //   // getUserData();
      //   toast({
      //     variant: "success",
      //     title: "Inicio de sesión exitoso.",
      //   });
      // }
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   title: "Hubo un error inesperado.",
      // });
      // router.refresh();
    } finally {
      setIsLoading(false);
    }
    // router.refresh();
  }

  return (
    <Form {...form}>
      <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-md font-bold tracking-tight">Datos personales</h2>
        <FormField
          control={form.control}
          name="cedula"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Cédula" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2 justify-between">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Dirección" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="text-md font-bold tracking-tight">
          Datos de estudiante
        </h2>
        <div className="flex space-x-2 justify-between">
          <FormField
            control={form.control}
            name="carnet"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Carnet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ano_egreso"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Año de egreso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="habilidades_adquiridas"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Habilidades adquiridas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="habilidades_adquiridas"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DropdownMenuCheckboxes />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="text-md font-bold tracking-tight">Datos laborales</h2>
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <Checkbox id="trabaja" />
                <label
                  htmlFor="trabaja"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ¿Trabaja o ha trabajado en algún área de su carrera?
                </label>
              </div>
            </FormItem>
          )}
        />
        <div className="flex space-x-2 justify-between">
          <FormField
            control={form.control}
            name="tiempo_conseguir_trabajo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Tiempo en conseguir trabajo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre_empresa"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nombre de la empresa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="habilidades_necesarias"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Habilidades necesarias"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comentarios"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="max-h-32 h-auto"
                  placeholder="Comentarios"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2 justify-end">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </Form>
  );
}
