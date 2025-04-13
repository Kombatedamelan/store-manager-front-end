"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  LogOut,
  Menu,
  X,
  ShoppingBag,
  PlusCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSettings } from "@/contexts/settings-context"
import { TruncateText } from "@/components/truncate-text"

const routes = [
  {
    label: "Tableau de Bord",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Produits",
    icon: Package,
    href: "/products",
  },
  {
    label: "Ventes",
    icon: ShoppingCart,
    href: "/sales",
  },
  {
    label: "Nouvelle Vente",
    icon: PlusCircle,
    href: "/sales/new",
  },
  {
    label: "Achats",
    icon: ShoppingBag,
    href: "/purchases",
  },
  {
    label: "Nouvel Achat",
    icon: PlusCircle,
    href: "/purchases/new",
  },
  {
    label: "Historique Ventes",
    icon: TrendingUp,
    href: "/history/sales",
  },
  {
    label: "Historique Achats",
    icon: TrendingDown,
    href: "/history/purchases",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { settings } = useSettings()

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-10">
          <Button variant="outline" size="icon" className="border-2 border-amber-800">
            <Menu className="h-5 w-5 text-amber-800" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-amber-100 border-r-2 border-amber-800">
          <div className="flex flex-col h-full">
            <div className="px-3 py-4 border-b-2 border-amber-800 bg-amber-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-white">
                  <TruncateText text={settings.storeName} maxLength={15} />
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)} className="text-white">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="flex flex-col gap-1 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors border-2",
                      pathname === route.href
                        ? "bg-amber-800 text-white border-amber-900"
                        : "text-amber-900 border-amber-300 hover:bg-amber-200",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto border-t-2 border-amber-800 p-3">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-2 border-amber-800 text-amber-900 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:block md:w-64 md:fixed md:inset-y-0 z-10 border-r-2 border-amber-800 bg-amber-100 shadow-md">
        <div className="flex flex-col h-full">
          <div className="px-4 py-5 bg-amber-800 text-white">
            <h1 className="text-xl font-bold">
              <TruncateText text={settings.storeName} maxLength={18} />
            </h1>
          </div>
          <div className="flex-1 overflow-y-auto pt-2 pb-4">
            <nav className="mt-2 px-2 space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors border-2",
                    pathname === route.href
                      ? "bg-amber-800 text-white border-amber-900"
                      : "text-amber-900 border-amber-300 hover:bg-amber-200",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t-2 border-amber-800">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-2 border-amber-800 text-amber-900 font-medium"
              >
                <LogOut className="h-5 w-5" />
                Déconnexion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
