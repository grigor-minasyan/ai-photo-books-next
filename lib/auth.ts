import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import { serverEnv } from "@/lib/server-env";

const resend = new Resend(serverEnv.RESEND_API_KEY);

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
        const subjectByType: Record<typeof type, string> = {
          "sign-in": "Your sign-in code",
          "email-verification": "Verify your email address",
          "forget-password": "Your password reset code",
        };
        const recipientEmail =
          serverEnv.NODE_ENV === "development" ? "delivered@resend.dev" : email;

        console.log("Sending email to", recipientEmail, otp);
        void resend.emails
          .send({
            from: serverEnv.RESEND_FROM_EMAIL,
            to: recipientEmail,
            subject: subjectByType[type] ?? "Your verification code",
            text: `Your verification code is: ${otp}`,
          })
          .catch((error) => {
            console.error(error);
          });
      },
    }),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
});
