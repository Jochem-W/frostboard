import LeaderboardCard from "@/components/LeaderboardCard"
import { usersTable } from "@/schema"
import discord from "@/utils/discord"
import orm from "@/utils/orm"
import { Routes, RESTGetAPIUserResult } from "discord-api-types/v10"
import { asc, desc } from "drizzle-orm"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"

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

async function select(id: string) {
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

const model = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  global_name: z.string().nullable().optional().default(null),
  avatar: z.string().nullable().optional().default(null),
})

export default async function Page({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: {
    global_name?: string
    username?: string
    avatar?: string
    discriminator?: string
  }
}) {
  const parsed = await model.safeParseAsync({
    ...searchParams,
    id: params.userId,
  })

  let user
  let allowInsert = false
  if (parsed.success) {
    user = parsed.data
  } else {
    user = (await discord.get(
      Routes.user(params.userId),
    )) as RESTGetAPIUserResult
    allowInsert = true
  }

  let dbResult = await select(params.userId)
  if (!dbResult) {
    if (allowInsert) {
      await orm.insert(usersTable).values({ id: params.userId })
      dbResult = await select(params.userId)
    } else {
      user = (await discord.get(
        Routes.user(params.userId),
      )) as RESTGetAPIUserResult
      await orm.insert(usersTable).values({ id: params.userId })
      dbResult = await select(params.userId)
    }

    if (!dbResult) {
      throw new Error()
    }
  }

  return (
    <LeaderboardCard
      user={user}
      position={dbResult.position}
      xp={dbResult.user.xp}
      xpMax={12 * dbResult.user.level + 33}
      level={dbResult.user.level}
    ></LeaderboardCard>
  )
}
