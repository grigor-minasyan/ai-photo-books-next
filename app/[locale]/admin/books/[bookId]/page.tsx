import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BookDetailManager } from "@/components/admin/book-detail-manager";
import { getAdminBookProductById } from "@/lib/db/queries/admin/book-products";

type AdminBookDetailPageProps = {
  params: Promise<{ locale: string; bookId: string }>;
};

export default async function AdminBookDetailPage({ params }: AdminBookDetailPageProps) {
  const { locale, bookId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AdminBookDetailPage");
  const data = await getAdminBookProductById(bookId);

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <BookDetailManager data={data} locale={locale} />
    </div>
  );
}
