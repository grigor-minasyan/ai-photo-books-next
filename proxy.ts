import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const isAdminRoute = createRouteMatcher(["/:locale/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    if (!userId || sessionClaims?.metadata?.role !== "admin") {
      const firstSegment = req.nextUrl.pathname.split("/")[1];
      const locale = routing.locales.includes(firstSegment as "en" | "hy")
        ? firstSegment
        : routing.defaultLocale;

      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
