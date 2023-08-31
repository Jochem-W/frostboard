import { RESTGetAPIUserResult, Routes } from "discord-api-types/v10"
import LeaderboardEntry from "./LeaderboardEntry"
import discord from "@/utils/discord"
import { selectUsers } from "@/utils/db"
import { levelForTotalXp, totalXpForLevel, xpForLevelUp } from "@/utils/xp"

export default async function Leaderboard() {
  const dbResult = await selectUsers(1)

  const users = []
  for (const entry of dbResult) {
    const discordUser = (await discord.get(
      Routes.user(entry.id),
    )) as RESTGetAPIUserResult
    users.push({ ...entry, ...discordUser, position: users.length + 1 })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {users.map((user) => {
        const level = levelForTotalXp(user.xp)
        user.xp -= totalXpForLevel(level)

        return (
          <LeaderboardEntry
            position={user.position}
            user={user}
            key={user.id}
            level={level}
            xp={user.xp}
            xpMax={xpForLevelUp(level)}
          ></LeaderboardEntry>
        )
      })}
    </div>
  )
}
