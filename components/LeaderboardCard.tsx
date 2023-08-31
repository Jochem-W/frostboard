import { avatarUrl } from "@/utils/user"
import { APIUser } from "discord-api-types/v10"
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
    <div
      className="relative flex h-[480px] w-[1120px] flex-col bg-gradient-to-r from-blue-500  to-cyan-500 text-4xl font-thin text-white before:absolute before:right-0 before:top-0 before:h-full before:w-[--width] before:bg-neutral-800"
      style={{ "--width": `${100 - 100 * (xp / xpMax)}%` } as CSSProperties}
    >
      <div className="absolute left-0 top-0 flex w-full items-center justify-between gap-6 bg-black bg-opacity-25 p-4">
        <span>#{position}</span>
        <div className="flex min-w-0 grow basis-0 items-center gap-4">
          <Image
            src={avatarUrl(user, 64)}
            width={64}
            height={64}
            alt="Avatar"
            className="shrink-0 rounded-full"
            unoptimized={true}
          ></Image>
          <h1 className="grow overflow-hidden text-ellipsis whitespace-nowrap">
            {user.global_name ?? user.username}
          </h1>
        </div>
        <span className="lowercase">Level {level}</span>
      </div>
      <div className="z-10 flex h-full w-full grow items-center justify-center">
        <span>
          <span className="text-8xl font-bold">{xp}</span>/{xpMax} xp
        </span>
      </div>
    </div>
  )
}
