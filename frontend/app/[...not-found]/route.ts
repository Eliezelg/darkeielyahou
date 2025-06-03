import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  
  // Liste des chemins qui doivent retourner 410 Gone
  const gonePaths = [
    '/actions/reconversion',
    '/actions/soutien',
    '/actions/aide',
    '/actions/pret',
    '/kollelim',
    '/browserconfig.xml'
  ];

  // Vérifier si le chemin actuel est dans la liste des chemins supprimés
  if (gonePaths.some(path => pathname.startsWith(path))) {
    return new NextResponse(null, {
      status: 410,
      statusText: 'Gone',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  // Pour toutes les autres URLs non trouvées, retourner 404
  return new NextResponse(null, {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

// Assurez-vous que cette route est dynamique
export const dynamic = 'force-dynamic';
