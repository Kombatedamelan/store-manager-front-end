"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trash, Plus, ArrowRight, Loader2 } from "lucide-react"

// Sample product data
const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 399.99,
  },
  {
    id: 2,
    name: "Écouteurs Sans Fil",
    price: 149.0,
  },
  {
    id: 3,
    name: "Ordinateur Portable Pro",
    price: 999.0,
  },
  {
    id: 4,
    name: "Montre Connectée",
    price: 149.0,
  },
  {
    id: 5,
    name: "Enceinte Bluetooth",
    price: 79.0,
  },
  {
    id: 6,
    name: "Tablette Mini",
    price: 299.0,
  },
]

// Sample suppliers
const suppliers = [
  { id: 1, name: "Tech Supplies Inc." },
  { id: 2, name: "Electronics Wholesale" },
  { id: 3, name: "Gadget Distributors" },
]

export default function NewPurchasePage() {
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [costPrice, setCostPrice] = useState("")
  const [supplier, setSupplier] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddItem = () => {
    if (!selectedProduct || !costPrice) return

    const product = products.find((p) => p.id.toString() === selectedProduct)
    if (!product) return

    const existingItemIndex = items.findIndex((item) => item.productId.toString() === selectedProduct)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += Number.parseInt(quantity)
      updatedItems[existingItemIndex].costPrice = Number.parseFloat(costPrice)
      updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].quantity * Number.parseFloat(costPrice)
      setItems(updatedItems)
    } else {
      // Add new item
      setItems([
        ...items,
        {
          productId: product.id,
          name: product.name,
          costPrice: Number.parseFloat(costPrice),
          quantity: Number.parseInt(quantity),
          total: Number.parseFloat(costPrice) * Number.parseInt(quantity),
        },
      ])
    }

    // Reset selection
    setSelectedProduct("")
    setQuantity("1")
    setCostPrice("")
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const handleCompletePurchase = () => {
    if (items.length === 0 || !supplier) return

    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false)
      router.push("/purchases")
    }, 2000)
  }

  const handleProductChange = (value: string) => {
    setSelectedProduct(value)
    const product = products.find((p) => p.id.toString() === value)
    if (product) {
      setCostPrice(product.price.toString())
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">NOUVEL ACHAT</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle>AJOUTER DES PRODUITS</CardTitle>
            <CardDescription className="text-amber-100">
              Sélectionnez les produits à ajouter à cet achat
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right font-bold text-amber-900">
                  Produit
                </Label>
                <div className="col-span-3">
                  <Select value={selectedProduct} onValueChange={handleProductChange}>
                    <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent className="bg-amber-50 border-2 border-amber-800">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()} className="text-amber-900">
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="costPrice" className="text-right font-bold text-amber-900">
                  Prix d'Achat
                </Label>
                <div className="col-span-3">
                  <Input
                    id="costPrice"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    placeholder="Prix d'achat par unité"
                    className="border-2 border-amber-800 bg-white text-amber-900"
                  />
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
                disabled={!selectedProduct || !costPrice}
                className="ml-auto bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
              >
                <Plus className="mr-2 h-4 w-4" /> Ajouter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle>INFORMATION FOURNISSEUR</CardTitle>
            <CardDescription className="text-amber-100">
              Entrez les détails du fournisseur pour cet achat
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right font-bold text-amber-900">
                  Fournisseur
                </Label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger className="col-span-3 border-2 border-amber-800 bg-white text-amber-900">
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    {suppliers.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()} className="text-amber-900">
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>RÉSUMÉ DE L'ACHAT</CardTitle>
          <CardDescription className="text-amber-100">Vérifiez les articles de cet achat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-md border-2 border-amber-800 bg-white">
            <Table>
              <TableHeader className="bg-amber-200">
                <TableRow>
                  <TableHead className="text-amber-900 font-bold">Produit</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Prix d'Achat</TableHead>
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
                      <TableCell className="text-right text-amber-900">{item.costPrice.toFixed(2)} FCFA</TableCell>
                      <TableCell className="text-right text-amber-900">{item.quantity}</TableCell>
                      <TableCell className="text-right text-amber-900">{item.total.toFixed(2)} FCFA</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:bg-red-100"
                        >
                          <Trash className="h-4 w-4" />
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
                      {calculateTotal().toFixed(2)} FCFA
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
            onClick={() => router.push("/purchases")}
            className="border-2 border-amber-800 text-amber-900 hover:bg-amber-200"
          >
            Annuler
          </Button>
          <Button
            onClick={handleCompletePurchase}
            disabled={items.length === 0 || !supplier || isLoading}
            className="gap-2 bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Traitement...
              </>
            ) : (
              <>
                Terminer l'Achat <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
