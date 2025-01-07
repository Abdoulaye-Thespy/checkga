'use client'

import { Card } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Image from "next/image"

interface VerificationCardProps {
  student: {
    name: string
    profession: string
    matricule: string
    telephone: string
    email: string
    photoUrl: string
    comment: string
  }
}

export default function VerificationCard({ user }: VerificationCardProps) {
  return (
    <Card className="w-full max-w-md bg-[#004D40] text-white p-6 rounded-2xl">
      {/* Header with Logo and Verification Badge */}
      <div className="flex justify-between items-start mb-8">
        <div className="bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center">
          <Image
            src="/logoround.png"
            alt="Logo"
            width={62}
            height={62}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-[#00E676] rounded-lg p-3 flex flex-col items-center gap-1">
            <CheckCircle className="w-8 h-8 text-white" />
            <span className="font-bold text-white text-sm">VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-32 h-32 mx-auto md:mx-0">
          <Image
            src={user.photoUrl}
            alt={user.name}
            fill
            className="rounded-full object-cover border-4 border-white"
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="grid gap-y-2">
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Statut:</span>
              <span>{user.role}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Matricule:</span>
              <span>{user.Matricule}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Telephone:</span>
              <span>{user.tel}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Email:</span>
              <span className="break-all">{user.Email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <div className="flex gap-2">
          <span className="text-[#00E676]">Comment:</span>
          <span className="text-[#00E676]">{user.comment}</span>
        </div>
      </div>
    </Card>
  )
}

