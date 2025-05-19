'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Heart } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  phone: z.string().min(9, { message: "Le numéro de téléphone doit être valide" }),
  city: z.string().min(2, { message: "La ville est requise" }),
  children: z.string().min(1, { message: "Veuillez indiquer le nombre d'enfants et leurs âges" }),
  aidType: z.string({ required_error: "Veuillez sélectionner un type d'aide" }),
  situation: z.string().min(10, { message: "Veuillez décrire brièvement votre situation" }),
  // Nous n'utilisons pas de champ de téléchargement de fichier pour l'instant
  rgpdConsent: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter le traitement de vos données personnelles",
  }),
});

export default function SocialAidForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      children: "",
      situation: "",
      rgpdConsent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    try {
      // Définir une URL sécurisée pour les requêtes API
      const apiBaseUrl = typeof window !== 'undefined' 
        ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
        : 'http://localhost:3001'; // Fallback pour SSR
        
      // Envoyer les données au serveur
      const response = await fetch(`${apiBaseUrl}/api/forms/SOCIAL_AID`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Afficher le message de succès du serveur ou un message par défaut
        toast({
          title: "Demande envoyée",
          description: data.message || "Votre demande d'aide sociale a été envoyée avec succès. Nous vous contacterons prochainement."
        });
        
        // Envoyer un email de confirmation
        await fetch(`${apiBaseUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: `Demande d'aide sociale - ${values.name}`,
            text: `
Bonjour,

Nous avons bien reçu votre demande d'aide sociale.

Détails de votre demande:
- Nom: ${values.name}
- Téléphone: ${values.phone}
- Ville: ${values.city}
- Situation: ${values.situation}
- Enfants: ${values.children}
- Type d'aide: ${values.aidType}

Nous traiterons votre demande dans les plus brefs délais et vous contacterons prochainement.

Cordialement,
L'équipe Darkei Elyahou
            `
          }),
        });
        
        // Reset form
        form.reset();
      } else {
        // Afficher un message d'erreur
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer."
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de communiquer avec le serveur. Veuillez vérifier votre connexion et réessayer."
      });
    }
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-primary/5 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Heart className="h-6 w-6 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="font-medium text-lg mb-2">À propos de ce formulaire</h2>
            <p className="text-muted-foreground">
              Ce formulaire vous permet de nous faire part de votre situation et de vos besoins. 
              Toutes les informations fournies sont traitées avec la plus grande confidentialité.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="border rounded-xl p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom et Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom complet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville / Quartier</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre ville ou quartier" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Children */}
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enfants (nombre et âges)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: 3 enfants (2, 5 et 8 ans)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Aid Type */}
            <FormField
              control={form.control}
              name="aidType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'aide souhaitée</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type d'aide" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fetes">Bons pour les fêtes</SelectItem>
                      <SelectItem value="rentree">Rentrée scolaire</SelectItem>
                      <SelectItem value="electricite">Électricité</SelectItem>
                      <SelectItem value="loyer">Loyer</SelectItem>
                      <SelectItem value="sante">Santé</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Situation */}
            <FormField
              control={form.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre situation en quelques mots</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez brièvement votre situation actuelle..." 
                      className="resize-none min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note sur les pièces justificatives */}
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">
                Documents justificatifs
              </p>
              <p className="text-sm text-muted-foreground">
                Pour soumettre des documents justificatifs, veuillez les envoyer par email après avoir rempli ce formulaire.
              </p>
            </div>

            {/* RGPD Consent */}
            <FormField
              control={form.control}
              name="rgpdConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      J'autorise le traitement de mes données personnelles
                    </FormLabel>
                    <FormDescription>
                      Vos données sont traitées dans le respect du RGPD et uniquement dans le cadre de votre demande.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Envoyer ma demande</Button>
          </form>
        </Form>
      </div>

      {/* Privacy Notice */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Vos informations personnelles sont traitées avec la plus grande confidentialité. 
          Pour plus d'informations, consultez notre <a href="/mentions-legales" className="underline">politique de confidentialité</a>.
        </p>
      </div>
    </div>
  );
}
