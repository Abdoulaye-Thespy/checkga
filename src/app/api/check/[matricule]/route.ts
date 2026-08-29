import { NextRequest, NextResponse } from 'next/server';

// Données en mémoire (instance) 
let studentData = {
  Student: [
    {
      Matricule: "GA-2025-T002",
      Name: "Njigouh Abdoulaye Razak",
      Title: "Co-Founder and Director",
      Email: "njigouhrazak@iut-dhaka.edu",
      Department: "Computer Science",
      Year: 2025
    },
    // Ajoutez d'autres enseignants ici
    // {
    //   Matricule: "GA-2025-A001",
    //   Name: "Jean Dupont",
    //   Title: "Professor",
    //   Email: "jean@example.com"
    // }
  ]
};

// Fonction utilitaire pour trouver un étudiant par matricule
const findStudentByMatricule = (matricule: string) => {
  return studentData.Student.find((student: any) => student.Matricule === matricule);
};

// Handle GET requests for a specific student
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract the matricule from the request URL
    const { searchParams } = new URL(req.url);
    const matricule = searchParams.get('matricule');

    if (!matricule) {
      return NextResponse.json(
        { error: 'Matricule is required' }, 
        { status: 400 }
      );
    }

    // Find the student with the matching matricule
    const student = findStudentByMatricule(matricule);

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found with matricule: ' + matricule }, 
        { status: 404 }
      );
    }

    // Retourner les données de l'étudiant
    return NextResponse.json({ 
      success: true, 
      data: student 
    });

  } catch (error: any) {
    console.error('Error fetching student data:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to fetch student data', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optionnel: Gérer POST pour ajouter des étudiants
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { matricule, name, title, email, department, year, ...otherFields } = body;

    if (!matricule || !name) {
      return NextResponse.json(
        { error: 'Matricule and Name are required' }, 
        { status: 400 }
      );
    }

    // Vérifier si l'étudiant existe déjà
    const existingStudent = findStudentByMatricule(matricule);
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this matricule already exists' }, 
        { status: 409 }
      );
    }

    // Ajouter le nouvel étudiant
    const newStudent = {
      Matricule: matricule,
      Name: name,
      Title: title || 'Not specified',
      Email: email || '',
      Department: department || '',
      Year: year || new Date().getFullYear(),
      ...otherFields
    };

    studentData.Student.push(newStudent);

    return NextResponse.json({ 
      success: true, 
      data: newStudent 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding student:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to add student', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optionnel: Gérer DELETE pour supprimer un étudiant
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const matricule = searchParams.get('matricule');

    if (!matricule) {
      return NextResponse.json(
        { error: 'Matricule is required' }, 
        { status: 400 }
      );
    }

    const index = studentData.Student.findIndex((s: any) => s.Matricule === matricule);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Student not found' }, 
        { status: 404 }
      );
    }

    const deletedStudent = studentData.Student.splice(index, 1)[0];

    return NextResponse.json({ 
      success: true, 
      data: deletedStudent 
    });

  } catch (error: any) {
    console.error('Error deleting student:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to delete student', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optionnel: Gérer PUT pour mettre à jour un étudiant
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { matricule, ...updateData } = body;

    if (!matricule) {
      return NextResponse.json(
        { error: 'Matricule is required' }, 
        { status: 400 }
      );
    }

    const index = studentData.Student.findIndex((s: any) => s.Matricule === matricule);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Student not found' }, 
        { status: 404 }
      );
    }

    // Mettre à jour l'étudiant
    studentData.Student[index] = {
      ...studentData.Student[index],
      ...updateData
    };

    return NextResponse.json({ 
      success: true, 
      data: studentData.Student[index] 
    });

  } catch (error: any) {
    console.error('Error updating student:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to update student', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}