"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Lock, Loader2 } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

export default function LoginPage() {
  const router = useRouter()
  const { settings } = useSettings()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation simple
    if (!phone || !password) {
      setError("Veuillez remplir tous les champs")
      setIsLoading(false)
      return
    }

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)

      // Vérifier les identifiants avec les paramètres
      if (phone === settings.adminPhone && password === settings.adminPassword) {
        router.push("/dashboard")
      } else {
        setError("Numéro de téléphone ou mot de passe incorrect")
      }
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <Card className="w-full max-w-md border-4 border-amber-800 shadow-xl bg-amber-100">
        <CardHeader className="space-y-1 bg-amber-800 text-white border-b-4 border-amber-900">
          <CardTitle className="text-3xl font-bold text-center">{settings.storeName}</CardTitle>
          <CardDescription className="text-center text-amber-100 text-lg">
            Entrez vos identifiants pour accéder à votre boutique
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-8">
            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-600 text-red-800 rounded-md text-center">{error}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xl font-bold text-amber-900">
                Numéro de Téléphone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-4 h-6 w-6 text-amber-800" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Entrez votre numéro"
                  className="pl-12 py-7 text-lg border-3 border-amber-800 bg-white text-amber-900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-amber-700">Démo: {settings.adminPhone}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xl font-bold text-amber-900">
                Mot de Passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-6 w-6 text-amber-800" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  className="pl-12 py-7 text-lg border-3 border-amber-800 bg-white text-amber-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-amber-700">Démo: {settings.adminPassword}</p>
            </div>
          </CardContent>
          <CardFooter className="pb-8">
            <Button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-900 text-xl py-7 font-bold border-2 border-amber-900"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" /> CONNEXION EN COURS...
                </div>
              ) : (
                "CONNEXION"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
