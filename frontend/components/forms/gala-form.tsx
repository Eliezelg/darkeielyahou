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
import { CalendarHeart } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(9, { message: "Le numéro de téléphone doit être valide" }),
  city: z.string({ required_error: "Veuillez sélectionner une ville" }),
  attendees: z.string().min(1, { message: "Veuillez indiquer le nombre de personnes" }),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
  AllodonsLink: z.boolean().optional(),
});

export default function GalaForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      attendees: "",
      dietaryRestrictions: "",
      message: "",
      AllodonsLink: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    try {
      // Envoyer les données au serveur
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/forms/GALA_REGISTRATION`, {
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
          title: "Inscription envoyée",
          description: data.message || "Votre inscription au gala a été enregistrée avec succès. Nous vous contacterons prochainement avec plus de détails."
        });
        
        // Envoyer un email de confirmation
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: values.email, // Envoyer au participant
            from: "contact@darkei-elyahou.org", // L'expéditeur
            subject: `Confirmation d'inscription au gala - ${values.name}`,
            text: `
Bonjour,

Nous avons bien reçu votre inscription au gala de Darkei Elyahou.

Détails de votre inscription:
- Nom: ${values.name}
- Email: ${values.email}
- Téléphone: ${values.phone}
- Ville: ${values.city}
- Nombre de personnes: ${values.attendees}
${values.message ? `- Message: ${values.message}` : ''}
${values.dietaryRestrictions ? `- Restrictions alimentaires: ${values.dietaryRestrictions}` : ''}

Nous vous remercions pour votre confiance et vous contacterons prochainement avec plus de détails concernant l'événement.

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
          <CalendarHeart className="h-6 w-6 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="font-medium text-lg mb-2">À propos des galas</h2>
            <p className="text-muted-foreground">
              Les galas annuels de Darkei Elyahou sont des moments privilégiés de rencontre et de soutien 
              à nos actions. Ils se déroulent dans plusieurs villes et offrent un moment convivial 
              et inspirant, autour d'un repas et d'interventions de qualité.
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

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="votre@email.com" {...field} />
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
                  <FormLabel>Ville du gala</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la ville" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="paris">Paris</SelectItem>
                      <SelectItem value="jerusalem">Jérusalem</SelectItem>
                      <SelectItem value="strasbourg">Strasbourg</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Attendees */}
            <FormField
              control={form.control}
              name="attendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de personnes</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de participants" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           
            {/* Optional Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Si vous avez des demandes particulières..." 
                      className="resize-none min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <Button type="submit" className="w-full">Envoyer mon inscription</Button>
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
