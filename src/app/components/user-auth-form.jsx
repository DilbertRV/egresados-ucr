"use client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import useAuthStore from "@/store/userStore";
import { getUser } from "@/utils/user-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "zod";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();
  const setUser = useAuthStore((state) => state.setUser);

  const UserAuthFormSchema = object({
    username: string().min(1, "El nombre de usuario es requerido"),
    password: string().min(1, "La contraseña es requerida"),
  });

  const form = useForm({
    resolver: zodResolver(UserAuthFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const getUserData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = await getUser(supabase, session);
    setUser(user);
  };

  async function onSubmit() {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.getValues("username"),
        password: form.getValues("password"),
      });

      if (error) {
        toast({
          variant: "warning",
          title: "⚠️ Por favor, intente de nuevo.",
          description:
            "Verifique que el nombre de usuario y la contraseña sean correctos.",
        });
      } else {
        getUserData();
        toast({
          variant: "success",
          title: "Inicio de sesión exitoso.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hubo un error inesperado.",
      });
      router.refresh();
    } finally {
      setIsLoading(false);
    }
    router.refresh();
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nombre de usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
