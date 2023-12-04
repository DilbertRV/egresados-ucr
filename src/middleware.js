import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { getUser } from "./utils/user-utils";

export async function middleware(req) {
  const adminPath = "/admin";

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const redirect = () => {
    return NextResponse.next({
      status: 404,
      redirect: {
        destination: "/404",
        permanent: false,
      },
    });
  };

  if (!session) {
    if (req.nextUrl.pathname.startsWith(adminPath)) {
      return redirect();
    }
  }
  const user = await getUser(supabase, session);

  if (user.rol !== 1) {
    if (req.nextUrl.pathname.startsWith(adminPath)) {
      return redirect();
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
