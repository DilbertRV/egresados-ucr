import { MainNav } from "@/app/components/navbar/main-nav";
import { UserNav } from "@/app/components/navbar/user-nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function NavContainer() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      {session ? (
        <header className="bg-primary sm:flex hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav session={session} />
              </div>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
}
