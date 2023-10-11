/// <reference lib="deno.ns" />

import { injectable } from "inversify";
import { AbstractBaseService } from "./_base.service.ts";

type EnvConfig = {
	DATABASE_URL: string;
};

export const ConfigServiceToken = Symbol("ConfigService");

@injectable()
export class ConfigService extends AbstractBaseService {
	private readonly config: EnvConfig;

	constructor() {
		super();

		this.config = this.loadEnv();
	}

	private loadEnv(): EnvConfig {
		return Object.freeze({
			DATABASE_URL: Deno.env.get("DATABASE_URL") || "",
		});
	}

	public get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
		return this.config[key];
	}
}
