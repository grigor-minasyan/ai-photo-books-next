"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [needsOtpVerification, setNeedsOtpVerification] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSignUp(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const emailValue = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPending(true);

    const { error } = await authClient.signUp.email({
      name,
      email: emailValue,
      password,
      callbackURL: "/",
    });

    setIsPending(false);

    if (error) {
      setErrorMessage(error.message ?? "Failed to create account.");
      return;
    }

    setEmail(emailValue);
    setNeedsOtpVerification(true);
    setSuccessMessage(
      "Account created. Enter the OTP sent to your email to verify.",
    );
  }

  async function verifyOtp() {
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
        email,
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

    router.push("/");
    router.refresh();
  }

  async function resendOtp() {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPending(true);

    const response = await fetch("/api/auth/email-otp/send-verification-otp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!needsOtpVerification ? (
          <form
            action={async (formData) => {
              await onSignUp(formData);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>
              {errorMessage ? (
                <p className="text-sm text-destructive">{errorMessage}</p>
              ) : null}
              {successMessage ? (
                <p className="text-sm text-green-700">{successMessage}</p>
              ) : null}
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating account..." : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        ) : (
          <div className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Email verification code</FieldLabel>
                <FieldDescription>
                  Enter the OTP sent to {email}.
                </FieldDescription>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
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
              </Field>
            </FieldGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
