"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  generateFinalBackCoverAction,
  generateFinalCoverAction,
  generateFinalPageAction,
  generateFinalPagesBulkAction,
  generateRawBackCoverAction,
  generateRawCoverAction,
  generateRawPageAction,
  generateRawPagesBulkAction,
} from "@/app/[locale]/admin/actions/image-jobs";
import { toImageUrl } from "@/lib/utils/image-url";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GeneratedBookDetail = {
  book: {
    id: string;
    bookProductSlug: string;
    characterName: string;
    rawCoverImagePath: string | null;
    coverImagePath: string | null;
    rawBackCoverImagePath: string | null;
    backCoverImagePath: string | null;
  };
  pages: Array<{
    id: string;
    pageNumber: number;
    rawImagePath: string | null;
    imagePath: string | null;
  }>;
};

export function GeneratedBookDetailManager({
  data,
  locale,
}: {
  data: GeneratedBookDetail;
  locale: string;
}) {
  const router = useRouter();
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [pendingActions, setPendingActions] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string | null>(null);
  const allPageNumbers = useMemo(
    () => data.pages.map((page) => page.pageNumber),
    [data.pages],
  );

  const isActionPending = (actionKey: string) => pendingActions.has(actionKey);

  useEffect(() => {
    if (pendingActions.size === 0) {
      return;
    }

    // Keep the UI in sync as long-running generation jobs finish.
    const refreshInterval = window.setInterval(() => {
      router.refresh();
    }, 1500);

    return () => {
      window.clearInterval(refreshInterval);
    };
  }, [pendingActions, router]);

  const runAction = (
    actionKey: string,
    fn: () => Promise<void>,
    successMessage = "Done",
  ) => {
    if (pendingActions.has(actionKey)) {
      return;
    }
    setMessage(null);
    setPendingActions((prev) => {
      const next = new Set(prev);
      next.add(actionKey);
      return next;
    });

    void (async () => {
      try {
        await fn();
        setMessage(successMessage);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Action failed");
      } finally {
        router.refresh();
        setPendingActions((prev) => {
          const next = new Set(prev);
          next.delete(actionKey);
          return next;
        });
      }
    })();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {data.book.bookProductSlug} - {data.book.characterName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 md:grid-cols-2">
            <AssetActions
              title="Cover"
              rawPath={data.book.rawCoverImagePath}
              finalPath={data.book.coverImagePath}
              onGenerateRaw={() =>
                runAction(
                  "cover-raw-final",
                  async () => {
                    await generateRawCoverAction({
                      generatedBookId: data.book.id,
                      locale,
                    });
                    await generateFinalCoverAction({
                      generatedBookId: data.book.id,
                      locale,
                    });
                  },
                  "Generated cover raw + final",
                )
              }
              onGenerateFinal={() =>
                runAction("cover-final", () =>
                  generateFinalCoverAction({
                    generatedBookId: data.book.id,
                    locale,
                  }),
                )
              }
              rawPending={isActionPending("cover-raw-final")}
              finalPending={isActionPending("cover-final")}
            />
            <AssetActions
              title="Back Cover"
              rawPath={data.book.rawBackCoverImagePath}
              finalPath={data.book.backCoverImagePath}
              onGenerateRaw={() =>
                runAction(
                  "back-cover-raw-final",
                  async () => {
                    await generateRawBackCoverAction({
                      generatedBookId: data.book.id,
                      locale,
                    });
                    await generateFinalBackCoverAction({
                      generatedBookId: data.book.id,
                      locale,
                    });
                  },
                  "Generated back cover raw + final",
                )
              }
              onGenerateFinal={() =>
                runAction("back-cover-final", () =>
                  generateFinalBackCoverAction({
                    generatedBookId: data.book.id,
                    locale,
                  }),
                )
              }
              rawPending={isActionPending("back-cover-raw-final")}
              finalPending={isActionPending("back-cover-final")}
            />
          </div>
          {message ? (
            <p className="text-sm text-muted-foreground">{message}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedPages(allPageNumbers)}
            >
              Select all
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedPages([])}
            >
              Clear selection
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={
                selectedPages.length === 0 ||
                isActionPending("pages-bulk-raw-final")
              }
              onClick={() => {
                const pageNumbers = [...selectedPages];
                runAction(
                  "pages-bulk-raw-final",
                  async () => {
                    await generateRawPagesBulkAction({
                      generatedBookId: data.book.id,
                      pageNumbers,
                      locale,
                    });
                    await generateFinalPagesBulkAction({
                      generatedBookId: data.book.id,
                      pageNumbers,
                      locale,
                    });
                  },
                  "Generated selected pages raw + final",
                );
              }}
            >
              Generate raw for selected
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={
                selectedPages.length === 0 ||
                isActionPending("pages-bulk-final")
              }
              onClick={() => {
                const pageNumbers = [...selectedPages];
                runAction("pages-bulk-final", () =>
                  generateFinalPagesBulkAction({
                    generatedBookId: data.book.id,
                    pageNumbers,
                    locale,
                  }),
                );
              }}
            >
              Generate final for selected
            </Button>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {data.pages.map((page) => {
              const checked = selectedPages.includes(page.pageNumber);
              return (
                <div
                  key={page.id}
                  className="space-y-3 rounded-md border p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedPages((prev) => [...prev, page.pageNumber]);
                            return;
                          }
                          setSelectedPages((prev) =>
                            prev.filter((number) => number !== page.pageNumber),
                          );
                        }}
                      />
                      <span className="text-sm font-medium">Page {page.pageNumber}</span>
                    </label>
                    <p className="text-xs text-muted-foreground">
                      raw: {page.rawImagePath ? "yes" : "no"} | final:{" "}
                      {page.imagePath ? "yes" : "no"}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <PreviewImage
                      src={page.rawImagePath}
                      alt={`Page ${page.pageNumber} raw`}
                      label="Raw"
                    />
                    <PreviewImage
                      src={page.imagePath}
                      alt={`Page ${page.pageNumber} final`}
                      label="Final"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isActionPending(`page-${page.id}-raw-final`)}
                      onClick={() =>
                        runAction(
                          `page-${page.id}-raw-final`,
                          async () => {
                            await generateRawPageAction({
                              generatedBookId: data.book.id,
                              pageNumber: page.pageNumber,
                              locale,
                            });
                            await generateFinalPageAction({
                              generatedBookId: data.book.id,
                              pageNumber: page.pageNumber,
                              locale,
                            });
                          },
                          `Generated page ${page.pageNumber} raw + final`,
                        )
                      }
                    >
                      Generate raw
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      disabled={isActionPending(`page-${page.id}-final`)}
                      onClick={() =>
                        runAction(`page-${page.id}-final`, () =>
                          generateFinalPageAction({
                            generatedBookId: data.book.id,
                            pageNumber: page.pageNumber,
                            locale,
                          }),
                        )
                      }
                    >
                      Generate final
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AssetActions({
  title,
  rawPath,
  finalPath,
  onGenerateRaw,
  onGenerateFinal,
  rawPending,
  finalPending,
}: {
  title: string;
  rawPath: string | null;
  finalPath: string | null;
  onGenerateRaw: () => void;
  onGenerateFinal: () => void;
  rawPending: boolean;
  finalPending: boolean;
}) {
  return (
    <div className="rounded-md border p-4">
      <p className="font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">
        raw: {rawPath ? "yes" : "no"} | final: {finalPath ? "yes" : "no"}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <PreviewImage src={rawPath} alt={`${title} raw`} label="Raw" />
        <PreviewImage src={finalPath} alt={`${title} final`} label="Final" />
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={rawPending}
          onClick={onGenerateRaw}
        >
          Generate raw
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={finalPending}
          onClick={onGenerateFinal}
        >
          Generate final
        </Button>
      </div>
    </div>
  );
}

function PreviewImage({
  src,
  alt,
  label,
}: {
  src: string | null;
  alt: string;
  label: string;
}) {
  const imageUrl = toImageUrl(src, { fallbackPath: "/file.svg" });
  const hasImage = imageUrl !== "/file.svg";

  return (
    <div className="space-y-1.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      {hasImage ? (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="hover:border-primary focus-visible:ring-ring w-full overflow-hidden rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image
                src={imageUrl}
                alt={alt}
                width={640}
                height={640}
                unoptimized
                className="bg-muted h-72 w-full object-contain"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{alt}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <Image
                src={imageUrl}
                alt={alt}
                width={1600}
                height={1600}
                unoptimized
                className="max-h-[86vh] w-auto rounded-md object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="bg-muted text-muted-foreground flex h-72 w-full items-center justify-center rounded-md border text-xs">
          no image
        </div>
      )}
    </div>
  );
}
