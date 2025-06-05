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
import { BookOpen } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  phone: z.string().min(9, { message: "Le numéro de téléphone doit être valide" }),
  ageAndFamily: z.string().min(2, { message: "Veuillez indiquer votre âge et situation familiale" }),
  profession: z.string().min(2, { message: "Veuillez indiquer votre profession" }),
  kollelType: z.string({ required_error: "Veuillez sélectionner un Kollel" }),
  availability: z.string().min(2, { message: "Veuillez indiquer vos horaires disponibles" }),
  previousStudies: z.string().min(2, { message: "Veuillez indiquer vos études déjà effectuées" }),
  receiveInfo: z.boolean().optional(),
});

export default function KollelMembershipForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      ageAndFamily: "",
      profession: "",
      availability: "",
      previousStudies: "",
      receiveInfo: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    try {
      // Envoyer les données au serveur
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forms/KOLLEL_MEMBERSHIP`, {
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
          description: data.message || "Votre demande d'adhésion au Kollel a été envoyée avec succès. Nous vous contacterons prochainement."
        });
        
        // Envoyer un email de confirmation
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: `Demande d'adhésion au Kollel - ${values.name}`,
            text: `
Bonjour,

Nous avons bien reçu votre demande d'adhésion au Kollel.

Détails de votre demande:
- Nom: ${values.name}
- Téléphone: ${values.phone}
- Programme: ${values.kollelType}
- Horaires préférés: ${values.availability}
- Études déjà effectuées: ${values.previousStudies}

Nous examinerons votre demande et vous contacterons prochainement.

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
          description: data.error || "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",

        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de communiquer avec le serveur. Veuillez vérifier votre connexion et réessayer.",

      });
    }
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-primary/5 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <BookOpen className="h-6 w-6 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="font-medium text-lg mb-2">À propos de ce formulaire</h2>
            <p className="text-muted-foreground">
              Ce formulaire vous permet de faire une demande d'adhésion à l'un de nos Kollelim. 
              Nous proposons différentes options adaptées à votre niveau d'étude et à votre emploi du temps. 
              Après réception de votre demande, nous vous contacterons pour discuter des détails.
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

            {/* Age and Family Situation */}
            <FormField
              control={form.control}
              name="ageAndFamily"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Âge et situation familiale</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: 28 ans, marié, 2 enfants" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profession */}
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Votre métier ou occupation" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kollel Type */}
            <FormField
              control={form.control}
              name="kollelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de Kollel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un Kollel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ohalei-esther">Kollel Ohalei Esther</SelectItem>
                      <SelectItem value="or-gabriel">Kollel Or Gabriel</SelectItem>
                      <SelectItem value="nichmat-hava">Kollel Nichmat Hava</SelectItem>
                      <SelectItem value="magen-david">Kollel Magen David</SelectItem>
                      <SelectItem value="vendredi">Kollel du Vendredi</SelectItem>
                      <SelectItem value="matin">Kollel du Matin</SelectItem>
                      <SelectItem value="soir">Kollel du Soir</SelectItem>
                      <SelectItem value="shabbat">Kollel de Shabbat</SelectItem>
                      <SelectItem value="cheovdim">Kollel Avrekhim Cheovdim</SelectItem>
                      <SelectItem value="daf-hayomi">Kollel Daf Hayomi</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Availability */}
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horaires disponibles</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Matin 8h-11h, Soir après 19h..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Précisez vos disponibilités pour nous aider à vous placer dans le Kollel le plus adapté.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Previous Studies */}
            <FormField
              control={form.control}
              name="previousStudies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Études déjà effectuées</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre parcours d'études (Guemara, Halakha, etc.)..." 
                      className="resize-none min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Précisez votre niveau et expérience dans l'étude de la Torah.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receive Information */}
            <FormField
              control={form.control}
              name="receiveInfo"
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
                      Je souhaite recevoir les horaires et conditions du Kollel
                    </FormLabel>
                    <FormDescription>
                      Vous recevrez des informations détaillées sur le Kollel choisi et ses conditions d'admission.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Envoyer ma demande</Button>
          </form>
        </Form>
      </div>

      {/* Additional Information */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Pour toute question concernant nos Kollelim, n'hésitez pas à nous contacter directement 
          par téléphone ou via le <a href="/contact" className="underline">formulaire de contact</a>.
        </p>
      </div>
    </div>
  );
}
