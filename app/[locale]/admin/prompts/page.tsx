import { getTranslations, setRequestLocale } from "next-intl/server";

import { PromptsManager } from "@/components/admin/prompts-manager";
import { listPromptTemplates } from "@/lib/db/queries/admin/prompts";

type AdminPromptsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPromptsPage({ params }: AdminPromptsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AdminPromptsPage");
  const rows = await listPromptTemplates();

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <PromptsManager rows={rows} locale={locale} />
    </div>
  );
}
