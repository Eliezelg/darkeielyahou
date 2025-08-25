'use client';

import { CalendarHeart } from "lucide-react";

export function GalaFormHeader() {
  return (
    <div className="space-y-2 text-center">
      <div className="inline-block bg-blue-100 p-2 rounded-full">
        <CalendarHeart className="h-6 w-6 text-blue-600" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight">Inscription au Gala</h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        Remplissez ce formulaire pour vous inscrire au prochain gala Darkei Elyahou.
        Les détails de l'événement vous seront envoyés par email.
      </p>
    </div>
  );
}
