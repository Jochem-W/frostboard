import { usersTable } from "@/schema"
import { eq } from "drizzle-orm"
import orm from "./orm"
import { sql, desc, asc } from "drizzle-orm"

const position = sql<string>`row_number() OVER (ORDER BY ${desc(
  usersTable.level,
)}, ${desc(usersTable.xp)}, ${asc(usersTable.id)})`.as("position")

const userPosition = orm
  .select({
    id: usersTable.id,
    position,
  })
  .from(usersTable)
  .as("userPosition")

export async function selectUser(id: string) {
  const [user] = await orm
    .select({
      user: usersTable,
      position: userPosition.position,
    })
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .innerJoin(userPosition, eq(userPosition.id, id))
  return user ? user : null
}

export async function selectUsers(limit?: number) {
  const query = orm
    .select({
      user: usersTable,
      position: sql<string>`row_number() OVER ()`,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.level), desc(usersTable.xp), asc(usersTable.id))

  if (limit) {
    return await query.limit(limit)
  }

  return await query
}
