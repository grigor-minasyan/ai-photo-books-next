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
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {t("brandName")}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
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
                className="inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium hover:bg-accent"
              >
                {t("signIn")}
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
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
