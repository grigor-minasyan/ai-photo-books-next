import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBookProductBySlug } from "@/lib/db/queries/book-products";

type BookProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BookProductPage({ params }: BookProductPageProps) {
  const { slug } = await params;
  const product = await getBookProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <div className="relative aspect-4/5 overflow-hidden rounded-xl border bg-muted">
          <Image src={product.coverImagePath} alt={product.titleTemplate} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Source Book</p>
            <h1 className="text-3xl font-bold tracking-tight">{product.titleTemplate}</h1>
            <p className="text-sm text-muted-foreground">
              This source book is used as the base template before personalization.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border p-5">
            <div>
              <p className="text-sm font-medium">Cover prompt</p>
              <p className="mt-1 text-sm text-muted-foreground">{product.coverImageDescription}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Ending text template</p>
              <p className="mt-1 text-sm text-muted-foreground">{product.endingTextTemplate}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Back cover prompt</p>
              <p className="mt-1 text-sm text-muted-foreground">{product.backCoverImageDescription}</p>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">Story template details</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.templatePages.length} template pages and {product.sourcePages.length} source generated pages
              are available for this book.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Sign up to personalize
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              Back to books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
