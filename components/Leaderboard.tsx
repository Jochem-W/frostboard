"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LeaderboardEntry from "./LeaderboardEntry"
import { levelForTotalXp, xpForLevelUp } from "@/utils/xp"
import fetchUsers, { User } from "@/actions/fetchUsers"

const limit = 10

export default function Leaderboard({ initial }: { initial: User[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [observer, setObserver] = useState<IntersectionObserver>()
  const [users, setUsers] = useState(initial)
  const [offset, setOffset] = useState(initial.length)

  useEffect(() => {
    fetchUsers(limit, offset)
      .then((value) => setUsers((prev) => [...prev, ...value]))
      .catch(console.error)
  }, [offset])

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!entries.find((entry) => entry.isIntersecting)) {
        return
      }

      setOffset((prev) => prev + limit)
    },
    [],
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

    const atOffset = current.children[users.length - limit]
    if (atOffset) {
      observer.observe(atOffset)
    }

    const atEnd = current.children[users.length - 1]
    if (atEnd) {
      observer.observe(atEnd)
    }

    return () => {
      if (atOffset) {
        observer.unobserve(atOffset)
      }

      if (atEnd) {
        observer.unobserve(atEnd)
      }
    }
  }, [observer, users.length])

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
            xp={user.xp}
            xpMax={xpForLevelUp(level)}
          ></LeaderboardEntry>
        )
      })}
    </div>
  )
}
