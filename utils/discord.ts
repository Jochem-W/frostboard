import {
  RESTGetAPIGuildResult,
  RouteBases,
  Routes,
} from "discord-api-types/v10"
import { Variables } from "./variables"
import "server-only"

export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096

export async function fetchGuild(
  ...params: Parameters<(typeof Routes)["guild"]>
) {
  const response = await fetch(RouteBases.api + Routes.guild(...params), {
    headers: { Authorization: `Bot ${Variables.botToken}` },
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error("Couldn't fetch the guild")
  }

  console.log(JSON.stringify(Object.fromEntries(response.headers.entries())))

  const json = await response.json()
  return json as RESTGetAPIGuildResult
}
