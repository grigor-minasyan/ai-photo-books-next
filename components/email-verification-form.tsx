"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

export function EmailVerificationForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.emailVerified) {
      router.replace("/account");
      return;
    }

    if (session?.user.email) {
      setEmail(session.user.email);
      return;
    }

    const pendingEmail = window.sessionStorage.getItem("pendingVerificationEmail");
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, [router, session]);

  function handleEmailChange(nextEmail: string) {
    setEmail(nextEmail);
    window.sessionStorage.setItem("pendingVerificationEmail", nextEmail);
  }

  async function verifyOtp() {
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (otp.length < 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPending(true);

    const response = await fetch("/api/auth/email-otp/verify-email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        otp,
      }),
    });
    const payload = (await response.json().catch(() => null)) as {
      status?: boolean;
      message?: string;
    } | null;

    setIsPending(false);

    if (!response.ok || !payload?.status) {
      setErrorMessage(payload?.message ?? "Invalid OTP. Please try again.");
      return;
    }

    window.sessionStorage.removeItem("pendingVerificationEmail");
    router.push("/account");
    router.refresh();
  }

  async function resendOtp() {
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPending(true);

    const response = await fetch("/api/auth/email-otp/send-verification-otp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        type: "email-verification",
      }),
    });

    setIsPending(false);

    if (!response.ok) {
      setErrorMessage("Failed to resend OTP.");
      return;
    }

    setSuccessMessage("A new OTP has been sent.");
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the email and OTP code to finish account verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="verify-email">Email</FieldLabel>
            <Input
              id="verify-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              value={email}
              onChange={(event) => handleEmailChange(event.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel>Email verification code</FieldLabel>
            <FieldDescription>
              Enter the 6-digit code sent to your email.
            </FieldDescription>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </Field>
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          {successMessage ? (
            <p className="text-sm text-green-700">{successMessage}</p>
          ) : null}
          <Field>
            <Button type="button" disabled={isPending} onClick={verifyOtp}>
              {isPending ? "Verifying..." : "Verify email"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={resendOtp}
            >
              Resend code
            </Button>
            <FieldDescription className="text-center">
              Back to{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
