"use client"

import Image from "next/image"
import { CSSProperties } from "react"

export default function LeaderboardEntry({
  user,
  position,
  xp,
  xpMax,
  level,
}: {
  user: {
    id: string
    discriminator: string
    name: string
    avatarUrl: string
  }
  position: number
  xp: number
  xpMax: number
  level: number
}) {
  let colour
  switch (position) {
    case 1:
      colour =
        "from-amber-400 to-yellow-400 dark:from-amber-500 dark:to-yellow-500"
      break
    case 2:
      colour =
        "from-neutral-400 to-neutral-400 dark:from-neutral-500 dark:to-neutral-500"
      break
    case 3:
      colour =
        "from-brown-500 to-brown-500 dark:from-brown-900 dark:to-brown-900"
      break
    default:
      colour = "from-blue-300 to-cyan-300 dark:from-blue-500 dark:to-cyan-500"
  }

  return (
    <section
      className={`${colour} relative flex w-full gap-4 overflow-hidden break-words border border-neutral-200 bg-gradient-to-r px-2 py-4 text-2xl font-extralight before:absolute before:right-0 before:top-0 before:h-full before:w-[--width] before:bg-neutral-100 dark:border-neutral-700 before:dark:bg-neutral-800 sm:text-3xl`}
      style={{ "--width": `${100 - 100 * (xp / xpMax)}%` } as CSSProperties}
    >
      <span className="z-10 flex items-center">#{position}</span>
      <section className="z-10 flex grow flex-col justify-center gap-2 p-2">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <section className="flex items-center gap-4">
            <Image
              src={user.avatarUrl}
              width={48}
              height={48}
              alt="Avatar"
              className="shrink-0 rounded-full"
            ></Image>
            <span className="break-all">{user.name}</span>
          </section>
          <span>level {level}</span>
        </header>
        <span className="text-sm sm:text-lg">
          <span className="text-3xl font-bold sm:text-7xl">{xp}</span>
          <wbr></wbr>/{xpMax} xp
        </span>
      </section>
    </section>
  )
}
