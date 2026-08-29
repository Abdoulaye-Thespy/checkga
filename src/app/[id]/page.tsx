'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import VerificationCard from '@/components/ui/verification-card';

export default function StudentPage() {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id; // ID comme GA-2025-T002

  useEffect(() => {
    async function fetchStudentData() {
      try {
        console.log('Fetching student with ID:', id);
        
        // Appeler votre API /api/data
        const response = await fetch('/api/s3');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        console.log('API Response:', result);
        
        // ✅ Structure correcte: result.data.Student est un tableau
        const students = result.data?.Student || [];
        console.log('Students array:', students);
        console.log('Is students an array?', Array.isArray(students));
        
        // Trouver l'étudiant avec le matricule correspondant
        // Note: Votre API utilise "Matricule" avec majuscule
        const student = students.find((student: any) => student.Matricule === id);
        console.log('Found student:', student);

        if (!student) {
          console.log('Student not found, redirecting to 404');
          router.push('/404');
        } else {
          setStudentData(student);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to load student data');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchStudentData();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004D40]"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {studentData && <VerificationCard student={studentData} />}
    </div>
  );
}