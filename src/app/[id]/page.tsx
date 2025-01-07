'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import VerificationCard from '@/components/ui/verification-card';

export default function StudentPage() {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams(); // Use useParams to get dynamic route parameters
  const id = params.id; // Access the id parameter

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const response = await fetch(`/api/s3`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const students = data.data;
        // Assuming the API returns an object with a "Student" array

        // Find the student with the matching ID
        const student = students.find((student: any) => student.Matricule === id);
        console.log(student);

        if (!student) {
          router.push('/404'); // Redirect to a 404 page if student not found
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {studentData && <VerificationCard student={studentData} />}
    </div>
  );
}