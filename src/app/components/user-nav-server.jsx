import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserNav } from "@/app/components/user-nav";

export async function UserNavServer() {
      return <UserNav session={session} />;
}
