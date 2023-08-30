import Leaderboard from "@/components/Leaderboard"
import discord from "@/utils/discord"
import { Variables } from "@/utils/variables"
import { Routes, RESTGetAPIGuildResult } from "discord-api-types/v10"

export const dynamic = "force-dynamic"

export default async function Home() {
  const guild = (await discord.get(
    Routes.guild(Variables.guildId),
  )) as RESTGetAPIGuildResult

  return (
    <>
      <h1 className="hyphens-auto text-center text-7xl font-thin lowercase">
        {guild.name}
      </h1>
      <h2 className="hyphens-auto text-center text-4xl font-extralight lowercase">
        🏆 Leaderboard
      </h2>
      <Leaderboard></Leaderboard>
    </>
  )
}
