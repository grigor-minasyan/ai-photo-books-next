import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GeneratedBookDetailManager } from "@/components/admin/generated-book-detail-manager";
import { getGeneratedBookAdminDetail } from "@/lib/db/queries/admin/generated-books";

type AdminGeneratedBookDetailPageProps = {
  params: Promise<{ locale: string; generatedBookId: string }>;
};

export default async function AdminGeneratedBookDetailPage({
  params,
}: AdminGeneratedBookDetailPageProps) {
  const { locale, generatedBookId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AdminGeneratedBookDetailPage");
  const data = await getGeneratedBookAdminDetail(generatedBookId);

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <GeneratedBookDetailManager data={data} locale={locale} />
    </div>
  );
}
