import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { useToast } from "@/app/components/ui/use-toast";
import { carreras } from "@/data/data";
import { ubicacion } from "@/data/location";
import { skills, softSkills } from "@/data/skills";
import egresadoStore from "@/store/egresadoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListTodo } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { string, z } from "zod";
import { ToastAction } from "./ui/toast";

const egresadoSchema = z.object({
  cedula: z
    .string({
      required_error: "La cédula es requerida",
    })
    .min(1, { message: "La cédula es requerida" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "La cédula debe contener solo números",
    })
    .refine((value) => value.length === 9, {
      message: "La cédula debe tener 9 dígitos. Incluya los 0.",
    })
    .refine((value) => value[0] !== "0", {
      message: "La cédula no puede comenzar con cero",
    }),
  nombre: string().nullish(),
  apellido: string().nullish(),
  direccion: string().nullish(),
  carnet: string().nullish(),
  ano_egreso: z.coerce.number().nullish(),
  tiempo_conseguir_trabajo: z
    .enum(["1 - 3 Meses", "4 - 8 Meses", "9 o Más"])
    .nullish(),
  relacion_carrera: z.enum(["Sí", "No"]).nullish(),
  nombre_empresa: string().nullish(),
  puesto_ejercido: string().nullish(),
  habilidades_blandas: z.array(z.string()).nullish(),
  habilidades_tecnicas: z.array(z.string()).nullish(),
  habilidades_faltantes: string().nullish(),
  capacitarse_puesto: string().nullish(),
  comentarios: string().nullish(),
  provincia: z.coerce.number().nullish(),
  canton: z.coerce.number().nullish(),
  telefono: z.coerce.number(),
  correo: string().nullish(),
  grado_academico: string().nullish(),
  carrera: z.set(z.number()).nullish(),
});

