"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const token = localStorage.getItem("token")

  const [adminPhone, setAdminPhone] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdminPhone(res.data.adminPhone || "")
      })
      .catch((err) => {
        console.error("Erreur chargement admin :", err)
      })
  }, [])

  const handleSave = () => {
    setIsLoading(true)

    axios
      .post(
        "http://127.0.0.1:8000/api/user/settings",
        {
          adminPhone,
          adminPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast({
          title: "Succès",
          description: "Informations mises à jour.",
        })
        setAdminPassword("") // Clear password field after update
      })
      .catch((err) => {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour les informations.",
          variant: "destructive",
        })
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>COMPTE ADMINISTRATEUR</CardTitle>
          <CardDescription className="text-amber-100">
            Modifiez les informations de connexion de l'administrateur
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="adminPhone" className="font-bold text-amber-900">
              Téléphone
            </Label>
            <Input
              id="adminPhone"
              value={adminPhone}
              onChange={(e) => setAdminPhone(e.target.value)}
              placeholder="Numéro de téléphone"
              className="border-2 border-amber-800 bg-white text-amber-900"
            />
          </div>

          <div>
            <Label htmlFor="adminPassword" className="font-bold text-amber-900">
              Nouveau mot de passe
            </Label>
            <Input
              id="adminPassword"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Mot de passe"
              className="border-2 border-amber-800 bg-white text-amber-900"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="gap-2 bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sauvegarde...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Enregistrer
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
