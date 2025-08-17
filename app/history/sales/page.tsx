"use client"

import { useState } from "react"
import { useEffect} from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettings } from "@/contexts/settings-context"

// Sample sales history data
// const salesHistory = [
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
//   {
//     id: 9,
//     date: "2023-04-10T16:30:00",
//     customer: "Jacques André",
//     items: 1,
//     total: 499.99,
//     payment: "Espèces",
//     status: "complété",
//   },
//   {
//     id: 10,
//     date: "2023-04-10T14:15:00",
//     customer: "Jennifer Thomas",
//     items: 3,
//     total: 747.0,
//     payment: "Carte",
//     status: "complété",
//   },
//   {
//     id: 11,
//     date: "2023-04-09T15:30:00",
//     customer: "Robert Blanc",
//     items: 2,
//     total: 598.0,
//     payment: "Espèces",
//     status: "complété",
//   },
//   {
//     id: 12,
//     date: "2023-04-09T13:45:00",
//     customer: "Patricia Harris",
//     items: 4,
//     total: 1196.96,
//     payment: "Carte",
//     status: "complété",
//   },
// ]

export default function SalesHistoryPage() {
  const { settings } = useSettings()
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [salesHistory, setSalesHistory] = useState([])
  const token = localStorage.getItem("token")
    
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) // remplace par ton URL d'API
        setSalesHistory(res.data)
      } catch (err) {
        
        console.error(err)
      } 
    }

    fetchSales()
  }, [])

  function parseCustomDate(dateString: string) {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    return new Date(`${year}-${month}-${day}T${timePart}`);
  }

  // Filter sales based on search query and filters
  const filteredSales = salesHistory.filter((sale) => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchQuery.toLowerCase())

    // const rawDate = sale.date; 
    // const [datePart, timePart] = rawDate.split(" "); 
    // const [day, month, year] = datePart.split("/"); 

    // const formattedDate = `${year}-${month}-${day}T${timePart}`; 

    const saleDate = parseCustomDate(sale.date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    

    


    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && saleDate.toDateString() === today.toDateString()) ||
      (dateFilter === "yesterday" && saleDate.toDateString() === yesterday.toDateString()) ||
      (dateFilter === "week" && saleDate >= new Date(today.setDate(today.getDate() - 7)))

    const matchesPayment = paymentFilter === "all" || sale.payment.toLowerCase() === paymentFilter.toLowerCase()

    return matchesSearch && matchesDate && matchesPayment
  })

  

  // Calculate total sales amount
  const totalSalesAmount = filteredSales.reduce((sum, sale) => sum + sale.total, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">HISTORIQUE DES VENTES</h1>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>TRANSACTIONS DE VENTE</CardTitle>
          <CardDescription className="text-amber-100">
            Consultez et filtrez toutes vos transactions de vente
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
              <Input
                placeholder="Rechercher par nom de client..."
                className="pl-10 border-2 border-amber-800 bg-white text-amber-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-[150px]">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    <SelectItem value="all" className="text-amber-900">
                      Toutes Dates
                    </SelectItem>
                    <SelectItem value="today" className="text-amber-900">
                      Aujourd'hui
                    </SelectItem>
                    <SelectItem value="yesterday" className="text-amber-900">
                      Hier
                    </SelectItem>
                    <SelectItem value="week" className="text-amber-900">
                      Cette Semaine
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[150px]">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                    <SelectValue placeholder="Paiement" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    <SelectItem value="all" className="text-amber-900">
                      Tous Paiements
                    </SelectItem>
                    <SelectItem value="espèces" className="text-amber-900">
                      Espèces
                    </SelectItem>
                    <SelectItem value="carte" className="text-amber-900">
                      Carte
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-amber-50 rounded-md border-2 border-amber-800">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-amber-900">TOTAL DES VENTES</h3>
                <p className="text-2xl font-bold text-amber-900">
                  {totalSalesAmount.toFixed(2)} {settings.currency}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-amber-900">TRANSACTIONS</h3>
                <p className="text-2xl font-bold text-amber-900">{filteredSales.length}</p>
              </div>
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
                      <TableCell className="text-amber-900">
                        {sale.total.toFixed(2)} {settings.currency}
                      </TableCell>
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
                        <Button variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-200">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
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
