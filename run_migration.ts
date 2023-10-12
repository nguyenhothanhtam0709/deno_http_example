import 'dotenv/config';

import { MIGRATION_DIR } from './constant';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function main() {
	const migrationClient = postgres(process.env.DATABASE_URL ?? '', { max: 1 });
	await migrate(drizzle(migrationClient), {
		migrationsFolder: MIGRATION_DIR,
		migrationsTable: '__drizzle_migration__',
	});
	console.log('COMPLETE');
	process.exit(0);
}

main();
