import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
 schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});

// import { defineConfig } from 'drizzle-kit'
// export default defineConfig({
//  schema: "./schema.ts",
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
//   verbose: true,
//   strict: true,
// })