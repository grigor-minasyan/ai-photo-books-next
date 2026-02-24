import { drizzle } from "drizzle-orm/neon-http";

import { neon } from "@neondatabase/serverless";

import { serverEnv } from "@/lib/server-env";
import * as schema from "./schema";

const sql = neon(serverEnv.DATABASE_URL);
export const db = drizzle(sql, { schema });
