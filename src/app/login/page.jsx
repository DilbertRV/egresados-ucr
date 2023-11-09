import { UserAuthForm } from "@/app/components/user-auth-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Autenticación",
  description:
    "Página de autenticación para el sistema de gestión de egresados de la UCR",
};

export default async function AuthenticationPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
      <main className="container flex min-h-screen flex-col items-center justify-center">
        <section className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[500px] shadow-[rgba(7,_65,_210,_0.1)_0px_4px_10px] rounded-md p-14">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Egresados UCR
              </h1>
              <p className="text-sm text-muted-foreground">
                Inicie sesión con su correo institucional de la UCR
              </p>
            </div>
            <UserAuthForm />
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Olvidaste tu contraseña?
              </p>
              <Link
                href="/reset-password"
                className="text-sm text-primary text-blue-600 hover:text-primary-dark hover:underline"
              >
                Recuperar contraseña
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
