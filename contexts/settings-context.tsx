"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types pour les paramètres de l'application
export interface AppSettings {
  storeName?: string
  storePhone?: string
  storeAddress?: string
  currency: string
  logo?: string
  primaryColor: string
  adminPhone: string
  adminPassword: string
}

// Valeurs par défaut
const defaultSettings: AppSettings = {
  storeName: "BOUTIQUE MANAGER",
  storePhone: "+228 12345678",
  storeAddress: "Lomé, Togo",
  currency: "FCFA",
  primaryColor: "amber",
  adminPhone: "12345678",
  adminPassword: "password",
}

// Interface du contexte
interface SettingsContextType {
  settings: AppSettings
  updateSettings: (newSettings: Partial<AppSettings>) => void
  resetSettings: () => void
}

// Création du contexte
const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Hook pour utiliser le contexte
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings doit être utilisé à l'intérieur d'un SettingsProvider")
  }
  return context
}

// Provider du contexte
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Charger les paramètres depuis le localStorage au démarrage
  useEffect(() => {
    const storedSettings = localStorage.getItem("appSettings")
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings)
        setSettings({ ...defaultSettings, ...parsedSettings })
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Sauvegarder les paramètres dans le localStorage à chaque modification
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("appSettings", JSON.stringify(settings))
    }
  }, [settings, isLoaded])

  // Mettre à jour les paramètres
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  // Réinitialiser les paramètres
  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>{children}</SettingsContext.Provider>
  )
}
