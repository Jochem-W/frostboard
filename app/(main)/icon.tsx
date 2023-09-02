import discord from "@/utils/discord"
import { Variables } from "@/utils/variables"
import {
  Routes,
  RESTGetAPIGuildResult,
  CDNRoutes,
  ImageFormat,
} from "discord-api-types/v10"
import { ImageResponse } from "next/server"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"
export const revalidate = 24 * 60 * 60

export default async function Page() {
  const guild = (await discord.get(
    Routes.guild(Variables.guildId),
  )) as RESTGetAPIGuildResult

  const guildIcon = guild.icon
    ? `https://cdn.discordapp.com/${CDNRoutes.guildIcon(
        guild.id,
        guild.icon,
        ImageFormat.PNG,
      )}?size=4096`
    : "https://cdn.discordapp.com/embed/avatars/0.png"

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={`${guild.name} icon`}
        src={guildIcon}
        {...size}
        style={{ borderRadius: "100%" }}
      ></img>
    ),
    {
      ...size,
    },
  )
}
