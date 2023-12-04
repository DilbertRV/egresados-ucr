"use client";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center">
      <section className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[500px] shadow-[rgba(7,_65,_210,_0.1)_0px_4px_10px] rounded-md p-14">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Error 404</h1>
            <p className="text-sm text-muted-foreground">
              No se ha encontrado el recurso solicitado.
            </p>
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <Button
              variant="link"
              onClick={() => router.push("/")}
              className="text-sm text-primary text-blue-600 hover:text-primary-dark hover:underline"
            >
              Ir al sitio principal
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
