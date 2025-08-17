"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash, Filter } from "lucide-react"
import { SuppliersDialog } from "@/components/supplier-dialog"
import { useEffect } from "react"
import axios from "axios"





export default function ProductsPage() {

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Toutes Catégories")
  const [stockFilter, setStockFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentSuppliers, setCurrentSuppliers] = useState<any>(null)
  const [suppliers, setSuppliers] = useState<any[]>([])
  const token = localStorage.getItem("token")

  //connection

  
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/suppliers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) 
        console.log("tout les fournisseurs :", res.data)
        setSuppliers(res.data) 
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err)
      }
    }
  
    fetchSuppliers()
  }, [])
  

  // Filter products based on search query and filters
  const filteredSuppliers = suppliers.filter((supplier) => {
     if (!supplier || !supplier.name) return false
    const matchesSearch =
     supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesSearch 
    })
    console.log("🔎 Categories filtrés :", filteredSuppliers);
    
  const handleAddSuppliers = () => {
    setCurrentSuppliers(null)
    setIsDialogOpen(true)
  }

  const handleEditSuppliers = (supplier: any) => {
    setCurrentSuppliers(supplier)
    setIsDialogOpen(true)
  }

  const handleDeleteSuppliers = async (id: number) => {
    await axios.delete('http://127.0.0.1:8000/api/suppliers/'+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id))
  }




    const handleSaveSuppliers = async (supplier: any) => {
        if (supplier.id) {
        // Update existing product
        const response = await axios.put('http://127.0.0.1:8000/api/suppliers/' + supplier.id, supplier, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        console.log("Catégorie à mettre à jour :", supplier)
        console.log("Réponse du serveur :", response.data)

        // setCategories(categories.map((c) => (c.id === category.id ?  response.data : c)))

        setSuppliers(
          suppliers.map((s) => {
              if (!s || typeof s.id === "undefined") return s
              return s.id === supplier.id ? response.data : s
            })
          )
          
        } else {
        // Add new product
        
        // const newCategory = {
        //     ...category,
        //     id: Math.max(...categories.map((c) => c.id)) + 1,
        // }
        const newSuppliers = {
            ...supplier,
            id:
              Math.max(
                ...suppliers
                  .filter((s) => s && typeof s.id === "number")
                  .map((s) => s.id)
              ) + 1,
          }
        console.log("tableau new categorie:", newSuppliers)
        const response = await axios.post('http://127.0.0.1:8000/api/suppliers', newSuppliers, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        console.log('Produit enregistré avec succès :', response.data);
        
        setSuppliers([...suppliers,  response.data])

        }
        setIsDialogOpen(false)
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">Fournisseurs</h1>
        <Button
          onClick={handleAddSuppliers}
          className="bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un fournisseur
        </Button>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>Liste des fournisseurs</CardTitle>
          <CardDescription className="text-amber-100">Gérez vos fournisseurs ici</CardDescription>
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
            
          </div>

          <div className="rounded-md border-2 border-amber-800 bg-white">
            <Table>
              <TableHeader className="bg-amber-200">
                <TableRow>
                  {/* <TableHead className="text-amber-900 font-bold">Nom</TableHead> */}
                  <TableHead className="text-amber-900 font-bold">Fournisseurs</TableHead>
                  {/* <TableHead className="text-amber-900 font-bold">Prix</TableHead> */}
                  {/* <TableHead className="text-amber-900 font-bold">Stock</TableHead> */}
                  {/* <TableHead className="text-amber-900 font-bold">Référence</TableHead> */}
                  <TableHead className="text-right text-amber-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-amber-700">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="border-b border-amber-300">
                      <TableCell className="font-medium text-amber-900">{supplier.name}</TableCell>
                      
                      {/* <TableCell className="text-amber-900">{product.category?.name ?? <em className="text-gray-500">Non catégorisé</em>}</TableCell> */}

                      {/* <TableCell className="text-amber-900">{product.category.name}</TableCell> */}
                      {/* <TableCell className="text-amber-900">{Number(product.price).toFixed(2)} FCFA</TableCell> */}
                      
                      
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditSuppliers(supplier)}
                            className="text-amber-800 hover:bg-amber-200"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSuppliers(supplier.id)}
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

      <SuppliersDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        supplier={currentSuppliers}
        onSave={handleSaveSuppliers}
      />
    </div>
  )
}
