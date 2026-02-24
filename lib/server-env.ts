import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  GEMINI_API_KEY: z.string().min(1),
  REDIS_URL: z.string().min(1),
});

export const serverEnv = serverEnvSchema.parse(process.env);
