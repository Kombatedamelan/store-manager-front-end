"use client"

import { useState } from "react"
import Link from "next/link"
import { useEffect} from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample sales data
// const initialSales = [
//   {
//     id: 1,
//     date: "2023-04-13T14:30:00",
//     customer: "Jean Dupont",
//     items: 3,
//     total: 749.97,
//     payment: "Espèces",
//     status: "complété",
//   },
//   {
//     id: 2,
//     date: "2023-04-13T12:15:00",
//     customer: "Marie Martin",
//     items: 2,
//     total: 398.0,
//     payment: "Carte",
//     status: "complété",
//   },
//   {
//     id: 3,
//     date: "2023-04-13T10:45:00",
//     customer: "Robert Dubois",
//     items: 1,
//     total: 199.0,
//     payment: "Espèces",
//     status: "complété",
//   },
//   {
//     id: 4,
//     date: "2023-04-12T16:30:00",
//     customer: "Émilie Petit",
//     items: 4,
//     total: 1256.96,
//     payment: "Carte",
//     status: "complété",
//   },
//   {
//     id: 5,
//     date: "2023-04-12T14:00:00",
//     customer: "Michel Leroy",
//     items: 2,
//     total: 598.99,
//     payment: "Espèces",
//     status: "complété",
//   },
//   {
//     id: 6,
//     date: "2023-04-12T11:30:00",
//     customer: "Sophie Moreau",
//     items: 1,
//     total: 129.99,
//     payment: "Carte",
//     status: "complété",
//   },
//   {
//     id: 7,
//     date: "2023-04-11T15:45:00",
//     customer: "David Roux",
//     items: 3,
//     total: 847.97,
//     payment: "Espèces",
//     status: "complété",
//   },
//   {
//     id: 8,
//     date: "2023-04-11T13:15:00",
//     customer: "Lisa Fournier",
//     items: 2,
//     total: 398.0,
//     payment: "Carte",
//     status: "complété",
//   },
// ]

export default function SalesPage() {
  const [sales, setSales] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const token = localStorage.getItem("token")
  const parseCustomDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(" ") // "23/04/2025", "17:21:37"
    const [day, month, year] = datePart.split("/")
    return new Date(`${year}-${month}-${day}T${timePart}`)
  }

  useEffect(() => {
      const fetchSales = async () => {
        try {
          const res = await axios.get("http://127.0.0.1:8000/api/orders", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }) // remplace par ton URL d'API
          setSales(res.data)
        } catch (err) {
          
          console.error(err)
        } 
      }
  
      fetchSales()
    }, [])

    const handleClick = async (saleId: number) => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`http://127.0.0.1:8000/api/orders/${saleId}/pdf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // ← important pour les fichiers
        })
    
        const blob = new Blob([res.data], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)
    
        // Ouvre dans un nouvel onglet
        window.open(url)
      } catch (error) {
        console.error("Erreur lors du téléchargement du PDF :", error)
        toast({
          title: "Erreur",
          description: "Impossible de générer la facture PDF.",
          variant: "destructive",
        })
      }
    }
    
    

  // Filter sales based on search query
  const filteredSales = sales.filter((sale) => sale.customer.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">VENTES</h1>
        <Link href="/sales/new">
          <Button className="bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900">
            <Plus className="mr-2 h-4 w-4" /> Nouvelle Vente
          </Button>
        </Link>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>HISTORIQUE DES VENTES</CardTitle>
          <CardDescription className="text-amber-100">
            Consultez et gérez toutes vos transactions de vente
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
              <Input
                placeholder="Rechercher par nom de client..."
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
                  <TableHead className="text-amber-900 font-bold">Date</TableHead>
                  <TableHead className="text-amber-900 font-bold">Client</TableHead>
                  <TableHead className="text-amber-900 font-bold">Articles</TableHead>
                  <TableHead className="text-amber-900 font-bold">Total</TableHead>
                  <TableHead className="text-amber-900 font-bold">Paiement</TableHead>
                  <TableHead className="text-amber-900 font-bold">Statut</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow key="no-sales">
                    <TableCell colSpan={7} className="text-center py-6 text-amber-700">
                      Aucune vente trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id} className="border-b border-amber-300">
                      <TableCell className="text-amber-900">
                        {parseCustomDate(sale.date).toLocaleDateString()}
                        <div className="text-xs text-amber-700">{parseCustomDate(sale.date).toLocaleTimeString()}</div>
                      </TableCell>
                      <TableCell className="font-medium text-amber-900">{sale.customer}</TableCell>
                      <TableCell className="text-amber-900">{sale.quantity}</TableCell>
                      <TableCell className="text-amber-900">{sale.total.toFixed(2)} FCFA</TableCell>
                      <TableCell className="text-amber-900">{sale.payment}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="capitalize bg-green-100 text-green-800 border-2 border-green-500"
                        >
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleClick(sale.id)} variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-200">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only" >Voir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
