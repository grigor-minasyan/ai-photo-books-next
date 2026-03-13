import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";

import { BookProductCard } from "@/components/books/book-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import { listHomepageBookProducts } from "@/lib/db/queries/book-products";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const products = await listHomepageBookProducts(locale as AppLocale);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="hero-warm rounded-3xl border p-8 shadow-sm sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-end">
          <div className="max-w-2xl space-y-5">
            <Badge className="gap-1.5 px-3 py-1 text-xs">
              <Sparkles className="size-3.5" />
              {t("badge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/#books">{t("exploreBooks")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="/sign-up">{t("startPersonalizing")}</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="surface-warm rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("heroMetricOneLabel")}
              </p>
              <p className="mt-1 text-2xl font-semibold">{t("heroMetricOneValue")}</p>
            </div>
            <div className="surface-warm rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("heroMetricTwoLabel")}
              </p>
              <p className="mt-1 text-2xl font-semibold">{t("heroMetricTwoValue")}</p>
            </div>
            <div className="surface-warm rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("heroMetricThreeLabel")}
              </p>
              <p className="mt-1 text-2xl font-semibold">{t("heroMetricThreeValue")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="books" className="pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("featuredBooks")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("featuredDescription")}
            </p>
          </div>
          <Badge variant="outline" className="rounded-full px-3 py-1">
            {products.length} {t("booksLabel")}
          </Badge>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
            {t("emptyBooks")}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <BookProductCard
                key={product.id}
                slug={product.slug}
                title={product.title}
                coverImagePath={product.coverImagePath}
              />
            ))}
          </div>
        )}
      </section>

      <section id="how-it-works" className="pt-14">
        <Badge variant="outline" className="rounded-full px-3 py-1">
          {t("howItWorks")}
        </Badge>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("howItWorksHeading")}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="surface-warm rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-wide text-primary">
              01
            </p>
            <p className="mt-2 text-sm font-semibold">{t("stepOneTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("stepOneDescription")}
            </p>
          </div>
          <div className="surface-warm rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-wide text-primary">
              02
            </p>
            <p className="mt-2 text-sm font-semibold">{t("stepTwoTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("stepTwoDescription")}
            </p>
          </div>
          <div className="surface-warm rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-wide text-primary">
              03
            </p>
            <p className="mt-2 text-sm font-semibold">{t("stepThreeTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("stepThreeDescription")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
