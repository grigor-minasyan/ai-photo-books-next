"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";

const locales: AppLocale[] = ["en", "hy"];

export function LocaleSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>{t("label")}:</span>
      <div className="inline-flex overflow-hidden rounded-md border">
        {locales.map((nextLocale) => {
          const isActive = nextLocale === locale;

          return (
            <button
              key={nextLocale}
              type="button"
              disabled={isPending || isActive}
              onClick={() => {
                startTransition(() => {
                  router.replace(pathname, { locale: nextLocale });
                });
              }}
              className={`px-2 py-1 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-foreground"
              }`}
            >
              {nextLocale === "en" ? t("english") : t("armenian")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
