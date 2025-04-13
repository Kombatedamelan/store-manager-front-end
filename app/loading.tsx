import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="bg-amber-100 border-4 border-amber-800 rounded-lg p-8 shadow-lg">
        <LoadingSpinner size="lg" text="Chargement en cours..." />
      </div>
    </div>
  )
}
