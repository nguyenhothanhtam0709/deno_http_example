/// <reference lib="deno.ns" />

import "reflect-metadata";
import { DIContainer } from "./container/mod.ts";
import {
	DatabaseService,
	DatabaseServiceToken,
} from "./services/database.service.ts";
import { providers } from "./services/mod.ts";

function main() {
	const container = new DIContainer({
		providers,
	});
	const service = container.get<DatabaseService>(DatabaseServiceToken);
	console.log(service.abc());
}

if (import.meta.main) {
	main();
}
