"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LeaderboardEntry from "./LeaderboardEntry"
import { levelForTotalXp, totalXpForLevel, xpForLevelUp } from "@/utils/xp"

export default function Leaderboard({
  users,
}: {
  users: {
    id: string
    avatarUrl: string
    xp: number
    name: string
    discriminator: string
  }[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [observer, setObserver] = useState<IntersectionObserver>()
  const [limit, setLimit] = useState(25)

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) =>
      entries.find((entry) => entry.isIntersecting)
        ? setLimit((prev) => Math.min(prev + 25, users.length))
        : null,
    [users.length],
  )

  useEffect(
    () =>
      setObserver((prev) => {
        prev?.disconnect()
        return new IntersectionObserver(intersectionCallback)
      }),
    [intersectionCallback],
  )

  useEffect(() => {
    const current = ref.current
    if (!current) {
      return
    }

    if (!observer) {
      return
    }

    const atLimit = current.children[limit - 5]
    const atEnd = current.children[current.children.length - 1]
    if (!atLimit || !atEnd) {
      return
    }

    observer.observe(atLimit)
    observer.observe(atEnd)
    return () => {
      observer.unobserve(atLimit)
      observer.unobserve(atEnd)
    }
  }, [limit, observer])

  return (
    <div className="flex w-full flex-col gap-4" ref={ref}>
      {users.slice(0, limit).map((user, i) => {
        const level = levelForTotalXp(user.xp)
        user.xp -= totalXpForLevel(level)

        return (
          <LeaderboardEntry
            position={i + 1}
            user={user}
            key={user.id}
            level={level}
            xp={user.xp}
            xpMax={xpForLevelUp(level)}
          ></LeaderboardEntry>
        )
      })}
    </div>
  )
}
