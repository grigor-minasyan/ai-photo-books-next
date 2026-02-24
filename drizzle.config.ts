import { defineConfig } from "drizzle-kit";
import { serverEnv } from "./lib/server-env";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
