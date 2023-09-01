import Leaderboard from "@/components/Leaderboard"
import { selectUsers } from "@/utils/db"
import discord from "@/utils/discord"
import { avatarUrl } from "@/utils/user"
import { Variables } from "@/utils/variables"
import {
  Routes,
  RESTGetAPIGuildResult,
  ImageFormat,
} from "discord-api-types/v10"

export const dynamic = "force-dynamic"

export default async function Home() {
  const guild = (await discord.get(
    Routes.guild(Variables.guildId),
  )) as RESTGetAPIGuildResult

  const users = await selectUsers()

  return (
    <>
      <h1 className="hyphens-auto text-center text-7xl font-thin lowercase">
        {guild.name}
      </h1>
      <h2 className="hyphens-auto text-center text-4xl font-extralight lowercase">
        🏆 Leaderboard
      </h2>
      <Leaderboard
        users={users.map((user) => ({
          id: user.id,
          name: user.name,
          discriminator: user.discriminator,
          avatarUrl: avatarUrl(user, 32, ImageFormat.WebP),
          xp: user.xp,
        }))}
      ></Leaderboard>
    </>
  )
}
