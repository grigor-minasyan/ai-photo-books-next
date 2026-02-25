import { redirect } from "next/navigation";

import { checkRole } from "@/utils/roles";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
