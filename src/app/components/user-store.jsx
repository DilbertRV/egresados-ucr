'use client'

import { useUserStore } from "@/store/user";

export function userStore() {
  const user = useUserStore((state) => state.user);
  return console.log(user);
}
