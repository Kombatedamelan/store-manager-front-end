import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import RootLayoutContent from "./RootLayoutContent"

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Système de Gestion de Boutique",
  description: "Gérez votre inventaire, vos ventes et vos achats",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={poppins.className}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  )
}


import './globals.css'