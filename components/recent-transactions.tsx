import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "sale",
    description: "Vente #1234",
    amount: 249.99,
    date: "2023-04-13T10:45:00",
    status: "complété",
  },
  {
    id: 2,
    type: "purchase",
    description: "Réapprovisionnement",
    amount: 1250.0,
    date: "2023-04-13T09:30:00",
    status: "complété",
  },
  {
    id: 3,
    type: "sale",
    description: "Vente #1233",
    amount: 79.99,
    date: "2023-04-13T08:15:00",
    status: "complété",
  },
  {
    id: 4,
    type: "sale",
    description: "Vente #1232",
    amount: 129.5,
    date: "2023-04-12T17:45:00",
    status: "complété",
  },
  {
    id: 5,
    type: "purchase",
    description: "Paiement Fournisseur",
    amount: 450.0,
    date: "2023-04-12T14:30:00",
    status: "complété",
  },
]

export function RecentTransactions() {
  return (
    <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
      <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
        <CardTitle>TRANSACTIONS RÉCENTES</CardTitle>
        <CardDescription className="text-amber-100">Vos dernières transactions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between space-x-4 p-3 border-2 border-amber-300 rounded-md bg-amber-50"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "sale"
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-blue-100 border-2 border-blue-500"
                  }`}
                >
                  {transaction.type === "sale" ? (
                    <ArrowUpRight className={`h-5 w-5 text-green-600`} />
                  ) : (
                    <ArrowDownRight className={`h-5 w-5 text-blue-600`} />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-amber-900">{transaction.description}</p>
                  <p className="text-xs text-amber-700">{new Date(transaction.date).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={transaction.type === "sale" ? "default" : "secondary"}
                  className={`text-xs ${transaction.type === "sale" ? "bg-green-100 text-green-800 border border-green-500" : "bg-blue-100 text-blue-800 border border-blue-500"}`}
                >
                  {transaction.type === "sale" ? "Vente" : "Achat"}
                </Badge>
                <span
                  className={`text-sm font-medium ${transaction.type === "sale" ? "text-green-700" : "text-blue-700"}`}
                >
                  {transaction.type === "sale" ? "+" : "-"}
                  {transaction.amount.toFixed(2)} FCFA
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
