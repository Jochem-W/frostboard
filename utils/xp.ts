const a = 12
const b = 33

export function xpForLevel(level: number) {
  return a * level + b
}

export function totalXpForLevel(level: number) {
  return (1 / 2) * a * level ** 2 + ((1 / 2) * a + b) * level + b
}

export function levelForTotalXp(xp: number) {
  return Math.floor(
    1 + (1 / a) * (Math.sqrt(2 * a * xp + (b - a / 2) ** 2) - (a / 2 + b)),
  )
}
