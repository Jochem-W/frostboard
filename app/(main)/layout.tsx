import "@/app/globals.css"
import { Rubik } from "next/font/google"

const mono = Rubik({ subsets: ["latin"], weight: "variable" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${mono.className} flex min-h-[100svh] w-full flex-col items-center p-4 dark:bg-neutral-900`}
      >
        <div className="container">
          <header className="flex"></header>
          <main className="flex flex-col items-center gap-4">{children}</main>
          <footer className="flex"></footer>
        </div>
      </body>
    </html>
  )
}
