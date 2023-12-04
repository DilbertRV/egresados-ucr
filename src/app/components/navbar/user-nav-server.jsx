import { UserNav } from "@/app/components/navbar/user-nav";

export async function UserNavServer() {
  return <UserNav session={session} />;
}
