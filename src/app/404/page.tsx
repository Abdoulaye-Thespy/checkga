import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Student Not Found</CardTitle>
          <CardDescription>
            The student information you're looking for could not be found.
          </CardDescription>
          <Button asChild className="mt-4">
            <Link href="/">Return Home</Link>
          </Button>
        </CardHeader>
      </Card>
    </div>
  )
}

