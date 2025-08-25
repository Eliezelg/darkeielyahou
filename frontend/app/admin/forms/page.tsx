'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Cette page va automatiquement rediriger vers la section des inscriptions au gala
export default function FormsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page des galas après un court délai
    setTimeout(() => {
      router.push('/admin/forms/gala');
    }, 100);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      <p className="mt-4 text-gray-500">Redirection vers les inscriptions au gala...</p>
    </div>
  );
}
