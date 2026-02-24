import Link from "next/link";

const footerLinks = [
  { href: "/#books", label: "Books" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div className="space-y-3">
          <p className="text-base font-semibold">AI Photo Books</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Personalized storybooks where your child becomes the hero. Upload a portrait, generate a
            character, and preview a magical book in minutes.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Quick Links</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Support: support@aiphotobooks.local</p>
        </div>
      </div>
    </footer>
  );
}
