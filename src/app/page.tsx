'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

export default function VerificationPage() {
  const [idNumber, setIdNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle verification logic here
    console.log('Verifying ID:', idNumber)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-[#004D40] text-white rounded-2xl">
        <CardContent className="p-6 space-y-8">
          {/* Logo Section */}
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-4 w-24 h-24 flex items-center justify-center">
              <Image
                src="/logoround.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          {/* Title Section */}
          <h1 className="text-2xl md:text-4xl font-bold text-center leading-tight">
            WELCOME TO OUR VERIFICATION PAGE.
          </h1>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-center text-slate-200">
                Enter the ID Number in the field below
              </p>
              <Input
                type="text"
                placeholder="GA-XXXX-XXXX"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                pattern="GA-\d{4}-\d{4}"
                className="bg-white text-black placeholder:text-gray-500 h-12 text-lg text-center"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#FFA000] hover:bg-[#FF8F00] text-white font-semibold py-6 text-lg"
            >
              SUBMIT
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

