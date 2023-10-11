/// <reference lib="deno.ns" />

import {
	type ConfigService,
	ConfigServiceToken,
} from './services/config.service.ts';

import type { AbstractBaseController } from './controllers/_base.controller.ts';
import { DIContainer } from './container/mod.ts';
import { Hono } from 'hono/mod.ts';
import { controllers } from './controllers/mod.ts';
import { providers } from './services/mod.ts';

export class HttpApplication {
	private readonly di: DIContainer;
	private readonly app: Hono;

	constructor() {
		this.di = new DIContainer({
			providers,
			controllers,
		});
		this.app = new Hono();

		this.mapRoutes();
	}

	public mapRoutes() {
		this.app.get('/', (c) => c.text('Hello Hono!'));

		this.di.controllers.forEach((item) => {
			const controller = this.di.get<AbstractBaseController>(item.provide);
			controller.mapRoute();

			this.app.route(controller.path, controller.route);
		});
	}

	public listen(): void {
		const configService = this.di.get<ConfigService>(ConfigServiceToken);

		Deno.serve(
			{
				port: configService.get('API_PORT'),
			},
			this.app.fetch
		);
	}
}
