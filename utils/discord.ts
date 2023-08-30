import { REST } from "@discordjs/rest"
import { Variables } from "./variables"

function singleton() {
  //@ts-expect-error
  return new REST({ makeRequest: fetch }).setToken(Variables.botToken)
}

type Singleton = ReturnType<typeof singleton>

const globalForSingleton = globalThis as unknown as {
  discord: Singleton | undefined
}

const discord = globalForSingleton.discord ?? singleton()

export default discord

if (process.env.NODE_ENV !== "production") {
  globalForSingleton.discord = discord
}
