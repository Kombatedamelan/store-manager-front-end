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
import axios from "axios"

export default function LoginPage() {
  const router = useRouter()
  const { updateSettings, settings } = useSettings()
  const [adminPhone, setPhone] = useState("")
  const [adminPassword, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
   const [formData, setFormData] = useState({
      adminPhone: "",
      adminPassword: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation simple
    if (!adminPhone || !adminPassword) {
      setError("Veuillez remplir tous les champs")
      setIsLoading(false)
      return
    }

    // Vérifier les identifiants avec les paramètres
      try {
        
         // 1. appel POST /login
        const res = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminPhone, adminPassword }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Identifiants incorrects");
        }

        const loginData = await res.json();
        console.log("Login response:", loginData);

        const token = loginData.token;

        if (!token) throw new Error("Token manquant dans la réponse de login");
        // 2. Stockage du token
        localStorage.setItem("token", token);

        // 3. Récupérer les infos utilisateur
        const meRes = await fetch("http://127.0.0.1:8000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!meRes.ok) throw new Error("Impossible de récupérer les infos utilisateur");

        const user = await meRes.json();
        console.log("Utilisateur connecté", user);

        // 4. Mettre à jour le contexte
        updateSettings({
          storeName: user.storeName,
          storePhone: user.storePhone,
          storeAddress: user.storeAddress,
          currency: user.currency,
          primaryColor: "amber",
          adminPhone: user.adminPhone,
          adminPassword: "", // jamais stocker le mot de passe
        });
         
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } catch (err: any)  {
        console.log("Erreur de connexion:", err);
        setError("Numéro de téléphone ou mot de passe incorrect")
    }
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
                  value={adminPhone}
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
                  value={adminPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  
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
