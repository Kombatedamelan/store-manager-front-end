"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"
import { SettingsProvider } from "@/contexts/settings-context"

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/"

  return (
    <SettingsProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="flex flex-col md:flex-row min-h-screen bg-amber-50">
          {!isLoginPage && <Sidebar />}
          <main className={`flex-1 p-4 md:p-6 ${!isLoginPage ? "md:ml-64" : ""} w-full`}>{children}</main>
        </div>
      </ThemeProvider>
    </SettingsProvider>
  )
}

export default RootLayoutContent
