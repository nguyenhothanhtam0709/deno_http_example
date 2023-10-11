/// <reference lib="deno.ns" />

import 'reflect-metadata';

import { HttpApplication } from './server.ts';

function main() {
	const httpApp = new HttpApplication();
	httpApp.listen();
}

if (import.meta.main) {
	main();
}
