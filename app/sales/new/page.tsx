"use client"

import { useState } from "react"
import { useEffect} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trash, Plus, ArrowRight, Loader2 } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

// Sample product data
// const products = [
//   {
//     id: 1,
//     name: "Smartphone X",
//     price: 499.99,
//     stock: 24,
//   },
//   {
//     id: 2,
//     name: "Écouteurs Sans Fil",
//     price: 199.0,
//     stock: 15,
//   },
//   {
//     id: 3,
//     name: "Ordinateur Portable Pro",
//     price: 1299.0,
//     stock: 8,
//   },
//   {
//     id: 4,
//     name: "Montre Connectée",
//     price: 199.0,
//     stock: 12,
//   },
//   {
//     id: 5,
//     name: "Enceinte Bluetooth",
//     price: 99.0,
//     stock: 3,
//   },
//   {
//     id: 6,
//     name: "Tablette Mini",
//     price: 349.0,
//     stock: 10,
//   },
// ]

export default function NewSalePage() {
  const router = useRouter()
  const { settings } = useSettings()
  const [items, setItems] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const token = localStorage.getItem("token")


  useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await axios.get("http://127.0.0.1:8000/api/products", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }) 
            
            setProducts(res.data) 
          } catch (error) {
            console.error("Erreur lors du chargement des produits :", error)
          }
        }
      
        fetchProducts()
      }, [])

  const handleAddItem = () => {
    if (!selectedProduct) return

    const product = products.find((p) => p.id.toString() === selectedProduct)
    if (!product) return

    if (product.qte <= 0) {
      alert("Ce produit est en rupture de stock.")
      return
    }
    const qty = parseInt(quantity) 
    if (qty > product.qte) {
      alert(`Quantité demandée trop élevée. Vérifiez le stock et relancez la commande`)
      return
    }
       
    const existingItemIndex = items.findIndex((item) => item.productId.toString() === selectedProduct)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += Number.parseInt(quantity)
      updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].quantity * product.price
      setItems(updatedItems)
    } else {
      // Add new item
      setItems([
        ...items,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: Number.parseInt(quantity),
          total: product.price * Number.parseInt(quantity),
        },
      ])
    }

    // Reset selection
    setSelectedProduct("")
    setQuantity("1")
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const handleProceedToPayment = () => {
    if (items.length === 0 || !customerName || !customerPhone) return
    

    setIsLoading(true)

     // Créez une chaîne de requête pour les produits, quantités et prix
     const productsQuery = encodeURIComponent(JSON.stringify(items));

    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to payment page with total and customer info
      router.push(`/sales/payment?total=${calculateTotal()}&customer=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(customerPhone)}&products=${productsQuery}`);
      // router.push(`/sales/payment?total=${calculateTotal()}&customer=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(customerPhone)}&${productsQuery}`)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">NOUVELLE VENTE</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle>AJOUTER DES PRODUITS</CardTitle>
            <CardDescription className="text-amber-100">Sélectionnez les produits pour cette vente</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right font-bold text-amber-900">
                  Produit
                </Label>
                <div className="col-span-3">
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent className="bg-amber-50 border-2 border-amber-800">
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                          disabled={product.qte === 0}
                          className="text-amber-900"
                        >
                          {product.name} - {Number(product.price).toFixed(2)} {settings.currency} ({product.qte} en stock)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right font-bold text-amber-900">
                  Quantité
                </Label>
                <div className="col-span-3">
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border-2 border-amber-800 bg-white text-amber-900"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddItem}
                disabled={!selectedProduct}
                className="ml-auto bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
              >
                <Plus className="mr-2 h-5 w-5" /> Ajouter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle>INFORMATION CLIENT</CardTitle>
            <CardDescription className="text-amber-100">Entrez les détails du client pour cette vente</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right font-bold text-amber-900">
                  Client
                </Label>
                <Input
                  id="customer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="col-span-3 border-2 border-amber-800 bg-white text-amber-900"
                  placeholder="Nom du client"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right font-bold text-amber-900">
                  Téléphone
                </Label>
                <Input
                  id="customer"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="col-span-3 border-2 border-amber-800 bg-white text-amber-900"
                  placeholder="Téléphone du client"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment" className="text-right font-bold text-amber-900">
                  Paiement
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="col-span-3 border-2 border-amber-800 bg-white text-amber-900">
                    <SelectValue placeholder="Mode de paiement" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    <SelectItem value="cash" className="text-amber-900">
                      Espèces
                    </SelectItem>
                    {/* <SelectItem value="card" className="text-amber-900">
                      Carte
                    </SelectItem>
                    <SelectItem value="transfer" className="text-amber-900">
                      Transfert Bancaire
                    </SelectItem>
                    <SelectItem value="mobile" className="text-amber-900">
                      Mobile Money
                    </SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>RÉSUMÉ DE LA VENTE</CardTitle>
          <CardDescription className="text-amber-100">Vérifiez les articles de cette vente</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-md border-2 border-amber-800 bg-white">
            <Table>
              <TableHeader className="bg-amber-200">
                <TableRow>
                  <TableHead className="text-amber-900 font-bold">Produit</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Prix</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Quantité</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-amber-700">
                      Aucun article ajouté
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, index) => (
                    <TableRow key={index} className="border-b border-amber-300">
                      <TableCell className="font-medium text-amber-900">{item.name}</TableCell>
                      <TableCell className="text-right text-amber-900">
                        {Number(item.price).toFixed(2)} {settings.currency}
                      </TableCell>
                      <TableCell className="text-right text-amber-900">{item.quantity}</TableCell>
                      <TableCell className="text-right text-amber-900">
                        {item.total.toFixed(2)} {settings.currency}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:bg-red-100"
                        >
                          <Trash className="h-5 w-5" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {items.length > 0 && (
                  <TableRow className="bg-amber-100 border-t-2 border-amber-800">
                    <TableCell colSpan={3} className="text-right font-bold text-amber-900">
                      TOTAL
                    </TableCell>
                    <TableCell className="text-right font-bold text-xl text-amber-900">
                      {calculateTotal().toFixed(2)} {settings.currency}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/sales")}
            className="border-2 border-amber-800 text-amber-900 hover:bg-amber-200"
          >
            Annuler
          </Button>
          <Button
            onClick={handleProceedToPayment}
            disabled={items.length === 0 || !customerName || isLoading}
            className="gap-2 bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Traitement...
              </>
            ) : (
              <>
                Procéder au Paiement <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
