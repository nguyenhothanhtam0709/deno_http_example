/// <reference lib="deno.ns" />

// import postgres from "postgresjs";
// import { drizzle } from "drizzle-orm/postgres-js";
import { inject, injectable } from "inversify";
import { type ConfigService, ConfigServiceToken } from "./config.service.ts";
import { AbstractBaseService } from "./_base.service.ts";

export const DatabaseServiceToken = Symbol("DatabaseService");

@injectable()
export class DatabaseService extends AbstractBaseService {
	constructor(
		@inject(ConfigServiceToken)
		private readonly configService: ConfigService
	) {
		super();
	}

	public abc() {
		return "123" + this.configService.get("DATABASE_URL");
	}
}
