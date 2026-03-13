import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

type BookProductCardProps = {
  slug: string;
  title: string;
  coverImagePath: string;
};

export async function BookProductCard({
  slug,
  title,
  coverImagePath,
}: BookProductCardProps) {
  const t = await getTranslations("BookCard");

  return (
    <article className="group overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/books/${slug}`} className="block">
        <div className="relative aspect-square w-full bg-muted">
          <Image
            src={coverImagePath}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <Badge variant="outline" className="rounded-full px-2.5 py-1">
          {t("editorialPick")}
        </Badge>
        <h3 className="line-clamp-2 text-base font-semibold">{title}</h3>
        <Link
          href={`/books/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {t("viewBook")}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
