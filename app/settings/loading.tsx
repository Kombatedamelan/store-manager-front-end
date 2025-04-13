import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-amber-100 p-4 rounded-lg border-4 border-amber-800 shadow-md">
        <div className="h-8 w-40 bg-amber-200 animate-pulse rounded-md"></div>
      </div>

      <div className="h-12 w-full bg-amber-200 animate-pulse rounded-md mb-6"></div>

      <div className="border-4 border-amber-800 shadow-md bg-amber-100 rounded-lg">
        <div className="bg-amber-800 p-4 border-b-2 border-amber-900">
          <div className="h-6 w-48 bg-amber-700 animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-amber-700 animate-pulse rounded-md"></div>
        </div>
        <div className="p-6">
          <LoadingSpinner text="Chargement des paramètres..." />
        </div>
      </div>
    </div>
  )
}
