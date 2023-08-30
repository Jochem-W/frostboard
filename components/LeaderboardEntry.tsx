import { avatarUrl } from "@/utils/user"
import { APIUser } from "discord-api-types/v10"
import Image from "next/image"
import { CSSProperties } from "react"

export default function LeaderboardEntry({
  user,
  position,
  xp,
  xpMax,
  level,
}: {
  user: APIUser
  position: string
  xp: number
  xpMax: number
  level: number
}) {
  let colour
  switch (position) {
    case "1":
      colour =
        "from-amber-400 to-yellow-400 dark:from-amber-500 dark:to-yellow-500"
      break
    case "2":
      colour =
        "from-neutral-400 to-neutral-400 dark:from-neutral-500 dark:to-neutral-500"
      break
    case "3":
      colour =
        "from-brown-500 to-brown-500 dark:from-brown-900 dark:to-brown-900"
      break
    default:
      colour = "from-blue-300 to-cyan-300 dark:from-blue-500 dark:to-cyan-500"
  }

  return (
    <div
      className={`${colour} relative flex w-full gap-4 overflow-hidden break-words border border-neutral-200 bg-gradient-to-r px-2 py-4 font-extralight before:absolute before:right-0 before:top-0 before:h-full before:w-[--width] before:bg-neutral-100 dark:border-neutral-700 before:dark:bg-neutral-800`}
      style={{ "--width": `${100 - 100 * (xp / xpMax)}%` } as CSSProperties}
    >
      <span className="z-10 flex items-center text-3xl">#{position}</span>
      <div className="z-10 flex grow flex-col justify-center gap-2 p-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={avatarUrl(user)}
              width={32}
              height={32}
              alt="Avatar"
              className="shrink-0 rounded-full"
            ></Image>
            <span className="break-all">
              {user.global_name ?? user.username}
            </span>
          </div>
          <span>level {level}</span>
        </div>
        <span className="text-sm">
          <span className="text-4xl font-bold">{xp}</span>
          <wbr></wbr>/{xpMax} xp
        </span>
      </div>
    </div>
  )
}
