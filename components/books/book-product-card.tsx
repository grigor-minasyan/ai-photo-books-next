import Image from "next/image";
import Link from "next/link";

type BookProductCardProps = {
  slug: string;
  title: string;
  coverImagePath: string;
};

export function BookProductCard({
  slug,
  title,
  coverImagePath,
}: BookProductCardProps) {
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
          View book
        </Link>
      </div>
    </article>
  );
}
