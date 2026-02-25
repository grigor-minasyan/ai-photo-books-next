import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
    <article className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <Link href={`/books/${slug}`} className="block">
        <div className="relative aspect-4/5 w-full bg-muted">
          <Image
            src={coverImagePath}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-base font-semibold">{title}</h3>
        <Link
          href={`/books/${slug}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          {t("viewBook")}
        </Link>
      </div>
    </article>
  );
}