export function FormEgresado() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState(new Set());
  const [trabajaActualmente, setTrabajaActualmente] = useState(false);
  const [tab, setTab] = useState("personal");
  const { toast } = useToast();
  const store = egresadoStore();

  const form = useForm({
    resolver: zodResolver(egresadoSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      apellido: "",
      direccion: "",
      carnet: "",
      ano_egreso: "",
      tiempo_conseguir_trabajo: null,
      nombre_empresa: "",
      puesto_ejercido: "",
      relacion_carrera: null,
      habilidades_blandas: [],
      habilidades_tecnicas: [],
      habilidades_faltantes: "",
      capacitarse_puesto: "",
      comentarios: "",
      provincia: "",
      canton: "",
      telefono: "",
      correo: "",
      grado_academico: "",
      carrera: null,
    },
  });
  const handleCheckboxChange = (value, field) => {
    const updatedValues = new Set(selectedValues);

    if (updatedValues.has(value)) {
      updatedValues.delete(value);
    } else {
      updatedValues.add(value);
    }

    if (updatedValues.size === 0) {
      field.onChange(null);
      setSelectedValues(new Set());
    } else {
      field.onChange(updatedValues);
      setSelectedValues(updatedValues);
    }
    //Obtener los valores actuales del campo habilidades_tecnicas
    const actualValues = form.getValues("habilidades_tecnicas");

    //Obtener los valores de habilidades_tecnicas de las carreras seleccionadas
    const updatedTechSkillsArray = skills
      .filter((skill) => updatedValues.has(skill.id))
      .flatMap((selectedSkill) =>
        selectedSkill.habilidades.map((habilidad) => habilidad.id)
      );

    //Actualizar el campo habilidades_tecnicas con los valores de las carreras seleccionadas que tengan un checkbox marcado
    form.setValue(
      "habilidades_tecnicas",
      updatedTechSkillsArray.length > 0
        ? actualValues?.filter((value) =>
            updatedTechSkillsArray.includes(value)
          )
        : null
    );
  };

  const handleCheckboxChangeLabor = () => {
    const newTrabajaActualmente = !trabajaActualmente;

    if (!newTrabajaActualmente) {
      const valuesWithInfo = form
        .getValues([
          "tiempo_conseguir_trabajo",
          "nombre_empresa",
          "puesto_ejercido",
          "relacion_carrera",
          "habilidades_blandas",
          "habilidades_tecnicas",
          "habilidades_faltantes",
          "capacitarse_puesto",
          "comentarios",
        ])
        .some((value) => value != null && value != 0 && value !== "");

      if (valuesWithInfo) {
        toast({
          variant: "destructive",
          title: "Se eliminarán los datos ingresados en esta sección.",
          description:
            "Si desea conservar los datos, por favor deje marcada la casilla.",
          action: (
            <ToastAction
              onClick={() => {
                setTrabajaActualmente(newTrabajaActualmente);
                form.resetField("tiempo_conseguir_trabajo");
                form.resetField("nombre_empresa");
                form.resetField("puesto_ejercido");
                form.resetField("relacion_carrera");
                form.resetField("habilidades_blandas");
                form.resetField("habilidades_tecnicas");
                form.resetField("habilidades_faltantes");
                form.resetField("capacitarse_puesto");
                form.resetField("comentarios");
              }}
              className="hover:bg-secondary/30"
              altText="Desmarcar"
            >
              Desmarcar
            </ToastAction>
          ),
        });
      } else {
        setTrabajaActualmente(newTrabajaActualmente);
      }
    } else {
      setTrabajaActualmente(newTrabajaActualmente);
    }
  };

  const handleClickSubmit = async () => {
    // Verifica si se han realizado cambios en el formulario
    if (!form.formState.isDirty) {
      toast({
        variant: "destructive",
        title: "No se han realizado cambios en el formulario.",
        description:
          "Revisa los campos con posibles errores y vuelve a intentarlo.",
      });
      return;
    }

    const result = egresadoSchema.safeParse(form.formState.values);

    // console.log(
    //   Object.keys(form.formState.errors)
    //     .map((key) => {
    //       return form.formState.errors[key].message;
    //     })
    //     .join(", ")
    // );

    // Verifica si hay errores de validación
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Hubo un error en el formulario.",
        description: `Por favor, revisa los siguientes campos: ${Object.keys(
          form.formState.errors
        ).join(", ")}`,
      });
    } else {
      // Si no hay errores, continúa con el envío
      await onSubmit();
    }
  };

  const formValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    const hasData = Object.entries(formValues).some(
      ([key, value]) =>
        value != null &&
        value != 0 &&
        value !== "" &&
        value !== "undefined" &&
        !(
          (key === "provincia" || key === "canton") &&
          value.startsWith("Seleccione")
        )
    );

    //log de los datos sin enviar
    store.setHasInfo(hasData);
  }, [formValues]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // ... (código de envío)
    } catch (error) {
      console.log(error);
      // Muestra el toast de error en el envío
      toast({
        variant: "destructive",
        title: "Hubo un error inesperado.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value) => {
    setTab(value);
  };

  return (
    <div className="flex gap-6">
      <Tabs
        value={tab}
        onValueChange={handleTabChange}
        defaultValue="personal"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="personal">Datos personales</TabsTrigger>
          <TabsTrigger value="academic">Datos de académicos</TabsTrigger>
          <TabsTrigger value="employment">Datos laborales</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="w-full h-[500px]">
              <TabsContent value="personal" className="space-y-4 p-3">
                <h2 className="text-md font-bold tracking-tight">
                  Datos personales
                </h2>
                <FormField
                  control={form.control}
                  name="cedula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cédula</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
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
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
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
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-2 justify-between">
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>

                        <Input type="number" {...field} />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="correo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-2 justify-between">
                  <FormField
                    control={form.control}
                    name="provincia"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Provincia</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una provincia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ubicacion.map((provincia) => (
                              <SelectItem
                                key={provincia.id}
                                value={provincia.id.toString()}
                              >
                                {provincia.provincia}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="canton"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Cantón</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un cantón" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ubicacion
                              .find(
                                (provincia) =>
                                  provincia.id.toString() ===
                                  form.getValues("provincia")
                              )
                              ?.cantones.map((canton, index) => (
                                <SelectItem
                                  key={index}
                                  value={index.toString()}
                                >
                                  {canton}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => handleTabChange("academic")}
                  >
                    Siguiente
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="academic" className="space-y-4 p-3">
                <h2 className="text-md font-bold tracking-tight">
                  Datos de académicos
                </h2>
                <FormField
                  control={form.control}
                  name="carrera"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => field.onChange(selectedValues)}
                            >
                              Egresado de
                              {selectedValues?.size > 0 && (
                                <>
                                  <Separator
                                    orientation="vertical"
                                    className="mx-2 h-4"
                                  />
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
                                        {selectedValues.size} seleccionados
                                      </Badge>
                                    ) : (
                                      carreras
                                        .filter((carrera) =>
                                          Array.from(selectedValues).includes(
                                            carrera.id
                                          )
                                        )
                                        .map((carrera) => (
                                          <Badge
                                            variant="secondary"
                                            key={carrera.id}
                                            className="rounded-sm px-1 font-normal"
                                          >
                                            {carrera.nombre}
                                          </Badge>
                                        ))
                                    )}
                                  </div>
                                </>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            {Object.entries(carreras).map(([key, value]) => (
                              <DropdownMenuCheckboxItem
                                key={key}
                                checked={selectedValues.has(value.id)}
                                onCheckedChange={() => {
                                  handleCheckboxChange(value.id, field);
                                }}
                              >
                                {value.nombre}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grado académico */}
                <FormField
                  control={form.control}
                  name="grado_academico"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Grado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un grado académico" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Bachillerado</SelectItem>
                          <SelectItem value="2">Licenciatura</SelectItem>
                          <SelectItem value="3">Maestría</SelectItem>
                          <SelectItem value="4">Diplomado</SelectItem>
                          <Separator />
                          <SelectItem value="5">
                            Universidad incompleta
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                      <FormDescription className="pl-1 max-w-sm text-xs">
                        Si el egresado tiene más de un grado académico
                        seleccione el de mayor nivel.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="flex space-x-2 justify-between">
                  <FormField
                    control={form.control}
                    name="carnet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carnet</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
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
                        <FormLabel>Año de egreso</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className="flex justify-end space-x-2
                "
                >
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleTabChange("personal")}
                  >
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleTabChange("employment")}
                  >
                    Siguiente
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="employment" className="space-y-4 p-3">
                <h2 className="text-md font-bold tracking-tight">
                  Datos laborales
                </h2>
                <FormField
                  name="trabaja_actualmente"
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={trabajaActualmente}
                          onCheckedChange={() => {
                            handleCheckboxChangeLabor();
                          }}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        ¿Trabaja actualmente?
                      </FormLabel>
                    </FormItem>
                  )}
                />
                {/* Si trabaja actualmente, mostrar los siguientes campos */}
                {trabajaActualmente && (
                  <>
                    <FormField
                      control={form.control}
                      name="tiempo_conseguir_trabajo"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Tiempo en conseguir trabajo</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="1 - 3 Meses" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  1 - 3 Meses
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="4 - 8 Meses" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  4 - 8 Meses
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="9 o Más" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  9 o más
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
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
                          <FormLabel>Nombre de la empresa</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="puesto_ejercido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            ¿Qué puesto ejerce en la empresa?
                          </FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relacion_carrera"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            ¿Tiene relación ese puesto con la carrera estudiada
                            en la Universidad de Costa Rica?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Sí" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Sí
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="No" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="habilidades_blandas"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Habilidades blandas</FormLabel>
                            <FormDescription>
                              ¿Qué habilidades blandas adquirió en la
                              Universidad de Costa Rica que le fueron de
                              utilidad en su puesto de trabajo?
                            </FormDescription>
                          </div>
                          {softSkills.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="habilidades_blandas"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.nombre}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="habilidades_tecnicas"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Habilidades técnicas</FormLabel>
                            {selectedValues.size > 0 && (
                              <FormDescription>
                                ¿Qué habilidades técnicas adquirió en la
                                Universidad de Costa Rica que le fueron de
                                utilidad en su puesto de trabajo?
                              </FormDescription>
                            )}
                          </div>
                          {selectedValues.size === 0 ? (
                            <div className="inline-block">
                              <p className="text-sm">
                                No se han seleccionado carreras. Por favor,
                                regresa a la pestaña anterior y selecciona al
                                menos una carrera para mostrar las opciones.{" "}
                                <span className="text-red-500">*</span>
                              </p>
                            </div>
                          ) : (
                            <>
                              {Array.from(selectedValues).map(
                                (selectedValue) => (
                                  <div
                                    key={selectedValue}
                                    className="space-y-2"
                                  >
                                    <h3
                                      className="flex gap-x-2 items-center
                                      text-sm tracking-tight
                                    "
                                    >
                                      <ListTodo
                                        color="gray"
                                        strokeWidth={1.25}
                                      />
                                      {
                                        carreras.find(
                                          (carrera) =>
                                            carrera.id === selectedValue
                                        )?.nombre
                                      }
                                    </h3>
                                    {skills
                                      .find(
                                        (skill) => skill.id === selectedValue
                                      )
                                      ?.habilidades.map((techSkill) => (
                                        <FormField
                                          key={techSkill.id}
                                          control={form.control}
                                          name="habilidades_tecnicas"
                                          render={({ field }) => {
                                            return (
                                              <FormItem
                                                key={techSkill.id}
                                                className="flex flex-row item-start space-x-3 space-y-0"
                                              >
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value?.includes(
                                                      techSkill.id
                                                    )}
                                                    onCheckedChange={(
                                                      checked
                                                    ) => {
                                                      return checked
                                                        ? field.onChange([
                                                            ...field.value,
                                                            techSkill.id,
                                                          ])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                              (value) =>
                                                                value !==
                                                                techSkill.id
                                                            )
                                                          );
                                                    }}
                                                  />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                  {techSkill.nombre}
                                                </FormLabel>
                                              </FormItem>
                                            );
                                          }}
                                        />
                                      ))}
                                  </div>
                                )
                              )}
                            </>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="habilidades_faltantes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            ¿Qué Habilidades considera usted que le faltó
                            aprender en la Universidad con respecto al mercado
                            laboral?
                          </FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capacitarse_puesto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            ¿En qué área le gustaría capacitarse para su puesto?
                          </FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={form.control}
                      name="comentarios"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              className="max-h-32 h-auto"
                              placeholder="Comentarios generales acerca del encuestado"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <div className="flex justify-end items-end space-x-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleTabChange("academic")}
                  >
                    Atrás
                  </Button>
                  <Button onClick={() => handleClickSubmit()}>Guardar</Button>
                </div>
              </TabsContent>
            </ScrollArea>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
