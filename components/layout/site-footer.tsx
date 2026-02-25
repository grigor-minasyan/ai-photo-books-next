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
    <footer className="border-t bg-muted/20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div className="space-y-3">
          <p className="text-base font-semibold">{t("brandName")}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">{t("quickLinks")}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("supportLabel")}: support@aiphotobooks.local
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
