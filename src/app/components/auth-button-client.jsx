"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function AuthButton({ session }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {session ? (
        <button className="
          text-red-500 
        " onClick={handleSignOut}>Cerrar sesión</button>
      ) : (
        <button>Iniciar sesión</button>
      )}
    </>
  );
}
