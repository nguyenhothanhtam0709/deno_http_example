/// <reference lib="deno.ns" />

import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { inject, injectable } from "inversify";
import { type ConfigService, ConfigServiceToken } from "./config.service.ts";
import { AbstractBaseService } from "./_base.service.ts";

export const DatabaseServiceToken = Symbol("DatabaseService");

@injectable()
export class DatabaseService extends AbstractBaseService {
	private readonly client: PostgresJsDatabase;

	constructor(
		@inject(ConfigServiceToken)
		private readonly configService: ConfigService
	) {
		super();

		const queryClient = postgres(this.configService.get("DATABASE_URL"));
		this.client = drizzle(queryClient);
	}

	public get db() {
		return this.client;
	}
}
