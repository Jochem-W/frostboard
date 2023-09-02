"use client"

import { useEffect, useRef, useState } from "react"
import LeaderboardEntry from "./LeaderboardEntry"
import { levelForTotalXp, totalXpForLevel, xpForLevelUp } from "@/utils/xp"
import fetchUsers, { User } from "@/actions/fetchUsers"

const fetchCount = 25

export default function Leaderboard({ initial }: { initial: User[] }) {
  const ref = useRef<HTMLElement>(null)
  const [observer, setObserver] = useState<IntersectionObserver>()
  const [users, setUsers] = useState(initial)
  const [offset, setOffset] = useState<number>()

  useEffect(() => {
    if (offset === undefined) {
      return
    }

    fetchUsers(fetchCount, offset)
      .then((value) => setUsers((prev) => [...prev, ...value]))
      .catch(console.error)
  }, [offset])

  useEffect(
    () =>
      setObserver((prev) => {
        prev?.disconnect()
        return new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            if (!entries.find((entry) => entry.isIntersecting)) {
              return
            }

            setOffset((prev) => (prev ?? initial.length) + fetchCount)
          },
        )
      }),
    [initial.length],
  )

  useEffect(() => {
    const current = ref.current
    if (!current) {
      return
    }

    if (!observer) {
      return
    }

    const atOffset =
      current.children[
        Math.max(users.length - fetchCount, Math.floor(users.length / 2))
      ]
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
    <section className="flex w-full flex-col items-center gap-4" ref={ref}>
      {users.map((user, i) => {
        const level = levelForTotalXp(user.xp)

        return (
          <LeaderboardEntry
            position={i + 1}
            user={user}
            key={user.id}
            level={level}
            xp={user.xp - totalXpForLevel(level)}
            xpMax={xpForLevelUp(level)}
          ></LeaderboardEntry>
        )
      })}
    </section>
  )
}
