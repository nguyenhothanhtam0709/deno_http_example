import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

import { baseTable } from './_base.ts';

export const postTable = pgTable('posts', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 256 }).notNull().unique(),
	content: text('content'),
	...baseTable,
});

export type Post = typeof postTable.$inferSelect; // return type when queried
export type NewPost = typeof postTable.$inferInsert; // insert type
