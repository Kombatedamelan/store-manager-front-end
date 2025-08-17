"use client"



import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

// const topProducts = [
//   {
//     id: 1,
//     name: "Smartphone X",
//     category: "Électronique",
//     sold: 12,
//     revenue: 5988,
//   },
//   {
//     id: 2,
//     name: "Écouteurs Sans Fil",
//     category: "Audio",
//     sold: 8,
//     revenue: 1592,
//   },
//   {
//     id: 3,
//     name: "Ordinateur Portable Pro",
//     category: "Informatique",
//     sold: 5,
//     revenue: 6495,
//   },
//   {
//     id: 4,
//     name: "Montre Connectée",
//     category: "Accessoires",
//     sold: 7,
//     revenue: 1393,
//   },
//   {
//     id: 5,
//     name: "Enceinte Bluetooth",
//     category: "Audio",
//     sold: 6,
//     revenue: 594,
//   },
// ]


export function TopProducts() {


const [topProducts, setTopProducts] = useState([])
const token = localStorage.getItem("token")

useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products/popular", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) 
        // console.log("Produits de l'API", res.data)
        setTopProducts(res.data) // À adapter selon structure du JSON
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error)
      }
    }
  
    fetchTopProducts()
  }, [])





  return (
    <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
      <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
        <CardTitle>PRODUITS POPULAIRES</CardTitle>
        <CardDescription className="text-amber-100">Vos produits les plus vendus cette semaine</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between space-x-4 p-2 border-2 border-amber-300 rounded-md bg-amber-50"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-amber-900">{product.name}</p>
                <p className="text-sm text-amber-700">{product.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs bg-amber-200 text-amber-900 border border-amber-400">
                  {product.sold} vendus
                </Badge>
                <span className="text-sm font-medium text-amber-900">{product.revenue.toLocaleString()} FCFA</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
