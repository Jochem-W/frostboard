import LeaderboardEntry from "./LeaderboardEntry"
import { selectUsers } from "@/utils/db"
import { levelForTotalXp, totalXpForLevel, xpForLevelUp } from "@/utils/xp"

export default async function Leaderboard() {
  const users = await selectUsers()

  return (
    <div className="flex w-full flex-col gap-4">
      {users.map((user, i) => {
        const level = levelForTotalXp(user.xp)
        user.xp -= totalXpForLevel(level)

        return (
          <LeaderboardEntry
            position={i + 1}
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
