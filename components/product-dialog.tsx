"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = ["Électronique", "Audio", "Informatique", "Accessoires", "Stockage"]

export function ProductDialog({ open, onOpenChange, product, onSave }: any) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    sku: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        sku: product.sku,
      })
    } else {
      setFormData({
        id: null,
        name: "",
        category: categories[0],
        price: "",
        stock: "",
        sku: "",
      })
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-amber-100 border-4 border-amber-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="bg-amber-800 text-white p-4 -mx-6 -mt-6 rounded-t-lg border-b-2 border-amber-900">
            <DialogTitle>{product ? "Modifier le Produit" : "Ajouter un Nouveau Produit"}</DialogTitle>
            <DialogDescription className="text-amber-100">
              {product ? "Mettez à jour les détails du produit." : "Remplissez les détails pour le nouveau produit."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 mt-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-bold text-amber-900">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3 border-2 border-amber-800 bg-white text-amber-900"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right font-bold text-amber-900">
                Catégorie
              </Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="col-span-3 border-2 border-amber-800 bg-white text-amber-900">
                  <SelectValue placeholder="Sélectionner une catégorie" />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right font-bold text-amber-900">
                Prix
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3 border-2 border-amber-800 bg-white text-amber-900"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right font-bold text-amber-900">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="col-span-3 border-2 border-amber-800 bg-white text-amber-900"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right font-bold text-amber-900">
                Référence
              </Label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="col-span-3 border-2 border-amber-800 bg-white text-amber-900"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
