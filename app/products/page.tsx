"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash, Filter } from "lucide-react"
import { ProductDialog } from "@/components/product-dialog"

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Smartphone X",
    category: "Électronique",
    price: 499.99,
    stock: 24,
    sku: "ELEC-001",
  },
  {
    id: 2,
    name: "Écouteurs Sans Fil",
    category: "Audio",
    price: 199.0,
    stock: 15,
    sku: "AUDIO-001",
  },
  {
    id: 3,
    name: "Ordinateur Portable Pro",
    category: "Informatique",
    price: 1299.0,
    stock: 8,
    sku: "COMP-001",
  },
  {
    id: 4,
    name: "Montre Connectée",
    category: "Accessoires",
    price: 199.0,
    stock: 12,
    sku: "WEAR-001",
  },
  {
    id: 5,
    name: "Enceinte Bluetooth",
    category: "Audio",
    price: 99.0,
    stock: 3,
    sku: "AUDIO-002",
  },
  {
    id: 6,
    name: "Tablette Mini",
    category: "Électronique",
    price: 349.0,
    stock: 10,
    sku: "ELEC-002",
  },
  {
    id: 7,
    name: "Souris Sans Fil",
    category: "Accessoires",
    price: 29.99,
    stock: 20,
    sku: "ACC-001",
  },
  {
    id: 8,
    name: "Disque Dur Externe",
    category: "Stockage",
    price: 129.0,
    stock: 7,
    sku: "STOR-001",
  },
]

const categories = ["Toutes Catégories", "Électronique", "Audio", "Informatique", "Accessoires", "Stockage"]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Toutes Catégories")
  const [stockFilter, setStockFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "Toutes Catégories" || product.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock <= 5) ||
      (stockFilter === "out" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  const handleAddProduct = () => {
    setCurrentProduct(null)
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleSaveProduct = (product: any) => {
    if (product.id) {
      // Update existing product
      setProducts(products.map((p) => (p.id === product.id ? product : p)))
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Math.max(...products.map((p) => p.id)) + 1,
      }
      setProducts([...products, newProduct])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">PRODUITS</h1>
        <Button
          onClick={handleAddProduct}
          className="bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Produit
        </Button>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>INVENTAIRE DES PRODUITS</CardTitle>
          <CardDescription className="text-amber-100">Gérez votre inventaire, prix et niveaux de stock</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
              <Input
                placeholder="Rechercher des produits..."
                className="pl-10 border-2 border-amber-800 bg-white text-amber-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-[180px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-amber-900">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[150px]">
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Stock" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    <SelectItem value="all" className="text-amber-900">
                      Tout Stock
                    </SelectItem>
                    <SelectItem value="low" className="text-amber-900">
                      Stock Faible
                    </SelectItem>
                    <SelectItem value="out" className="text-amber-900">
                      Rupture Stock
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border-2 border-amber-800 bg-white">
            <Table>
              <TableHeader className="bg-amber-200">
                <TableRow>
                  <TableHead className="text-amber-900 font-bold">Nom</TableHead>
                  <TableHead className="text-amber-900 font-bold">Catégorie</TableHead>
                  <TableHead className="text-amber-900 font-bold">Prix</TableHead>
                  <TableHead className="text-amber-900 font-bold">Stock</TableHead>
                  <TableHead className="text-amber-900 font-bold">Référence</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-amber-700">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-b border-amber-300">
                      <TableCell className="font-medium text-amber-900">{product.name}</TableCell>
                      <TableCell className="text-amber-900">{product.category}</TableCell>
                      <TableCell className="text-amber-900">{product.price.toFixed(2)} FCFA</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock <= 5 ? "destructive" : "outline"}
                          className={
                            product.stock <= 5
                              ? "bg-red-100 text-red-800 border-2 border-red-500"
                              : "bg-amber-50 text-amber-900 border-2 border-amber-500"
                          }
                        >
                          {product.stock} en stock
                        </Badge>
                      </TableCell>
                      <TableCell className="text-amber-700">{product.sku}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                            className="text-amber-800 hover:bg-amber-200"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:bg-red-100"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={currentProduct}
        onSave={handleSaveProduct}
      />
    </div>
  )
}
