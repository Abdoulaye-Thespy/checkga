import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-[#004D40] text-white rounded-2xl">
        <CardContent className="p-6 space-y-8">
          {/* Logo Section Loading with pulse animation */}
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-4 w-32 h-32 flex items-center justify-center animate-pulse">
              <Skeleton className="w-20 h-20 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Title Section Loading */}
          <div className="flex justify-center">
            <Skeleton className="h-10 w-3/4 bg-gray-300 animate-pulse" />
          </div>

          {/* Form Section Loading */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Skeleton className="h-4 w-48 bg-gray-300 animate-pulse" />
              </div>
              <Skeleton className="h-12 w-full bg-white/20 animate-pulse" />
            </div>
            
            <Skeleton className="h-14 w-full bg-[#FFA000]/30 animate-pulse" />
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}