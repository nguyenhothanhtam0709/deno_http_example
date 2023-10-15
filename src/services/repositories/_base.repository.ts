import type {
	PgInsertValue,
	PgTableWithColumns,
	PgUpdateSetSource,
	TableConfig,
} from 'drizzle-orm/pg-core';

import { AbstractBaseService } from '../_base.service.ts';
import type { DatabaseService } from '../database.service.ts';
import type { GetColumnData } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';

export class BaseRepository<
	TTableConfig extends TableConfig,
	TTable extends PgTableWithColumns<TTableConfig>,
	TTableKey extends keyof TTableConfig['columns'] = keyof TTableConfig['columns']
> extends AbstractBaseService {
	protected readonly db: PostgresJsDatabase;

	constructor(
		protected readonly databaseService: DatabaseService,
		protected readonly table: TTable
	) {
		super();

		this.db = this.databaseService.db;
	}

	public async insert(
		data: PgInsertValue<TTable>
	): Promise<TTable['$inferInsert']> {
		const result = await this.db.insert(this.table).values(data).returning();
		return result.at(0) as TTable['$inferInsert'];
	}

	public async insertMany(data: Array<PgInsertValue<TTable>>) {
		const result = await this.db.insert(this.table).values(data).returning();
		return result as Array<TTable['$inferInsert']>;
	}

	public findOneById<TSelectedKeys extends Array<TTableKey>>(
		id: GetColumnData<TTableConfig['columns']['id']>,
		select?: TSelectedKeys
	) {
		return this.findOneBy('id' as TTableKey, id, select);
	}

	public async findOneBy<
		TColumn extends TTableKey,
		TSelectedKeys extends Array<TTableKey>,
		TReturnKeys extends TSelectedKeys extends Iterable<infer E> ? E : TTableKey
	>(
		key: TColumn,
		value: GetColumnData<TTableConfig['columns'][TColumn]>,
		select?: TSelectedKeys
	): Promise<
		| {
				[K in TReturnKeys]: GetColumnData<TTableConfig['columns'][K]>;
		  }
		| undefined
	> {
		const selectQuery = select?.length
			? this.db.select(
					Object.fromEntries(select.map((k) => [k, this.table[k]]))
			  )
			: this.db.select();

		const arr = await selectQuery
			.from(this.table)
			.where(eq(this.table[key], value))
			.limit(1);

		// deno-lint-ignore ban-ts-comment
		// @ts-ignore
		return arr[0];
	}

	public findBy<
		TColumn extends TTableKey,
		TSelectedKeys extends Array<TTableKey>,
		TReturnKeys extends TSelectedKeys extends Iterable<infer E> ? E : TTableKey
	>(
		key: TColumn,
		value: GetColumnData<TTableConfig['columns'][TColumn]>,
		options?: {
			select?: TSelectedKeys;
			skip?: number;
			limit?: number;
		}
	): Promise<
		Array<{
			[K in TReturnKeys]: GetColumnData<TTableConfig['columns'][K]>;
		}>
	> {
		// deno-lint-ignore no-explicit-any
		let selectQuery: any = options?.select?.length
			? this.db.select(
					Object.fromEntries(options.select.map((k) => [k, this.table[k]]))
			  )
			: this.db.select();

		selectQuery = selectQuery
			.from(this.table)
			.where(eq(this.table[key], value));

		if (options?.skip) {
			selectQuery.offset(options.skip);
		}
		if (options?.limit) {
			selectQuery.limit(options.limit);
		}

		// deno-lint-ignore ban-ts-comment
		// @ts-ignore
		return selectQuery;
	}

	/**
	 * create select query
	 */
	public select<
		TSelectedKeys extends Array<TTableKey>,
		TReturnKeys extends TSelectedKeys extends Iterable<infer E> ? E : TTableKey
	>(selectedFields?: TSelectedKeys) {
		return selectedFields?.length
			? this.db
					.select(
						Object.fromEntries(
							selectedFields.map((k) => [k, this.table[k]])
						) as unknown as {
							[Key in TReturnKeys]: TTable[Key];
						}
					)
					.from(this.table)
			: this.db.select().from(this.table);
	}

	public async updateById(
		id: GetColumnData<TTableConfig['columns']['id']>,
		data: PgUpdateSetSource<TTable>
	) {
		const result = await this.db
			.update(this.table)
			.set(data)
			.where(eq(this.table['id'], id))
			.returning();
		return result[0] as TTable['$inferInsert'] | undefined;
	}

	public async updateBy<TColumn extends TTableKey>(
		key: TColumn,
		value: GetColumnData<TTableConfig['columns'][TColumn]>,
		data: PgUpdateSetSource<TTable>
	) {
		const result = await this.db
			.update(this.table)
			.set(data)
			.where(eq(this.table[key], value));
		return result.columns;
	}

	public async deleteById(id: GetColumnData<TTableConfig['columns']['id']>) {
		const result = await this.db
			.delete(this.table)
			.where(eq(this.table['id'], id));

		return !!result.count;
	}

	public async deleteBy<TColumn extends TTableKey>(
		key: TColumn,
		value: GetColumnData<TTableConfig['columns'][TColumn]>
	) {
		const result = await this.db
			.delete(this.table)
			.where(eq(this.table[key], value));

		return result.columns;
	}
}
