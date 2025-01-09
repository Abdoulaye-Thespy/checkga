'use client'

import { Card } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Image from "next/image"

interface Student {
  fullName: string
  role: string
  Matricule: string
  tel: string
  Email: string
  photoUrl: string
  comment: string
}

interface VerificationCardProps {
  student: Student;  // Use the Student type
}

export default function VerificationCard({ student }: VerificationCardProps) { // Change `user` to `student`
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
            src={student.photoUrl}
            alt={student.name}
            fill
            className="rounded-full object-cover border-4 border-white"
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="grid gap-y-2">
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Name:</span>
              <span>{student.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Status:</span>
              <span>{student.role}</span> {/* Assuming 'role' corresponds to 'profession' */}
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Matricule:</span>
              <span>{student.Matricule}</span> {/* Corrected from `Matricule` to `matricule` */}
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Telephone:</span>
              <span>{student.tel}</span> {/* Corrected from `tel` to `telephone` */}
            </div>
            <div className="flex gap-2">
              <span className="text-[#A7F3D0] min-w-[100px]">Email:</span>
              <span className="break-all">{student.Email}</span> {/* Corrected from `Email` to `email` */}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <div className="flex gap-2">
          <span className="text-[#00E676]">Comment:</span>
          <span className="text-[#00E676]">{student.comment}</span>
        </div>
      </div>
    </Card>
  )
}