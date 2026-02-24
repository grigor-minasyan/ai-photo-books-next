"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/account");
    }
  }, [isPending, router, session]);

  if (isPending || session) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
