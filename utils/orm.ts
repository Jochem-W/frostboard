import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { Variables } from "./variables"

function singleton() {
  return drizzle(postgres(Variables.databaseUrl))
}

type Singleton = ReturnType<typeof singleton>

const globalForSingleton = globalThis as unknown as {
  orm: Singleton | undefined
}

const orm = globalForSingleton.orm ?? singleton()

export default orm

if (process.env.NODE_ENV !== "production") {
  globalForSingleton.orm = orm
}
