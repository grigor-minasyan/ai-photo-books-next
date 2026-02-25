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
import Link from "next/link";

const navItems = [
  { href: "/#books", label: "Books" },
  { href: "/#how-it-works", label: "How It Works" },
];

export function SiteHeader() {
  const { user, isLoaded } = useUser();
  const isAdmin = isLoaded && user?.publicMetadata?.role === "admin";

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          AI Photo Books
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
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton>
              {isAdmin ? (
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Admin dashboard"
                    labelIcon={<Shield className="size-4" />}
                    href="/admin"
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
