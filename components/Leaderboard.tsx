"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LeaderboardEntry from "./LeaderboardEntry"
import { levelForTotalXp, xpForLevelUp } from "@/utils/xp"
import fetchUsers from "@/actions/fetchUsers"

export default function Leaderboard({
  initial,
}: {
  initial: {
    id: string
    avatarUrl: string
    xp: number
    name: string
    discriminator: string
  }[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [observer, setObserver] = useState<IntersectionObserver>()
  const [users, setUsers] = useState<
    {
      id: string
      avatarUrl: string
      xp: number
      name: string
      discriminator: string
    }[]
  >(initial)

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) =>
      entries.find((entry) => entry.isIntersecting)
        ? fetchUsers(10, users.length)
            .then((value) => setUsers((prev) => [...prev, ...value]))
            .catch(console.error)
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

    const atLimit = current.children[Math.max(current.children.length - 10, 0)]
    if (atLimit) {
      observer.observe(atLimit)
    }

    const atEnd = current.children[current.children.length - 1]
    if (atEnd) {
      observer.observe(atEnd)
    }
    return () => {
      if (atLimit) {
        observer.unobserve(atLimit)
      }

      if (atEnd) {
        observer.unobserve(atEnd)
      }
    }
  }, [observer])

  return (
    <div className="flex w-full flex-col gap-4" ref={ref}>
      {users.map((user, i) => {
        const level = levelForTotalXp(user.xp)

        return (
          <LeaderboardEntry
            position={i + 1}
            user={user}
            key={user.id}
            level={level}
            xp={Math.floor(0.5 * xpForLevelUp(level))}
            xpMax={xpForLevelUp(level)}
          ></LeaderboardEntry>
        )
      })}
    </div>
  )
}
