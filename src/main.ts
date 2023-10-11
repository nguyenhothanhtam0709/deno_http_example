/// <reference lib="deno.ns" />

import "reflect-metadata";
import { DIContainer } from "./container/mod.ts";
import {
	DatabaseService,
	DatabaseServiceToken,
} from "./services/database.service.ts";
import { providers } from "./services/mod.ts";
import { controllers } from "./controllers/mod.ts";

function main() {
	const container = new DIContainer({
		providers,
		controllers,
	});
	const dbService = container.get<DatabaseService>(DatabaseServiceToken);
	console.log(dbService.db);
}

if (import.meta.main) {
	main();
}
