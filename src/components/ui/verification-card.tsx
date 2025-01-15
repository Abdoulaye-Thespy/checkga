'use client'

import { Card } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Image from "next/image"

interface Student {
  fullName: string
  role: string
  depart: string
  matricule: string
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
<Card className="w-full max-w-md bg-[#000] text-white p-6 rounded-2xl">
      {/* Header with Logo and Verification Badge */}

      <div className="flex justify-between items-start mb-8">
        <div className="bg-white rounded-full p-2 w-14 h-14 flex items-center justify-center">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-1">
              
              <Image
                src="/logoround.png"
                alt="Logo"
                width={420}
                height={420} 
                className="object-contain"
              />
            </div>
          </div>

        </div>
        <div className="flex flex-col items-center">
          <div className="bg-[#00E676] rounded-lg p-3 rounded-full border-black flex flex-col items-center gap-1">
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
            alt={student.fullName}
            fill
            className="rounded-full object-cover border-4 border-white hover:scale-110"
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="grid gap-y-2">
            <div className="flex gap-2">
              <span className="text-[#b0862c] min-w-[100px] font-bold">Name :</span>
              <span>{student.fullName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#b0862c] min-w-[100px] font-bold">Status :</span>
              <span>{student.role}</span> {/* Assuming 'role' corresponds to 'profession' */}
            </div>
            <div className="flex gap-2">
              <span className="text-[#b0862c] min-w-[100px] font-bold">Matricule :</span>
              <span>{student.matricule}</span> {/* Corrected from `Matricule` to `matricule` */}
            </div>
            <div className="flex gap-2">
              <span className="text-[#b0862c] min-w-[100px] font-bold">Phone :</span>
              <span>{student.tel}</span> {/* Corrected from `tel` to `telephone` */}
            </div>
            <div className="flex gap-2">
              <span className="text-[#b0862c] min-w-[100px] font-bold">Email :</span>
              <span className="break-all">{student.Email}</span> {/* Corrected from `Email` to `email` */}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-6 place-items-center">
        <div className="flex gap-2">
          <span className="text-[#00E676]">Comment :</span>
          <span className="text-[#00E676]">{student.comment}</span>
        </div>
      </div>
    </Card>
  )
}