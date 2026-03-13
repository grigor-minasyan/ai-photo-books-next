"use client";

import { useState, useTransition } from "react";
import Image from "next/image";

import { createGeneratedBookAction } from "@/app/[locale]/admin/actions/generated-books";
import { Link } from "@/i18n/navigation";
import { toImageUrl } from "@/lib/utils/image-url";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GeneratedBookRow = {
  id: string;
  bookProductSlug: string;
  characterName: string;
  status: "draft" | "processing" | "ready" | "failed" | "archived";
  rawCoverImagePath: string | null;
  coverImagePath: string | null;
  rawBackCoverImagePath: string | null;
  backCoverImagePath: string | null;
};

type Options = {
  products: Array<{ id: string; slug: string; title: string }>;
  characters: Array<{ id: string; name: string; slug: string }>;
  variations: Array<{ id: string; key: string; label: string; pageCount: number }>;
};

export function GeneratedBooksManager({
  rows,
  options,
  locale,
}: {
  rows: GeneratedBookRow[];
  options: Options;
  locale: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [bookProductId, setBookProductId] = useState(options.products[0]?.id ?? "");
  const [characterId, setCharacterId] = useState(options.characters[0]?.id ?? "");
  const [variationId, setVariationId] = useState(options.variations[0]?.id ?? "");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Generated Book</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block">Book template</span>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              value={bookProductId}
              onChange={(event) => setBookProductId(event.target.value)}
            >
              {options.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title} ({product.slug})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block">Character</span>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              value={characterId}
              onChange={(event) => setCharacterId(event.target.value)}
            >
              {options.characters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name} ({character.slug})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block">Variation (page limit source)</span>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              value={variationId}
              onChange={(event) => setVariationId(event.target.value)}
            >
              {options.variations.map((variation) => (
                <option key={variation.id} value={variation.id}>
                  {variation.label} - {variation.pageCount} pages
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              disabled={isPending || !bookProductId || !characterId || !variationId}
              onClick={() => {
                setMessage(null);
                startTransition(async () => {
                  try {
                    await createGeneratedBookAction({
                      bookProductId,
                      characterId,
                      variationId,
                      locale,
                    });
                    setMessage("Generated book created.");
                  } catch (error) {
                    setMessage(
                      error instanceof Error
                        ? error.message
                        : "Failed to create generated book",
                    );
                  }
                });
              }}
            >
              {isPending ? "Creating..." : "Create generated book"}
            </Button>
            {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Books</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-md border p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <PreviewImage
                  src={toImageUrl(row.coverImagePath ?? row.rawCoverImagePath, {
                    fallbackPath: "/file.svg",
                  })}
                  alt={`${row.bookProductSlug} cover`}
                />
                <p className="font-medium">{row.bookProductSlug}</p>
                <p className="text-sm text-muted-foreground">
                  {row.characterName} - {row.status}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/generated-books/${row.id}`}>Manage</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  if (src === "/file.svg") {
    return (
      <div className="bg-muted text-muted-foreground flex h-14 w-14 items-center justify-center rounded border text-[10px]">
        no image
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={56}
      height={56}
      unoptimized
      className="h-14 w-14 rounded border object-cover"
    />
  );
}
