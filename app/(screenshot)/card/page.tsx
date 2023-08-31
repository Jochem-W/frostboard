import LeaderboardCard from "@/components/LeaderboardCard"
import { levelForTotalXp, totalXpForLevel, xpForLevel } from "@/utils/xp"
import { z } from "zod"

const model = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  xp: z.coerce.number(),
  position: z.coerce.number(),
  global_name: z.string().nullable().optional().default(null),
  avatar: z.string().nullable().optional().default(null),
})

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id?: string
    global_name?: string
    username?: string
    avatar?: string
    discriminator?: string
    xp?: string
    position?: string
  }
}) {
  const parsed = await model.parseAsync(searchParams)

  const level = levelForTotalXp(parsed.xp)
  const previousLevel = level - 1
  if (previousLevel >= 0) {
    parsed.xp -= totalXpForLevel(previousLevel)
  }

  return (
    <LeaderboardCard
      user={parsed}
      position={parsed.position}
      xp={parsed.xp}
      xpMax={xpForLevel(level)}
      level={level}
    ></LeaderboardCard>
  )
}
