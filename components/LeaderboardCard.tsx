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
      className="relative flex h-[512px] w-[1025px] flex-col bg-gradient-to-r from-blue-500  to-cyan-500 text-5xl font-thin text-white before:absolute before:right-0 before:top-0 before:h-full before:w-[--width] before:bg-neutral-800"
      style={{ "--width": `${100 - 100 * (xp / xpMax)}%` } as CSSProperties}
    >
      <header className="absolute left-0 top-0 flex w-full items-center justify-between gap-8 bg-black bg-opacity-30 p-4">
        <span>#{position}</span>
        <section className="flex min-w-0 grow basis-0 items-center gap-4">
          <Image
            src={avatarUrl(user, 128, ImageFormat.WebP)}
            width={80}
            height={80}
            alt="Avatar"
            className="shrink-0 rounded-full"
            unoptimized={true}
            priority={true}
            loading={"eager"}
          ></Image>
          <h1 className="grow overflow-hidden text-ellipsis whitespace-nowrap">
            {user.global_name ?? user.username}
          </h1>
        </section>
        <span className="lowercase">Level {level}</span>
      </header>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-9xl font-bold">{xp}</span>/{xpMax} xp
      </span>
    </main>
  )
}
