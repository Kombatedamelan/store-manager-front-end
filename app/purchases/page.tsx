"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye } from "lucide-react"

// Sample purchases data
const initialPurchases = [
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
]

export default function PurchasesPage() {
  const [purchases] = useState(initialPurchases)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter purchases based on search query
  const filteredPurchases = purchases.filter((purchase) =>
    purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">ACHATS</h1>
        <Link href="/purchases/new">
          <Button className="bg-amber-800 hover:bg-amber-900 text-white border-2 border-amber-900">
            <Plus className="mr-2 h-4 w-4" /> Nouvel Achat
          </Button>
        </Link>
      </div>

      <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
        <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
          <CardTitle>HISTORIQUE DES ACHATS</CardTitle>
          <CardDescription className="text-amber-100">Consultez et gérez tous vos achats d'inventaire</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
              <Input
                placeholder="Rechercher par fournisseur..."
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
                      <TableCell className="text-amber-900">{purchase.total.toFixed(2)} FCFA</TableCell>
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
