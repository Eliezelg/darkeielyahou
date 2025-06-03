'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

interface FormCategory {
  id: string;
  name: string;
  prismaType: string;
}

// Définition des catégories de formulaires
export const formCategories: FormCategory[] = [
  { id: 'gala', name: 'Inscriptions Gala', prismaType: 'GALA_REGISTRATION' },
  { id: 'contact', name: 'Formulaires Contact', prismaType: 'OTHER' },
  { id: 'social-aid', name: 'Aide Sociale', prismaType: 'SOCIAL_AID' },
  { id: 'kollel', name: 'Kollel', prismaType: 'KOLLEL' },
  { id: 'loan', name: 'Demandes de Prêt', prismaType: 'LOAN' },
  { id: 'donation', name: 'Dons', prismaType: 'DONATION' },
  { id: 'autres', name: 'Autres Demandes', prismaType: 'OTHER' },
];

export function FormCategorySidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Déterminer la catégorie active
  const getActiveCategoryFromPathname = () => {
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    
    // Si nous sommes sur la page principale ou le dashboard
    if (lastSegment === 'admin' || lastSegment === 'dashboard') {
      return 'dashboard';
    }
    
    // Vérifier si nous sommes sur une page de catégorie
    const categoryMatch = formCategories.find(cat => cat.id === lastSegment);
    if (categoryMatch) {
      return categoryMatch.id;
    }
    
    return '';
  };
  
  const activeCategory = getActiveCategoryFromPathname();

  return (
    <div className="w-64 h-full bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Administration</h2>
        
        <nav className="space-y-1">
          <Button
            variant={activeCategory === 'dashboard' ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start',
              activeCategory === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            )}
            onClick={() => router.push('/admin/dashboard')}
          >
            Tableau de bord
          </Button>
          
          <div className="pt-4">
            <p className="px-1 text-sm font-medium text-gray-500 mb-2">Catégories de formulaires</p>
          </div>
          
          {formCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start', 
                activeCategory === category.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              )}
              onClick={() => router.push(`/admin/forms/${category.id}`)}
            >
              {category.name}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
