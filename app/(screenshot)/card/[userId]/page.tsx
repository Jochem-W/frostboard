import LeaderboardCard from "@/components/LeaderboardCard"
import { usersTable } from "@/schema"
import { selectUser } from "@/utils/db"
import discord from "@/utils/discord"
import orm from "@/utils/orm"
import { Routes, RESTGetAPIUserResult } from "discord-api-types/v10"
import { z } from "zod"

const model = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  global_name: z.string().nullable().optional().default(null),
  avatar: z.string().nullable().optional().default(null),
})

export const revalidate = 0

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

  let dbResult = await selectUser(params.userId)
  if (!dbResult) {
    if (allowInsert) {
      await orm.insert(usersTable).values({ id: params.userId })
      dbResult = await selectUser(params.userId)
    } else {
      user = (await discord.get(
        Routes.user(params.userId),
      )) as RESTGetAPIUserResult
      await orm.insert(usersTable).values({ id: params.userId })
      dbResult = await selectUser(params.userId)
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
