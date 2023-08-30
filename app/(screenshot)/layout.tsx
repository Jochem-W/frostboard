import { JetBrains_Mono } from "next/font/google"
import { ReactNode } from "react"
import "@/app/globals.css"

const mono = JetBrains_Mono({ subsets: ["latin"], weight: "variable" })

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={mono.className}>{children}</body>
    </html>
  )
}
