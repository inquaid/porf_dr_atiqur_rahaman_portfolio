import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './src/db/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres.dscbuqfnenaiukympxjr:lOnKOimh3JKanvCD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
  },
  verbose: true,
  strict: true,
});
