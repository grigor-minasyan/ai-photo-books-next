import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const footerLinks = [
    { href: "/#books", label: t("books") },
    { href: "/#how-it-works", label: t("howItWorks") },
    { href: "/sign-in", label: t("signIn") },
    { href: "/sign-up", label: t("signUp") },
  ];

  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 text-base font-semibold">
            <span className="size-2 rounded-full bg-primary/80" />
            {t("brandName")}
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-wide text-foreground/90">
            {t("quickLinks")}
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border/70 px-3 py-1.5 transition-colors hover:border-border hover:bg-accent/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/90">
            {t("supportLabel")}: support@aiphotobooks.local
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
