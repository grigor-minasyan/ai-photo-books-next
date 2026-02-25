import { getTranslations, setRequestLocale } from "next-intl/server";

import { BookProductCard } from "@/components/books/book-product-card";
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
      <section className="rounded-2xl border bg-linear-to-br from-slate-50 to-white p-8 sm:p-12">
        <div className="max-w-2xl space-y-5">
          <p className="text-sm font-medium text-primary">{t("badge")}</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#books"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {t("exploreBooks")}
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              {t("startPersonalizing")}
            </Link>
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
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("howItWorks")}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">{t("stepOneTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("stepOneDescription")}
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">{t("stepTwoTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("stepTwoDescription")}
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">{t("stepThreeTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("stepThreeDescription")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
