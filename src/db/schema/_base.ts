import { timestamp } from "drizzle-orm/pg-core";

export const baseTable = {
	createdAt: timestamp("created_at", {
		precision: 3,
		withTimezone: false,
	}).defaultNow(),
	updatedAt: timestamp("updated_at", {
		precision: 3,
		withTimezone: false,
	}).$defaultFn(() => new Date()),
};
