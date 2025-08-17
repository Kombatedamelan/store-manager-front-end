"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Check, CreditCard, Banknote, Smartphone, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSettings } from "@/contexts/settings-context"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { settings } = useSettings()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [amountReceived, setAmountReceived] = useState("")
  const [change, setChange] = useState(0)
  const [error, setError] = useState("")
  const token = localStorage.getItem("token")

  // Get total amount from URL params
  const totalAmount = Number.parseFloat(searchParams.get("total") || "0")
  const customerName = searchParams.get("customer") || "Client"
  const customerPhone = searchParams.get("phone") || ""

  const rawProducts = searchParams.get("products");

  
let products = [];
if (rawProducts) {
  try {
    products = JSON.parse(rawProducts);
    console.log("Le tableau de produit:", products)
  } catch (e) {
    console.error("Erreur de parsing JSON :", e);
  }
}
    

  useEffect(() => {
    if (paymentMethod === "cash" && amountReceived) {
      const received = Number.parseFloat(amountReceived)
      if (received >= totalAmount) {
        setChange(received - totalAmount)
        setError("")
      } else {
        setChange(0)
        setError("Le montant reçu est inférieur au total")
      }
    } else {
      setChange(0)
      setError("")
    }
  }, [amountReceived, totalAmount, paymentMethod])

  const handleProcessPayment = () => {
    if (paymentMethod === "cash" && Number.parseFloat(amountReceived || "0") < totalAmount) {
      setError("Le montant reçu est inférieur au total")
      return
    }

    setError("")
    setIsProcessing(true)
    
    // Créez les données de la commande
    const orderData = {
      name: customerName,
      phone: customerPhone,
      products: products.map((item) => ({
        id: item.productId, // OK ici car c’est comme ça dans ton objet
        quantity: Number(item.quantity),
        price: Number(item.price), // À inclure si ton backend utilise price
      })),
    
    };

   
    console.log(orderData);

    // Simulate payment processing
    axios
      .post('http://127.0.0.1:8000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) // Remplacez cette URL par l'URL de votre API
      .then((response) => {
        setIsProcessing(false);
        setIsComplete(true);
        setTimeout(() => {
          router.push('/sales'); // Redirige vers la page des ventes après le paiement réussi
        }, 2000);
      })
      .catch((error) => {
        setIsProcessing(false);
        setError("Erreur lors du paiement");
        console.error("Erreur lors de l'envoi des données au serveur:", error);
       
      });
    // setTimeout(() => {
    //   setIsProcessing(false)
    //   setIsComplete(true)

    //   setTimeout(() => {
    //     router.push("/sales")
    //   }, 2000)
    // }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">PAIEMENT</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle>DÉTAILS DE LA VENTE</CardTitle>
            <CardDescription className="text-amber-100">Résumé de la transaction</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-amber-900">Nom du Client:</span>
                <span className="text-amber-900">{customerName}</span>
              </div>
              <Separator className="bg-amber-300" />
              <div className="flex justify-between">
                <span className="font-medium text-amber-900">Téléphone du Client:</span>
                <span className="text-amber-900">{customerPhone}</span>
              </div>
              <Separator className="bg-amber-300" />
              <div className="flex justify-between">
                <span className="font-medium text-amber-900">Total à payer:</span>
                <span className="text-xl font-bold text-amber-900">
                  {totalAmount.toFixed(2)} {settings.currency}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle>MODE DE PAIEMENT</CardTitle>
            <CardDescription className="text-amber-100">Sélectionnez le mode de paiement</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <div className="flex items-center space-x-2 rounded-md border-2 border-amber-800 p-3 bg-white">
                <RadioGroupItem value="cash" id="cash" className="border-amber-800" />
                <Label htmlFor="cash" className="flex items-center gap-2 font-bold text-amber-900">
                  <Banknote className="h-5 w-5 text-amber-800" /> Espèces
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border-2 border-amber-800 p-3 bg-white">
                <RadioGroupItem value="card" id="card" className="border-amber-800" />
                <Label htmlFor="card" className="flex items-center gap-2 font-bold text-amber-900">
                  <CreditCard className="h-5 w-5 text-amber-800" /> Carte Bancaire
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border-2 border-amber-800 p-3 bg-white">
                <RadioGroupItem value="mobile" id="mobile" className="border-amber-800" />
                <Label htmlFor="mobile" className="flex items-center gap-2 font-bold text-amber-900">
                  <Smartphone className="h-5 w-5 text-amber-800" /> Mobile Money
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "cash" && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="amount" className="text-right font-bold text-amber-900">
                    Montant Reçu:
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                    placeholder="0.00"
                  />
                </div>
                {change > 0 && (
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label className="text-right font-bold text-amber-900">Monnaie à Rendre:</Label>
                    <div className="text-xl font-bold text-green-700">
                      {change.toFixed(2)} {settings.currency}
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-800 rounded-md">
                <p className="text-amber-900">Le client sera invité à insérer sa carte dans le terminal de paiement.</p>
              </div>
            )}

            {paymentMethod === "mobile" && (
              <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-800 rounded-md">
                <p className="text-amber-900">
                  Le client sera invité à effectuer un paiement via son application mobile.
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-100 border-2 border-red-600 text-red-800">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardContent className="pt-6">
          {isComplete ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4 border-2 border-green-600">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Paiement Réussi!</h2>
              <p className="text-amber-900">La transaction a été complétée avec succès.</p>
              <p className="text-amber-900">Redirection vers la liste des ventes...</p>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-2 border-amber-800 text-amber-900 hover:bg-amber-200"
              >
                Retour
              </Button>
              <Button
                onClick={handleProcessPayment}
                disabled={
                  isProcessing || (paymentMethod === "cash" && Number.parseFloat(amountReceived || "0") < totalAmount)
                }
                className="gap-2 bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Traitement...
                  </>
                ) : (
                  <>
                    Finaliser le Paiement <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
