// Prisma v7 config. Loaded automatically by the Prisma CLI.
// Prisma v7 does NOT auto-load .env files, so we load .env.local explicitly here.
import { config } from "dotenv";
config({ path: ".env" });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The Prisma CLI (migrate, db pull, studio) needs a direct/session connection.
    // Prisma v7 dropped directUrl, so we point url straight at Supabase's
    // session pooler (port 5432). The app itself connects through the transaction
    // pooler (DATABASE_URL, port 6543) via the driver adapter in src/lib/prisma.ts.
    url: env("DIRECT_URL"),
  },
});