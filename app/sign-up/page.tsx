"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SignupForm } from "@/components/signup-form";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isVerifiedUser = Boolean(session?.user.emailVerified);

  useEffect(() => {
    if (!isPending && isVerifiedUser) {
      router.replace("/account");
      return;
    }
    if (!isPending && session && !isVerifiedUser) {
      router.replace("/verify-email");
    }
  }, [isPending, isVerifiedUser, router, session]);

  if (isPending) {
    return null;
  }

  if (isVerifiedUser || session) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <SignupForm className="w-full max-w-sm" />
    </div>
  );
}
