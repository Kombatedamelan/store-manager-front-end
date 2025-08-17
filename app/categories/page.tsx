"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash, Filter } from "lucide-react"
import { CategoryDialog } from "@/components/categorie-dialog"
import { useEffect } from "react"
import axios from "axios"





export default function ProductsPage() {

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Toutes Catégories")
  const [stockFilter, setStockFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const token = localStorage.getItem("token")

  //connection

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) 
        console.log("tout les categories :", res.data)
        setCategories(res.data) 
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err)
      }
    }
  
    fetchCategories()
  }, [])
  

  // Filter products based on search query and filters
  const filteredCategory = categories.filter((category) => {
     if (!category || !category.name) return false
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesSearch 
    })
    console.log("🔎 Categories filtrés :", filteredCategory);
    
  const handleAddCategory = () => {
    setCurrentCategory(null)
    setIsDialogOpen(true)
  }

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category)
    setIsDialogOpen(true)
  }

  const handleDeleteCategory = async (id: number) => {
    await axios.delete('http://127.0.0.1:8000/api/categories/'+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCategories(categories.filter((category) => category.id !== id))
  }




    const handleSaveCategory = async (category: any) => {
        if (category.id) {
        // Update existing product
        const response = await axios.put('http://127.0.0.1:8000/api/categories/'+category.id, category, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        console.log("Catégorie à mettre à jour :", category)
        console.log("Réponse du serveur :", response.data)

        // setCategories(categories.map((c) => (c.id === category.id ?  response.data : c)))

        setCategories(
            categories.map((c) => {
              if (!c || typeof c.id === "undefined") return c
              return c.id === category.id ? response.data : c
            })
          )
          
        } else {
        // Add new product
        
        // const newCategory = {
        //     ...category,
        //     id: Math.max(...categories.map((c) => c.id)) + 1,
        // }
        const newCategory = {
            ...category,
            id:
              Math.max(
                ...categories
                  .filter((c) => c && typeof c.id === "number")
                  .map((c) => c.id)
              ) + 1,
          }
        console.log("tableau new categorie:", newCategory)
        const response = await axios.post('http://127.0.0.1:8000/api/categories', newCategory, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        console.log('Produit enregistré avec succès :', response.data);
        
        setCategories([...categories,  response.data])

        }
        setIsDialogOpen(false)
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">Categories</h1>
        <Button
          onClick={handleAddCategory}
          className="bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900"
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter une catégorie
        </Button>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>Liste des catégories</CardTitle>
          <CardDescription className="text-amber-100">Gérez vos catégories ici</CardDescription>
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
                  <TableHead className="text-amber-900 font-bold">Catégorie</TableHead>
                  {/* <TableHead className="text-amber-900 font-bold">Prix</TableHead> */}
                  {/* <TableHead className="text-amber-900 font-bold">Stock</TableHead> */}
                  {/* <TableHead className="text-amber-900 font-bold">Référence</TableHead> */}
                  <TableHead className="text-right text-amber-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-amber-700">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategory.map((category) => (
                    <TableRow key={category.id} className="border-b border-amber-300">
                      <TableCell className="font-medium text-amber-900">{category.name}</TableCell>
                      
                      {/* <TableCell className="text-amber-900">{product.category?.name ?? <em className="text-gray-500">Non catégorisé</em>}</TableCell> */}

                      {/* <TableCell className="text-amber-900">{product.category.name}</TableCell> */}
                      {/* <TableCell className="text-amber-900">{Number(product.price).toFixed(2)} FCFA</TableCell> */}
                      
                      
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCategory(category)}
                            className="text-amber-800 hover:bg-amber-200"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(category.id)}
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

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={currentCategory}
        onSave={handleSaveCategory}
      />
    </div>
  )
}
