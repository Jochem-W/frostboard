"use server"

import { usersTable } from "@/schema"
import { ImageFormat } from "discord-api-types/v10"
import { desc, asc, eq } from "drizzle-orm"
import orm from "../utils/orm"
import { avatarUrl } from "../utils/user"

export default async function fetchUsers(limit: number, offset: number) {
  const result = await orm
    .select()
    .from(usersTable)
    .orderBy(desc(usersTable.xp), asc(usersTable.id))
    .where(eq(usersTable.member, true))
    .limit(limit)
    .offset(offset)

  return result.map((user) => ({
    id: user.id,
    name: user.name,
    discriminator: user.discriminator,
    avatarUrl: avatarUrl(user, 64, ImageFormat.WebP),
    xp: user.xp,
  }))
}
