import { NextRequest, NextResponse } from 'next/server';

// Données en mémoire (instance) 
// Ces données remplacent le fichier data.json qui était dans S3
const data = {
  Student: [
    {
      Matricule: "GA-2025-T002",
      Name: "Njigouh Abdoulaye Razak",
      Title: "Co-Founder and Director",
      Email: "directeur@globalacademy.cm",
      Department: "STAFF-MANAGEMENT",
      phone: "+237620224288",
      Year: "2025",
      comment:"STILL IN SERVICE",
      // photoUrl: "/profiledirecteur.png",
      photoUrl: "/profile2025.jpg",
    },
    {
      Matricule: "GA-2025-A001",
      Name: "Nsangou Mbombo Zounedou",
      Title: "Promoteur",
      Email: "promoteur@globalacademy.cm",
      Department: "STAFF-MANAGEMENT",
      Year: 2025,
      // photoUrl: "../public/profiledirecteur.png",
      phone: "+237620224288",
      comment:"STILL IN SERVICE"
    },
  ],
  // Vous pouvez ajouter d'autres collections si besoin
  // Teachers: [],
  // Courses: []
};

// Handle GET requests (Read operation)
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Log pour confirmer que la route est appelée
    console.log("GET /api/data called");
    
    // Simuler un petit délai pour montrer le chargement (optionnel)
    // await new Promise(resolve => setTimeout(resolve, 300));

    // Retourner toutes les données
    return NextResponse.json({ 
      success: true, 
      data: data 
    });

  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optionnel: Handle POST pour ajouter des données
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { collection, item } = body;

    console.log("POST /api/data called with:", { collection, item });

    if (!collection || !item) {
      return NextResponse.json(
        { error: 'Collection and item are required' }, 
        { status: 400 }
      );
    }

    // Vérifier si la collection existe
    if (!data[collection as keyof typeof data]) {
      return NextResponse.json(
        { error: 'Collection not found' }, 
        { status: 404 }
      );
    }

    // Ajouter l'item à la collection
    (data[collection as keyof typeof data] as any[]).push(item);

    return NextResponse.json({ 
      success: true, 
      data: item 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding data:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to add data', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optionnel: Handle PUT pour mettre à jour des données
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { collection, matricule, updateData } = body;

    console.log("PUT /api/data called with:", { collection, matricule, updateData });

    if (!collection || !matricule || !updateData) {
      return NextResponse.json(
        { error: 'Collection, matricule, and updateData are required' }, 
        { status: 400 }
      );
    }

    // Vérifier si la collection existe
    if (!data[collection as keyof typeof data]) {
      return NextResponse.json(
        { error: 'Collection not found' }, 
        { status: 404 }
      );
    }

    const collectionData = data[collection as keyof typeof data] as any[];
    const index = collectionData.findIndex((item: any) => item.Matricule === matricule);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Item not found' }, 
        { status: 404 }
      );
    }

    // Mettre à jour l'item
    collectionData[index] = {
      ...collectionData[index],
      ...updateData
    };

    return NextResponse.json({ 
      success: true, 
      data: collectionData[index] 
    });

  } catch (error: any) {
    console.error('Error updating data:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to update data', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

// Optionnel: Handle DELETE pour supprimer des données
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');
    const matricule = searchParams.get('matricule');

    console.log("DELETE /api/data called with:", { collection, matricule });

    if (!collection || !matricule) {
      return NextResponse.json(
        { error: 'Collection and matricule are required' }, 
        { status: 400 }
      );
    }

    // Vérifier si la collection existe
    if (!data[collection as keyof typeof data]) {
      return NextResponse.json(
        { error: 'Collection not found' }, 
        { status: 404 }
      );
    }

    const collectionData = data[collection as keyof typeof data] as any[];
    const index = collectionData.findIndex((item: any) => item.Matricule === matricule);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Item not found' }, 
        { status: 404 }
      );
    }

    // Supprimer l'item
    const deletedItem = collectionData.splice(index, 1)[0];

    return NextResponse.json({ 
      success: true, 
      data: deletedItem 
    });

  } catch (error: any) {
    console.error('Error deleting data:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to delete data', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}