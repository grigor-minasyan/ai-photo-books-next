"use client";

import { useState, useTransition } from "react";

import { updatePromptTemplateAction } from "@/app/[locale]/admin/actions/prompts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type PromptTemplateRow = {
  id: string;
  key: "generate_book" | "generate_character_from_image" | "generate_generic_image" | "generate_image_based_on_another";
  promptText: string;
  isActive: boolean;
};

export function PromptsManager({
  rows,
  locale,
}: {
  rows: PromptTemplateRow[];
  locale: string;
}) {
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <PromptRow key={row.id} row={row} locale={locale} />
      ))}
    </div>
  );
}

function PromptRow({ row, locale }: { row: PromptTemplateRow; locale: string }) {
  const [text, setText] = useState(row.promptText);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{row.key}</CardTitle>
        <CardDescription>Update active prompt template text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea value={text} onChange={(event) => setText(event.target.value)} rows={8} />
        <div className="flex items-center gap-3">
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              setMessage(null);
              startTransition(async () => {
                try {
                  await updatePromptTemplateAction({
                    key: row.key,
                    promptText: text,
                    locale,
                  });
                  setMessage("Saved");
                } catch (error) {
                  setMessage(
                    error instanceof Error ? error.message : "Failed to save prompt",
                  );
                }
              });
            }}
          >
            {isPending ? "Saving..." : "Save prompt"}
          </Button>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
