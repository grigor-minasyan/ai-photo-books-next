import { getTranslations, setRequestLocale } from "next-intl/server";

type AdminDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AdminPage");

  return <p>{t("title")}</p>;
}
