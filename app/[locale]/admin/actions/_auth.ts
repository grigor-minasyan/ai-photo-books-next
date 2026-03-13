"use server";

import { checkRole } from "@/utils/roles";

export async function assertAdmin() {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }
}
