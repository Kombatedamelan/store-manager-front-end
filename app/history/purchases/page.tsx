"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettings } from "@/contexts/settings-context"

// Sample purchases history data
const purchasesHistory = [
  {
    id: 1,
    date: "2023-04-13T09:30:00",
    supplier: "Tech Supplies Inc.",
    items: 5,
    total: 2499.95,
    status: "reçu",
  },
  {
    id: 2,
    date: "2023-04-11T14:15:00",
    supplier: "Electronics Wholesale",
    items: 3,
    total: 1847.0,
    status: "reçu",
  },
  {
    id: 3,
    date: "2023-04-09T11:45:00",
    supplier: "Gadget Distributors",
    items: 2,
    total: 998.0,
    status: "reçu",
  },
  {
    id: 4,
    date: "2023-04-07T10:30:00",
    supplier: "Tech Supplies Inc.",
    items: 4,
    total: 1596.0,
    status: "reçu",
  },
  {
    id: 5,
    date: "2023-04-05T15:00:00",
    supplier: "Electronics Wholesale",
    items: 6,
    total: 2994.0,
    status: "reçu",
  },
  {
    id: 6,
    date: "2023-04-03T13:30:00",
    supplier: "Gadget Distributors",
    items: 3,
    total: 1497.0,
    status: "reçu",
  },
  {
    id: 7,
    date: "2023-04-01T11:15:00",
    supplier: "Tech Supplies Inc.",
    items: 2,
    total: 998.0,
    status: "reçu",
  },
  {
    id: 8,
    date: "2023-03-30T14:45:00",
    supplier: "Electronics Wholesale",
    items: 4,
    total: 1996.0,
    status: "reçu",
  },
  {
    id: 9,
    date: "2023-03-28T10:30:00",
    supplier: "Gadget Distributors",
    items: 5,
    total: 2495.0,
    status: "reçu",
  },
  {
    id: 10,
    date: "2023-03-26T13:15:00",
    supplier: "Tech Supplies Inc.",
    items: 3,
    total: 1497.0,
    status: "reçu",
  },
]

export default function PurchasesHistoryPage() {
  const { settings } = useSettings()
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")

  // Filter purchases based on search query and filters
  const filteredPurchases = purchasesHistory.filter((purchase) => {
    const matchesSearch = purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase())

    const purchaseDate = new Date(purchase.date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && purchaseDate.toDateString() === today.toDateString()) ||
      (dateFilter === "yesterday" && purchaseDate.toDateString() === yesterday.toDateString()) ||
      (dateFilter === "week" && purchaseDate >= new Date(today.setDate(today.getDate() - 7)))

    const matchesSupplier = supplierFilter === "all" || purchase.supplier === supplierFilter

    return matchesSearch && matchesDate && matchesSupplier
  })

  // Calculate total purchases amount
  const totalPurchasesAmount = filteredPurchases.reduce((sum, purchase) => sum + purchase.total, 0)

  // Get unique suppliers for filter
  const suppliers = ["all", ...new Set(purchasesHistory.map((purchase) => purchase.supplier))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">HISTORIQUE DES ACHATS</h1>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>TRANSACTIONS D'ACHAT</CardTitle>
          <CardDescription className="text-amber-100">
            Consultez et filtrez tous vos achats d'inventaire
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
              <Input
                placeholder="Rechercher par fournisseur..."
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
              <div className="w-[200px]">
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger className="border-2 border-amber-800 bg-white text-amber-900">
                    <SelectValue placeholder="Fournisseur" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-50 border-2 border-amber-800">
                    <SelectItem value="all" className="text-amber-900">
                      Tous Fournisseurs
                    </SelectItem>
                    {suppliers
                      .filter((s) => s !== "all")
                      .map((supplier) => (
                        <SelectItem key={supplier} value={supplier} className="text-amber-900">
                          {supplier}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-4 p-4 bg-amber-50 rounded-md border-2 border-amber-800">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-amber-900">TOTAL DES ACHATS</h3>
                <p className="text-2xl font-bold text-amber-900">
                  {totalPurchasesAmount.toFixed(2)} {settings.currency}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-amber-900">TRANSACTIONS</h3>
                <p className="text-2xl font-bold text-amber-900">{filteredPurchases.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border-2 border-amber-800 bg-white">
            <Table>
              <TableHeader className="bg-amber-200">
                <TableRow>
                  <TableHead className="text-amber-900 font-bold">Date</TableHead>
                  <TableHead className="text-amber-900 font-bold">Fournisseur</TableHead>
                  <TableHead className="text-amber-900 font-bold">Articles</TableHead>
                  <TableHead className="text-amber-900 font-bold">Total</TableHead>
                  <TableHead className="text-amber-900 font-bold">Statut</TableHead>
                  <TableHead className="text-right text-amber-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-amber-700">
                      Aucun achat trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id} className="border-b border-amber-300">
                      <TableCell className="text-amber-900">
                        {new Date(purchase.date).toLocaleDateString()}
                        <div className="text-xs text-amber-700">{new Date(purchase.date).toLocaleTimeString()}</div>
                      </TableCell>
                      <TableCell className="font-medium text-amber-900">{purchase.supplier}</TableCell>
                      <TableCell className="text-amber-900">{purchase.items}</TableCell>
                      <TableCell className="text-amber-900">
                        {purchase.total.toFixed(2)} {settings.currency}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="capitalize bg-blue-100 text-blue-800 border-2 border-blue-500"
                        >
                          {purchase.status}
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
