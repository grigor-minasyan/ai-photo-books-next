import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AdminPage");

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.prompts.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm underline" href="/admin/prompts">
              {t("sections.prompts.cta")}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.books.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm underline" href="/admin/books">
              {t("sections.books.cta")}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("sections.generatedBooks.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link className="text-sm underline" href="/admin/generated-books">
              {t("sections.generatedBooks.cta")}
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
