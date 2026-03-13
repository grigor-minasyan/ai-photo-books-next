"use client";

import { useMemo, useState, useTransition } from "react";

import {
  updateBookProductAction,
  upsertBookProductPageAction,
} from "@/app/[locale]/admin/actions/book-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BookProductDetail = {
  product: {
    id: string;
    slug: string;
    titleTemplate: string;
    coverImageDescription: string;
    endingTextTemplate: string;
    backCoverImageDescription: string;
    isActive: boolean;
  };
  pages: Array<{
    id: string;
    pageNumber: number;
    textTemplate: string;
    imageDescription: string | null;
  }>;
};

export function BookDetailManager({
  data,
  locale,
}: {
  data: BookProductDetail;
  locale: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: data.product.slug,
    titleTemplate: data.product.titleTemplate,
    coverImageDescription: data.product.coverImageDescription,
    endingTextTemplate: data.product.endingTextTemplate,
    backCoverImageDescription: data.product.backCoverImageDescription,
  });

  const sortedPages = useMemo(
    () => [...data.pages].sort((a, b) => a.pageNumber - b.pageNumber),
    [data.pages],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Template Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
          />
          <Input
            value={form.titleTemplate}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, titleTemplate: event.target.value }))
            }
          />
          <Textarea
            value={form.coverImageDescription}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, coverImageDescription: event.target.value }))
            }
          />
          <Textarea
            value={form.endingTextTemplate}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, endingTextTemplate: event.target.value }))
            }
          />
          <Textarea
            value={form.backCoverImageDescription}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                backCoverImageDescription: event.target.value,
              }))
            }
          />
          <div className="flex items-center gap-3">
            <Button
              type="button"
              disabled={isPending}
              onClick={() => {
                setStatusMessage(null);
                startTransition(async () => {
                  try {
                    await updateBookProductAction({
                      bookProductId: data.product.id,
                      ...form,
                      locale,
                    });
                    setStatusMessage("Book template saved.");
                  } catch (error) {
                    setStatusMessage(
                      error instanceof Error ? error.message : "Failed to update template",
                    );
                  }
                });
              }}
            >
              {isPending ? "Saving..." : "Save template"}
            </Button>
            {statusMessage ? (
              <p className="text-sm text-muted-foreground">{statusMessage}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Page Texts and Image Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedPages.map((page) => (
            <PageRow
              key={page.id}
              bookProductId={data.product.id}
              pageNumber={page.pageNumber}
              locale={locale}
              initialText={page.textTemplate}
              initialDescription={page.imageDescription}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PageRow({
  bookProductId,
  pageNumber,
  locale,
  initialText,
  initialDescription,
}: {
  bookProductId: string;
  pageNumber: number;
  locale: string;
  initialText: string;
  initialDescription: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [textTemplate, setTextTemplate] = useState(initialText);
  const [imageDescription, setImageDescription] = useState(initialDescription ?? "");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="rounded-md border p-3">
      <p className="mb-2 font-medium">Page {pageNumber}</p>
      <div className="space-y-2">
        <Textarea value={textTemplate} onChange={(event) => setTextTemplate(event.target.value)} />
        <Textarea
          value={imageDescription}
          onChange={(event) => setImageDescription(event.target.value)}
          placeholder="Image description for generation"
        />
        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="sm"
            disabled={isPending}
            onClick={() => {
              setStatus(null);
              startTransition(async () => {
                try {
                  await upsertBookProductPageAction({
                    bookProductId,
                    pageNumber,
                    textTemplate,
                    imageDescription: imageDescription || null,
                    locale,
                  });
                  setStatus("Saved");
                } catch (error) {
                  setStatus(error instanceof Error ? error.message : "Failed to save page");
                }
              });
            }}
          >
            {isPending ? "Saving..." : "Save page"}
          </Button>
          {status ? <p className="text-xs text-muted-foreground">{status}</p> : null}
        </div>
      </div>
    </div>
  );
}
