import Link from "next/link";

import { BookProductCard } from "@/components/books/book-product-card";
import { listHomepageBookProducts } from "@/lib/db/queries/book-products";

export default async function Home() {
  const products = await listHomepageBookProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border bg-linear-to-br from-slate-50 to-white p-8 sm:p-12">
        <div className="max-w-2xl space-y-5">
          <p className="text-sm font-medium text-primary">
            Personalized Storybooks
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Turn your child into the hero of their own AI-generated book
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Upload your child&apos;s portrait, generate a matching story
            character, and preview magical books before printing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#books"
              className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Explore books
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              Start personalizing
            </Link>
          </div>
        </div>
      </section>

      <section id="books" className="pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Books
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse source books available for personalization.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
            No books are available yet. Seed products and source generated books
            to display them here.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <BookProductCard
                key={product.id}
                slug={product.slug}
                title={product.titleTemplate}
                coverImagePath={product.coverImagePath}
              />
            ))}
          </div>
        )}
      </section>

      <section id="how-it-works" className="pt-14">
        <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">1. Upload portrait</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Parent uploads a child portrait photo as the character source.
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">2. Generate character</p>
            <p className="mt-2 text-sm text-muted-foreground">
              AI creates a matching illustrated character for storybook style
              scenes.
            </p>
          </div>
          <div className="rounded-xl border p-5">
            <p className="text-sm font-medium">3. Preview the book</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your personalized preview is generated from the selected source
              book.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
