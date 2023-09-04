import fetchUsers from "@/actions/fetchUsers"
import Leaderboard from "@/components/Leaderboard"
import { fetchGuild } from "@/utils/discord"
import { Variables } from "@/utils/variables"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const guild = await fetchGuild(Variables.guildId)

  return {
    title: `${guild.name} | Leaderboard`.toLowerCase(),
    description: `Leaderboard for the ${guild.name} Discord server.`,
  }
}

export default async function Home() {
  const guild = await fetchGuild(Variables.guildId)
  const users = await fetchUsers(50, 0)

  return (
    <>
      <h1 className="max-w-full hyphens-auto break-words text-center text-7xl font-thin lowercase">
        {guild.name}
      </h1>
      <h2 className="hyphens-auto break-words text-center text-4xl font-extralight lowercase">
        🏆 Leaderboard
      </h2>
      <Leaderboard initial={users}></Leaderboard>
    </>
  )
}
