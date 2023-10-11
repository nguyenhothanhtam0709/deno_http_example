/// <reference lib="deno.ns" />

import { Container } from "inversify";
import type {
	ControllerProvider,
	DIContainerParams,
	Provider,
	ServiceIdentifier,
} from "./types.ts";
import { InjectScope } from "./enum.ts";

export class DIContainer {
	public readonly container: Container;

	public readonly providers: Array<Provider>;
	public readonly controllers: Array<ControllerProvider>;

	constructor({ providers = [], controllers = [] }: DIContainerParams) {
		this.container = new Container();
		this.providers = providers;
		this.controllers = controllers;

		this.initContainer();
	}

	private initContainer() {
		this.registerAllServices();
		this.registerAllController();
	}

	private registerAllServices() {
		this.providers.forEach((provider) => {
			switch (provider.scope) {
				case InjectScope.TRANSIENT:
					this.container
						.bind(provider.provide)
						.to(provider.useClass)
						.inTransientScope();
					break;
				case InjectScope.REQUEST:
					this.container
						.bind(provider.provide)
						.to(provider.useClass)
						.inRequestScope();
					break;
				default:
					this.container
						.bind(provider.provide)
						.to(provider.useClass)
						.inSingletonScope();
					break;
			}
		});
	}

	private registerAllController() {
		this.controllers.forEach((provider) => {
			switch (provider.scope) {
				case InjectScope.TRANSIENT:
					this.container
						.bind(provider.provide)
						.to(provider.useClass)
						.inTransientScope();
					break;
				case InjectScope.REQUEST:
					this.container
						.bind(provider.provide)
						.to(provider.useClass)
						.inRequestScope();
					break;
				default:
					this.container
						.bind(provider.provide)
						.to(provider.useClass)
						.inSingletonScope();
					break;
			}
		});
	}

	public get<T>(serviceIdentifier: ServiceIdentifier<T>): T {
		return this.container.get<T>(serviceIdentifier);
	}
}
