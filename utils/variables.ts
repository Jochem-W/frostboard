import z from "zod"
import camelcaseKeys from "camelcase-keys"

const model = z
  .object({
    BOT_TOKEN: z.string(),
    GUILD_ID: z.string(),
    DATABASE_URL: z.string(),
  })
  .transform((arg) => camelcaseKeys(arg))

export const Variables = model.parse(process.env)
