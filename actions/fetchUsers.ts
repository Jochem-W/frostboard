"use server"

import { usersTable } from "@/schema"
import { ImageFormat } from "discord-api-types/v10"
import { desc, asc, eq } from "drizzle-orm"
import orm from "../utils/orm"
import { avatarUrl } from "../utils/user"

export type User = Awaited<ReturnType<typeof fetchUsers>>[0]

export default async function fetchUsers(limit?: number, offset?: number) {
  let query = orm
    .select()
    .from(usersTable)
    .orderBy(desc(usersTable.xp), asc(usersTable.id))
    .where(eq(usersTable.member, true))

  if (limit) {
    query = query.limit(limit)
  }

  if (offset) {
    query = query.offset(offset)
  }

  const result = await query

  return result.map((user) => ({
    id: user.id,
    name: user.name,
    discriminator: user.discriminator,
    avatarUrl: avatarUrl(user, 64, ImageFormat.WebP),
    xp: user.xp,
    avatarFallback: avatarUrl(
      { id: user.id, discriminator: user.discriminator, avatar: null },
      64,
      ImageFormat.WebP,
    ),
  }))
}
