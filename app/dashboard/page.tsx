import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Package, AlertTriangle, TrendingUp } from "lucide-react"
import { SalesSummary } from "@/components/sales-summary"
import { TopProducts } from "@/components/top-products"
import { RecentTransactions } from "@/components/recent-transactions"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">TABLEAU DE BORD</h1>
        <Badge
          variant="outline"
          className="text-sm border-2 border-amber-800 px-3 py-1 font-bold text-amber-900 bg-amber-50"
        >
          {new Date().toLocaleDateString()}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle className="text-sm font-medium">VENTES DU JOUR</CardTitle>
            <DollarSign className="w-4 h-4 text-amber-100" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-900">1,245.89 FCFA</div>
            <p className="text-xs text-green-700 font-bold">+18% depuis hier</p>
          </CardContent>
        </Card>
        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle className="text-sm font-medium">PRODUITS VENDUS</CardTitle>
            <Package className="w-4 h-4 text-amber-100" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-900">42</div>
            <p className="text-xs text-green-700 font-bold">+8% depuis hier</p>
          </CardContent>
        </Card>
        <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-amber-800 text-white border-b-2 border-amber-900">
            <CardTitle className="text-sm font-medium">TOTAL TRANSACTIONS</CardTitle>
            <TrendingUp className="w-4 h-4 text-amber-100" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-900">15</div>
            <p className="text-xs text-green-700 font-bold">+5% depuis hier</p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive" className="bg-red-100 border-4 border-red-600 text-red-800">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="font-bold">ALERTE STOCK FAIBLE</AlertTitle>
        <AlertDescription>3 produits sont en rupture de stock. Vérifiez l'inventaire.</AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <SalesSummary />
        <TopProducts />
      </div>

      <RecentTransactions />
    </div>
  )
}
