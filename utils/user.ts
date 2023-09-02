import {
  APIUser,
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
} from "discord-api-types/v10"
import "server-only"
import { ImageSize } from "./discord"

type Options = {
  format?: Exclude<ImageFormat, ImageFormat.GIF | ImageFormat.Lottie>
  animatedFormat?: Exclude<ImageFormat, ImageFormat.Lottie>
  size?: ImageSize
  animatedSizeOverride?: ImageSize
}

export function avatarUrl(
  user: Pick<APIUser, "avatar" | "id" | "discriminator">,
  options?: Options,
) {
  const format = options?.format ?? ImageFormat.PNG
  const animatedFormat = options?.animatedFormat ?? ImageFormat.GIF
  const size = options?.size ?? 4096
  const animatedSize = options?.animatedSizeOverride ?? options?.size

  const isAnimated = user.avatar?.startsWith("a_")

  if (user.avatar) {
    return `https://cdn.discordapp.com${CDNRoutes.userAvatar(
      user.id,
      user.avatar,
      isAnimated ? animatedFormat : format,
    )}?size=${isAnimated ? animatedSize : size}`
  }

  if (user.discriminator !== "0") {
    return `https://cdn.discordapp.com${CDNRoutes.defaultUserAvatar(
      (parseInt(user.discriminator) % 5) as DefaultUserAvatarAssets,
    )}`
  }

  return `https://cdn.discordapp.com${CDNRoutes.defaultUserAvatar(
    Number((BigInt(user.id) >> 22n) % 6n) as DefaultUserAvatarAssets,
  )}`
}
