import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (!resend) {
          throw new Error("RESEND_API_KEY is required to send OTP emails");
        }
        if (!process.env.RESEND_FROM_EMAIL) {
          throw new Error("RESEND_FROM_EMAIL is required to send OTP emails");
        }

        const subjectByType: Record<typeof type, string> = {
          "sign-in": "Your sign-in code",
          "email-verification": "Verify your email address",
          "forget-password": "Your password reset code",
        };

        void resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: subjectByType[type] ?? "Your verification code",
          text: `Your verification code is: ${otp}`,
        });
      },
    }),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
});
