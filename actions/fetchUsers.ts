"use server"

import { usersTable } from "@/schema"
import { desc, asc, eq } from "drizzle-orm"
import orm from "../utils/orm"
import { avatarUrl } from "../utils/user"
import { ImageFormat } from "discord-api-types/v10"

export type User = Awaited<ReturnType<typeof fetchUsers>>[0]

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
    avatarUrl: avatarUrl(user, { animatedFormat: ImageFormat.PNG }),
    xp: user.xp,
    avatarFallback: avatarUrl({
      id: user.id,
      discriminator: user.discriminator,
      avatar: null,
    }),
  }))
}
