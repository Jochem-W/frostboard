import { avatarUrl } from "@/utils/user"
import { APIUser, ImageFormat } from "discord-api-types/v10"
import Image from "next/image"
import { CSSProperties } from "react"

export default function LeaderboardCard({
  user,
  position,
  xp,
  xpMax,
  level,
}: {
  user: Pick<
    APIUser,
    "avatar" | "global_name" | "username" | "id" | "discriminator"
  >
  position: number
  xp: number
  xpMax: number
  level: number
}) {
  return (
    <main
      className="relative flex h-[384px] w-[1025px] flex-col bg-gradient-to-r from-blue-500  to-cyan-500 text-5xl font-extralight text-white before:absolute before:right-0 before:top-0 before:h-full before:w-[--width] before:bg-neutral-800"
      style={{ "--width": `${100 - 100 * (xp / xpMax)}%` } as CSSProperties}
    >
      <header className="z-10 flex items-center justify-between gap-8 bg-neutral-900 p-4">
        <span>#{position}</span>
        <section className="flex min-w-0 grow basis-0 items-center gap-4">
          <Image
            src={avatarUrl(user, 128, ImageFormat.WebP)}
            width={80}
            height={80}
            alt="Avatar"
            className="rounded-full"
            unoptimized={true}
            priority={true}
            loading={"eager"}
          ></Image>
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {user.global_name ?? user.username}
          </h1>
        </section>
        <span className="lowercase">Level {level}</span>
      </header>
      <section className="z-10 flex grow items-center justify-center">
        <span>
          <span className="text-9xl font-bold">{xp}</span>/{xpMax} xp
        </span>
      </section>
    </main>
  )
}
