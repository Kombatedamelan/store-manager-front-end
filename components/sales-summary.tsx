"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Lun", total: 420 },
  { name: "Mar", total: 380 },
  { name: "Mer", total: 520 },
  { name: "Jeu", total: 490 },
  { name: "Ven", total: 610 },
  { name: "Sam", total: 750 },
  { name: "Dim", total: 480 },
]

export function SalesSummary() {
  return (
    <Card className="border-4 border-amber-800 shadow-md bg-amber-100">
      <CardHeader className="bg-amber-800 text-white border-b-2 border-amber-900">
        <CardTitle>VENTES HEBDOMADAIRES</CardTitle>
        <CardDescription className="text-amber-100">Aperçu de vos ventes pour la semaine passée</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#78350f" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#78350f"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip formatter={(value: number) => [`${value} FCFA`, "Total"]} labelFormatter={(label) => `${label}`} />
            <Bar dataKey="total" fill="#92400e" radius={[4, 4, 0, 0]} className="fill-amber-700" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
