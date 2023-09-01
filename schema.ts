import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  xp: integer("xp").notNull(),
  name: text("name").notNull(),
  discriminator: text("discriminator").notNull(),
  member: boolean("member").notNull(),
  avatar: text("avatar"),
})
