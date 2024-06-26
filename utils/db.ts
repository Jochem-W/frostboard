import { usersTable } from "@/schema"
import { eq } from "drizzle-orm"
import orm from "./orm"
import { sql, desc, asc } from "drizzle-orm"
import "server-only"

const position = sql<string>`row_number() OVER (ORDER BY ${desc(
  usersTable.xp,
)}, ${asc(usersTable.id)})`.as("position")

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
    .select()
    .from(usersTable)
    .orderBy(desc(usersTable.xp), asc(usersTable.id))
    .where(eq(usersTable.member, true))

  if (limit) {
    return await query.limit(limit)
  }

  return await query
}
