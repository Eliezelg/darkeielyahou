'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function GalaSuccessMessage() {
  const router = useRouter();
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center">
      <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold tracking-tight mb-2">Merci pour votre inscription !</h2>
      <p className="text-muted-foreground text-center mb-6">
        Votre inscription au gala a été enregistrée avec succès. 
        Vous recevrez prochainement un email de confirmation contenant 
        tous les détails relatifs à l'événement.
      </p>
      
      <div className="flex justify-center">
        <Button 
          onClick={() => {
            // Forcer le rechargement complet de la page pour s'assurer que tout est réinitialisé
            window.location.href = '/galas';
          }} 
          className="px-6"
        >
          Retour aux galas
        </Button>
      </div>
    </div>
  );
}
