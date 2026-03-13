"use client";

import { useState, useTransition } from "react";

import { createBookProductAction } from "@/app/[locale]/admin/actions/book-products";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BookProductRow = {
  id: string;
  slug: string;
  titleTemplate: string;
  isActive: boolean;
};

export function BooksManager({
  rows,
  locale,
}: {
  rows: BookProductRow[];
  locale: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    titleTemplate: "",
    coverImageDescription: "",
    endingTextTemplate: "",
    backCoverImageDescription: "",
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Book Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="slug"
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
          />
          <Input
            placeholder="title template"
            value={form.titleTemplate}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, titleTemplate: event.target.value }))
            }
          />
          <Textarea
            placeholder="cover image description"
            value={form.coverImageDescription}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, coverImageDescription: event.target.value }))
            }
          />
          <Textarea
            placeholder="ending text template"
            value={form.endingTextTemplate}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, endingTextTemplate: event.target.value }))
            }
          />
          <Textarea
            placeholder="back cover image description"
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
                    await createBookProductAction({ ...form, locale });
                    setStatusMessage("Book template created.");
                    setForm({
                      slug: "",
                      titleTemplate: "",
                      coverImageDescription: "",
                      endingTextTemplate: "",
                      backCoverImageDescription: "",
                    });
                  } catch (error) {
                    setStatusMessage(
                      error instanceof Error ? error.message : "Failed to create book template",
                    );
                  }
                });
              }}
            >
              {isPending ? "Creating..." : "Create template"}
            </Button>
            {statusMessage ? (
              <p className="text-sm text-muted-foreground">{statusMessage}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Book Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{row.titleTemplate}</p>
                <p className="text-sm text-muted-foreground">{row.slug}</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/books/${row.id}`}>Manage</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
