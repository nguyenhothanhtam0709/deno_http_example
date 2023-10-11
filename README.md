# Overview

Simple http server built with Deno, Hono, Drizzle ORM & Postgres


### Script
```bash
# Create postgres docker
docker run --name deno-postgres -e POSTGRES_USER=postgres123 -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=deno_db -p 5432:5432 -d postgres:15.4-alpine3.18
```