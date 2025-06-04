'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { generateUserEmailTemplate, FormData } from "./email-templates";
import { CalendarHeart, Loader2 } from "lucide-react";
import api from "@/lib/api";

// Composants du formulaire
import { PersonalInfoFields } from "./personal-info-fields";
import { CityField } from "./city-field";
import { AttendeesFields } from "./attendees-fields";
import { GalaSuccessMessage } from "./success-message";
import { GalaFormHeader } from "./form-header";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom de famille doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phoneCountryCode: z.string().min(2, { message: "Veuillez sélectionner un indicatif" }),
  phoneNumber: z.string().min(5, { message: "Le numéro de téléphone doit être valide" }),
  city: z.string({ required_error: "Veuillez sélectionner une ville" }),
  maleAttendees: z.string(),
  femaleAttendees: z.string(),
}).refine((data) => {
  const maleCount = Number(data.maleAttendees || "0");
  const femaleCount = Number(data.femaleAttendees || "0");
  return maleCount > 0 || femaleCount > 0;
}, {
  message: "Veuillez indiquer au moins un participant (homme ou femme)",
  path: ["maleAttendees", "femaleAttendees"] // Les deux champs seront marqués comme invalides
});

export default function GalaForm() {
  const { toast } = useToast();

  // État local pour l'indicatif pays du téléphone et état de soumission
  const [countryCode, setCountryCode] = useState("+972");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneCountryCode: "+972",
      phoneNumber: "",
      city: "",
      maleAttendees: "0",
      femaleAttendees: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Formulaire soumis avec les valeurs:", values);
    
    // Indiquer que la soumission est en cours
    setIsSubmitting(true);
    
    // Préparation des données avec les champs mis à jour
    const formData = {
      ...values,
      phone: `${values.phoneCountryCode}${values.phoneNumber}`,
      totalAttendees: Number(values.maleAttendees || "0") + Number(values.femaleAttendees || "0")
    };
    
    try {
      console.log("Envoi des données au serveur:", formData);
      
      // Envoyer les données au serveur via l'API centralisée
      const { data } = await api.post('/api/forms/GALA', formData);
      
      // Afficher le message de succès du serveur ou un message par défaut
      toast({
        title: "Inscription envoyée",
        description: data.message || "Votre inscription au gala a été enregistrée avec succès. Nous vous contacterons prochainement avec plus de détails."
      });
      
      // Marquer le formulaire comme soumis pour afficher le message de confirmation
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Si le formulaire a été soumis, afficher le message de confirmation
  if (isSubmitted) {
    return <GalaSuccessMessage />;
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <GalaFormHeader />

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Champs d'informations personnelles */}
            <PersonalInfoFields control={form.control} setCountryCode={setCountryCode} />
            
            {/* Champ de sélection de ville */}
            <CityField control={form.control} />
            
            {/* Champs de nombre de participants */}
            <AttendeesFields control={form.control} />
            
            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer mon inscription"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Additional Information */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Pour toute question concernant les galas, n'hésitez pas à nous contacter directement 
          par téléphone ou via le <a href="/contact" className="underline">formulaire de contact</a>.
        </p>
      </div>
    </div>
  );
}
