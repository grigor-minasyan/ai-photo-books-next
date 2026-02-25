import { redirect } from "next/navigation";

import { checkRole } from "@/utils/roles";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect(`/${locale}`);
  }

  return <>{children}</>;
}
