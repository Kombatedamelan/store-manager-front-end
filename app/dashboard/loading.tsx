import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <div className="h-8 w-40 bg-amber-200 animate-pulse rounded-md"></div>
        <div className="h-6 w-32 bg-amber-200 animate-pulse rounded-md"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-4 border-amber-800 shadow-md bg-amber-100 rounded-lg h-32">
            <div className="bg-amber-800 p-2 border-b-2 border-amber-900">
              <div className="h-4 w-24 bg-amber-700 animate-pulse rounded-md"></div>
            </div>
            <div className="p-4 flex items-center justify-center">
              <div className="h-10 w-28 bg-amber-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-4 border-amber-800 shadow-md bg-amber-100 rounded-lg">
        <div className="bg-amber-800 p-4 border-b-2 border-amber-900">
          <div className="h-6 w-48 bg-amber-700 animate-pulse rounded-md"></div>
        </div>
        <div className="p-6">
          <LoadingSpinner text="Chargement du tableau de bord..." />
        </div>
      </div>
    </div>
  )
}
