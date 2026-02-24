"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { EmailVerificationForm } from "@/components/email-verification-form";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user.emailVerified) {
      router.replace("/account");
    }
  }, [isPending, router, session]);

  if (isPending || session?.user.emailVerified) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <EmailVerificationForm className="w-full max-w-sm" />
    </div>
  );
}
