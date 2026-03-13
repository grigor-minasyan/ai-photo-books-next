import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1),
  GEMINI_API_KEY: z.string().min(1),
  REDIS_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  R2_ACCOUNT_ID: z.string().min(1).optional(),
  R2_ACCESS_KEY_ID: z.string().min(1).optional(),
  R2_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  R2_BUCKET_NAME: z.string().min(1).optional(),
  R2_REGION: z.string().min(1).optional(),
  R2_FORCE_SIGNED_URLS: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
  R2_SIGNED_URL_TTL_SECONDS: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)),
});

export const serverEnv = serverEnvSchema.parse(process.env);
