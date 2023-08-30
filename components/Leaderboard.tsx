import { RESTGetAPIUserResult, Routes } from "discord-api-types/v10"
import LeaderboardEntry from "./LeaderboardEntry"
import discord from "@/utils/discord"
import { selectUsers } from "@/utils/db"

export default async function Leaderboard() {
  const dbResult = await selectUsers(50)

  const users = []
  for (const entry of dbResult) {
    const discordUser = (await discord.get(
      Routes.user(entry.user.id),
    )) as RESTGetAPIUserResult
    users.push({ ...entry.user, ...discordUser, position: entry.position })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {users.map((user) => (
        <LeaderboardEntry
          position={user.position}
          user={user}
          key={user.id}
          level={user.xp}
          xp={user.xp}
          xpMax={12 * user.level + 33}
        ></LeaderboardEntry>
      ))}
    </div>
  )
}
