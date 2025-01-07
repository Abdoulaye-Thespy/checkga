import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#004D40] text-white p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-8">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
          <Skeleton className="h-10 w-24 rounded-lg bg-gray-200" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          <Skeleton className="h-32 w-32 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-4 w-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <Skeleton className="h-4 w-full bg-gray-200" />
        </div>
      </Card>
    </div>
  )
}

