import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import { getBookProductBySlug } from "@/lib/db/queries/book-products";

type BookProductPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function BookProductPage({
  params,
}: BookProductPageProps) {
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

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const firstPage = product.sourcePages[0]?.pageNumber ?? product.templatePages[0]?.pageNumber ?? 0;
  const lastPage =
    product.sourcePages[product.sourcePages.length - 1]?.pageNumber ??
    product.templatePages[product.templatePages.length - 1]?.pageNumber ??
    0;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted shadow-sm">
          <Image src={product.coverImagePath} alt={product.title} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Badge className="rounded-full px-3 py-1">{t("bookOverviewBadge")}</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
            <p className="text-base text-muted-foreground">{product.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="surface-warm rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("pageCountLabel")}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {firstPage > 0 && lastPage >= firstPage
                  ? `${firstPage}-${lastPage}`
                  : t("unknownValue")}
              </p>
            </div>
            <div className="surface-warm rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("formatsLabel")}
              </p>
              <p className="mt-1 text-sm font-semibold">{product.variationPricing.length}</p>
            </div>
            <div className="surface-warm rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("startingPriceLabel")}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {product.variationPricing.length > 0
                  ? currencyFormatter.format(
                      Math.min(...product.variationPricing.map((item) => item.reducedPriceCents)) /
                        100,
                    )
                  : t("unknownValue")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild className="rounded-full px-6">
              <Link href="/sign-up">{t("startPersonalizing")}</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/">{t("backToBooks")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <Badge variant="outline" className="rounded-full px-3 py-1">
            {t("bookDetailsBadge")}
          </Badge>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("bookDetailsTitle")}
          </h2>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t("previewTab")}</h3>
            {product.sourcePages.length === 0 &&
            product.templatePages.length === 0 &&
            !product.rawBackCoverImagePath ? (
              <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                {t("emptyPreview")}
              </div>
            ) : (
              <div className="rounded-2xl border bg-card p-5">
                <Carousel opts={{ align: "start", loop: false }} className="mx-auto w-full">
                  <CarouselContent>
                    {(product.sourcePages.length > 0 ? product.sourcePages : product.templatePages).map(
                      (page) => (
                        <CarouselItem key={page.id} className="md:basis-1/2 xl:basis-1/3">
                          <article className="overflow-hidden rounded-xl border bg-background">
                            <div className="relative aspect-square bg-muted">
                              {("imagePath" in page && page.imagePath) ? (
                                <Image
                                  src={page.imagePath}
                                  alt={`${product.title} ${t("pageLabel")} ${page.pageNumber}`}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
                                  {t("imagePreviewUnavailable")}
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <Badge variant="outline" className="rounded-full px-2.5 py-1">
                                {t("pageLabel")} {page.pageNumber}
                              </Badge>
                            </div>
                          </article>
                        </CarouselItem>
                      ),
                    )}
                    {product.rawBackCoverImagePath ? (
                      <CarouselItem key="back-cover" className="md:basis-1/2 xl:basis-1/3">
                        <article className="overflow-hidden rounded-xl border bg-background">
                          <div className="relative aspect-square bg-muted">
                            <Image
                              src={product.backCoverImagePath}
                              alt={`${product.title} ${t("backCoverLabel")}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <Badge variant="outline" className="rounded-full px-2.5 py-1">
                              {t("backCoverLabel")}
                            </Badge>
                          </div>
                        </article>
                      </CarouselItem>
                    ) : null}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 top-3 translate-y-0" />
                  <CarouselNext className="right-3 top-3 translate-y-0" />
                </Carousel>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t("formatsTab")}</h3>
            {product.variationPricing.length === 0 ? (
              <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                {t("emptyFormats")}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {product.variationPricing.map((variation) => (
                  <article key={variation.variationKey} className="surface-warm rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{variation.variationLabel}</p>
                        <p className="text-sm text-muted-foreground">
                          {variation.pageCount} {t("pagesSuffix")}
                        </p>
                      </div>
                      <Badge variant="outline" className="rounded-full px-2.5 py-1">
                        {variation.variationKey}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-end gap-2">
                      <p className="text-2xl font-semibold">
                        {currencyFormatter.format(variation.reducedPriceCents / 100)}
                      </p>
                      <p className="text-sm text-muted-foreground line-through">
                        {currencyFormatter.format(variation.originalPriceCents / 100)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
