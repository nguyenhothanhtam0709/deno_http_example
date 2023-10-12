import 'dotenv/config';

import type { Config } from 'drizzle-kit';
import { MIGRATION_DIR } from './constant';

export default {
	schema: './src/db/schema/*',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL ?? '',
	},
	out: MIGRATION_DIR,
} satisfies Config;
