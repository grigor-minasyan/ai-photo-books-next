"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Shield } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const { user, isLoaded } = useUser();
  const isAdmin = isLoaded && user?.publicMetadata?.role === "admin";
  const navItems = [
    { href: "/#books", label: t("books") },
    { href: "/#how-it-works", label: t("howItWorks") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/65">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="size-2 rounded-full bg-primary/80 transition-transform group-hover:scale-125" />
          {t("brandName")}
        </Link>
        <nav className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-2 py-1 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-full border border-border/70 bg-card px-4 text-sm font-medium transition-colors hover:bg-accent/70"
              >
                {t("signIn")}
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("signUp")}
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton>
              {isAdmin ? (
                <UserButton.MenuItems>
                  <UserButton.Link
                    label={t("adminDashboard")}
                    labelIcon={<Shield className="size-4" />}
                    href={`/${locale}/admin`}
                  />
                </UserButton.MenuItems>
              ) : null}
            </UserButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
