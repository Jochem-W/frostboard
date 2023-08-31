import {
  APIUser,
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
  UserAvatarFormat,
} from "discord-api-types/v10"
import { ImageSize } from "@discordjs/rest"
import "server-only"

export function avatarUrl(
  user: Pick<APIUser, "avatar" | "id" | "discriminator">,
  size: ImageSize = 32,
  format?: UserAvatarFormat,
) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/${CDNRoutes.userAvatar(
      user.id,
      user.avatar,
      format ??
        (user.avatar?.startsWith("_") ? ImageFormat.GIF : ImageFormat.WebP),
    )}?size=${size}`
  }

  if (user.discriminator !== "0") {
    return `https://cdn.discordapp.com/${CDNRoutes.defaultUserAvatar(
      (parseInt(user.discriminator) % 5) as DefaultUserAvatarAssets,
    )}?size=${size}`
  }

  return `https://cdn.discordapp.com/${CDNRoutes.defaultUserAvatar(
    Number((BigInt(user.id) >> 22n) % 6n) as DefaultUserAvatarAssets,
  )}?size=${size}`
}
