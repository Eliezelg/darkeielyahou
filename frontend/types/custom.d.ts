// Déclarations pour les modules CSS
// Permet d'importer les fichiers CSS comme modules TypeScript
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

// Déclarations pour les fichiers d'images
// Permet d'importer les images dans les fichiers TypeScript
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

// Déclarations pour les modules personnalisés
declare module '@/lib/api' {
  export * from '@/lib/api';

  export function post(arg0: string, formData: { phone: string; totalAttendees: number; email: string; firstName: string; lastName: string; phoneCountryCode: string; phoneNumber: string; city: string; maleAttendees: string; femaleAttendees: string; }): { data: any; } | PromiseLike<{ data: any; }> {
    throw new Error("Function not implemented.");
  }
}

declare module '@/config' {
  export * from '@/config';
}

declare module '@/hooks/useAuth' {
  export * from '@/hooks/useAuth';
}

// Déclaration pour les variables d'environnement
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SITE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// Déclaration pour les objets globaux
interface Window {
  // Ajoutez ici les propriétés globales si nécessaire
  gtag?: (...args: any[]) => void;
}
