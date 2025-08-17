"use client"

import type React from "react"
import axios from "axios"

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


export function CategoryDialog({ open, onOpenChange, category, onSave }: any) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
  })
 
  const token = localStorage.getItem("token")


  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
      })
    } else {
      setFormData({
        id: null,
        name: "",
      })
    }
  }, [category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-amber-100 border-4 border-amber-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="bg-amber-800 text-white p-4 -mx-6 -mt-6 rounded-t-lg border-b-2 border-amber-900">
            <DialogTitle>{category ? "Modifier une categorie" : "Ajouter une nouvelle categorie"}</DialogTitle>
            <DialogDescription className="text-amber-100">
              {category ? "Mettez à jour les détails de la categorie." : "Remplissez les détails pour la nouvelle categorie."}
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
