import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import { getBookProductBySlug } from "@/lib/db/queries/book-products";

type BookProductPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function BookProductPage({ params }: BookProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("BookDetail");
  const product = await getBookProductBySlug(
    slug,
    locale as AppLocale,
    t("defaultDescription"),
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="relative aspect-4/5 overflow-hidden rounded-xl border bg-muted">
          <Image
            src={product.coverImagePath}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {t("sourceBook")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {t("startPersonalizing")}
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              {t("backToBooks")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
