import {
  APIUser,
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
} from "discord-api-types/v10"
import { ImageSize } from "@discordjs/rest"

export function avatarUrl(
  user: Pick<APIUser, "avatar" | "id" | "discriminator">,
  size: ImageSize = 32,
) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/${CDNRoutes.userAvatar(
      user.id,
      user.avatar,
      user.avatar.startsWith("a_") ? ImageFormat.GIF : ImageFormat.WebP,
    )}?size=${size}`
  }

  if (user.discriminator) {
    return `https://cdn.discordapp.com/${CDNRoutes.defaultUserAvatar(
      (parseInt(user.discriminator) % 5) as DefaultUserAvatarAssets,
    )}?size=${size}`
  }

  return `https://cdn.discordapp.com/${CDNRoutes.defaultUserAvatar(
    Number((BigInt(user.id) >> 22n) % 6n) as DefaultUserAvatarAssets,
  )}?size=${size}`
}
