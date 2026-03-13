import { getTranslations, setRequestLocale } from "next-intl/server";

import { BooksManager } from "@/components/admin/books-manager";
import { listAdminBookProducts } from "@/lib/db/queries/admin/book-products";

type AdminBooksPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminBooksPage({ params }: AdminBooksPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AdminBooksPage");
  const rows = await listAdminBookProducts();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <BooksManager rows={rows} locale={locale} />
    </div>
  );
}
