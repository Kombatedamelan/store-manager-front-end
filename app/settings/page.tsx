"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSettings } from "@/contexts/settings-context"
import { Loader2, Save, RotateCcw, Store, User, Palette } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useEffect} from "react"
import axios from "axios"


export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ ...settings })
  const [store, setStore] = useState({
    storeName: "",
    storePhone: "",
    storeAddress: "",
    currency: "",
    adminPhone: "",
    adminPassword: "",
    logo: "",
    primaryColor: "",
  });
  

  
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/user/setting", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStore(res.data);
          setFormData(res.data);
          console.log("Données récupérées :", res.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    }
  }, [token]); // Dépendance sur 'token' pour relancer l'effet si nécessaire
  

  // console.log("Enregistrement avec :", formData) 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSave = () => {
    
    setIsLoading(true)

    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos modifications ont été enregistrées avec succès.",
        variant: "default",
      })
    }, 1000)
  }
  const handleUpdate = () => {
    setIsLoading(true)

    // Si le mot de passe n'est pas vide, alors on l'inclut dans la mise à jour.
    
  // Préparer les données à envoyer
  const updateData: any = {
    adminPhone: store.adminPhone,
    storeName: store.storeName,
    storePhone: store.storePhone,
    storeAddress: store.storeAddress,
    currency: store.currency,
    logo: store.logo,
    primaryColor: store.primaryColor,
  };

  // Ajouter le mot de passe uniquement s'il est modifié
  if (store.adminPassword && store.adminPassword !== "") {
    updateData.adminPassword = store.adminPassword; // Assure-toi que le mot de passe est bien celui que l'utilisateur veut envoyer
  }

  console.log("Données envoyées :", updateData);
  
    axios
      .put(
        "http://127.0.0.1:8000/api/user/setting",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Réponse du serveur :", response);
        toast({
          title: "Informations mises à jour",
          description: "Les informations de la boutique ont été modifiées avec succès.",
        });
      })
      .catch((error) => {
        console.error("Erreur de mise à jour :", error);
        toast({
          title: "Erreur",
          description: "Échec de la mise à jour des informations.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser tous les paramètres?")) {
      resetSettings()
      setFormData({ ...store })
      toast({
        title: "Paramètres réinitialisés",
        description: "Tous les paramètres ont été restaurés aux valeurs par défaut.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">PARAMÈTRES</h1>
      </div>

      <Tabs defaultValue="boutique" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-amber-100 border-2 border-amber-800">
          <TabsTrigger value="boutique" className="data-[state=active]:bg-amber-800 data-[state=active]:text-white">
            <Store className="mr-2 h-4 w-4" /> Boutique
          </TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-amber-800 data-[state=active]:text-white">
            <User className="mr-2 h-4 w-4" /> Administrateur
          </TabsTrigger>
          <TabsTrigger value="apparence" className="data-[state=active]:bg-amber-800 data-[state=active]:text-white">
            <Palette className="mr-2 h-4 w-4" /> Apparence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="boutique">
          <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
            <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
              <CardTitle>INFORMATIONS DE LA BOUTIQUE</CardTitle>
              <CardDescription className="text-amber-100">
                Personnalisez les informations de votre boutique
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="font-bold text-amber-900">
                    Nom de la Boutique
                  </Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={store.storeName}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="Nom de votre boutique"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storePhone" className="font-bold text-amber-900">
                    Téléphone
                  </Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={store.storePhone}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="Numéro de téléphone de la boutique"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeAddress" className="font-bold text-amber-900">
                    Adresse
                  </Label>
                  <Input
                    id="storeAddress"
                    name="storeAddress"
                    value={store.storeAddress}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="Adresse de la boutique"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="font-bold text-amber-900">
                    Devise
                  </Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={store.currency}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="Devise (ex: FCFA)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
            <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
              <CardTitle>COMPTE ADMINISTRATEUR</CardTitle>
              <CardDescription className="text-amber-100">
                Modifiez les informations de connexion de l'administrateur
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="adminPhone" className="font-bold text-amber-900">
                    Téléphone Administrateur
                  </Label>
                  <Input
                    id="adminPhone"
                    name="adminPhone"
                    value={store.adminPhone}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="Numéro de téléphone pour la connexion"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword" className="font-bold text-amber-900">
                    Mot de Passe
                  </Label>
                  <Input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    value={store.adminPassword ? "":""}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="Mot de passe pour la connexion"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apparence">
          <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
            <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
              <CardTitle>APPARENCE</CardTitle>
              <CardDescription className="text-amber-100">
                Personnalisez l'apparence de votre application
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="font-bold text-amber-900">
                    Couleur Principale
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      value={store.primaryColor}
                      onChange={handleChange}
                      className="border-2 border-amber-800 bg-white text-amber-900"
                      placeholder="Couleur (ex: amber)"
                    />
                    <div
                      className={`w-10 h-10 rounded-md border-2 border-amber-800 bg-${store.primaryColor}-800`}
                    ></div>
                  </div>
                  <p className="text-xs text-amber-700">
                    Options: amber, blue, green, red, purple, orange, teal, indigo
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo" className="font-bold text-amber-900">
                    Logo (URL)
                  </Label>
                  <Input
                    id="logo"
                    name="logo"
                    value={store.logo || ""}
                    onChange={handleChange}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="URL du logo (optionnel)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-2 border-amber-800 text-amber-900 hover:bg-amber-200"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Réinitialiser
        </Button>
        <Button
          onClick={handleUpdate}
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
      </div>
    </div>
  )
}
