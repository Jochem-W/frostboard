import { fetchGuild } from "@/utils/discord"
import { Variables } from "@/utils/variables"
import { CDNRoutes, ImageFormat, RouteBases } from "discord-api-types/v10"
import { ImageResponse } from "next/server"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"
export const revalidate = 60

export default async function Page() {
  const guild = await fetchGuild(Variables.guildId)

  const guildIcon = guild.icon
    ? `${RouteBases.cdn}/${CDNRoutes.guildIcon(
        guild.id,
        guild.icon,
        ImageFormat.PNG,
      )}?size=4096`
    : RouteBases.cdn + CDNRoutes.defaultUserAvatar(0)

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
