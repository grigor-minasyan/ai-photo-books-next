import { getTranslations, setRequestLocale } from "next-intl/server";

import { GeneratedBooksManager } from "@/components/admin/generated-books-manager";
import { getAdminGeneratedBookFormOptionsAction, listAdminGeneratedBooksAction } from "@/app/[locale]/admin/actions/generated-books";

type AdminGeneratedBooksPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminGeneratedBooksPage({
  params,
}: AdminGeneratedBooksPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AdminGeneratedBooksPage");
  const [rows, options] = await Promise.all([
    listAdminGeneratedBooksAction(),
    getAdminGeneratedBookFormOptionsAction(),
  ]);

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <GeneratedBooksManager rows={rows} options={options} locale={locale} />
    </div>
  );
}
