'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Banknote } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  phone: z.string().min(9, { message: "Le numéro de téléphone doit être valide" }),
  amount: z.string().min(1, { message: "Veuillez indiquer le montant souhaité" }),
  loanPurpose: z.string({ required_error: "Veuillez sélectionner l'objet du prêt" }),
  availability: z.string().min(1, { message: "Veuillez indiquer vos disponibilités pour un rendez-vous" }),
  guarantorAwareness: z.boolean().refine((val) => val === true, {
    message: "Vous devez confirmer être conscient que 1 à 3 garants seront exigés",
  }),
});

export default function LoanRequestForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      amount: "",
      availability: "",
      guarantorAwareness: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    try {
      // Envoyer les données au serveur
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forms/LOAN_REQUEST`, {
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
          description: data.message || "Votre demande de prêt a été envoyée avec succès. Nous vous contacterons prochainement pour convenir d'un rendez-vous."
        });
        
        // Envoyer un email de confirmation
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: `Demande de prêt - ${values.name}`,
            text: `
Bonjour,

Nous avons bien reçu votre demande de prêt.

Détails de votre demande:
- Nom: ${values.name}
- Téléphone: ${values.phone}
- Montant souhaité: ${values.amount}
- Objet du prêt: ${values.loanPurpose || 'Non spécifié'}
- Disponibilité pour rendez-vous: ${values.availability}

Nous vous contacterons prochainement pour convenir d'un rendez-vous et discuter des modalités du prêt.

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
          <Banknote className="h-6 w-6 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="font-medium text-lg mb-2">À propos de ce formulaire</h2>
            <p className="text-muted-foreground">
              Ce formulaire constitue la première étape d'une demande de prêt. Une fois votre demande 
              reçue, nous vous contacterons pour organiser un rendez-vous et discuter des modalités du prêt.
              <br /><br />
              <strong>Important :</strong> Conformément à nos règles, la présentation de 1 à 3 garants sera exigée 
              lors de la finalisation du prêt.
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

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant souhaité</FormLabel>
                  <FormControl>
                    <Input placeholder="Montant en shekels" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Loan Purpose */}
            <FormField
              control={form.control}
              name="loanPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objet du prêt</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez l'objet du prêt" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="loyer">Loyer</SelectItem>
                      <SelectItem value="mariage">Mariage</SelectItem>
                      <SelectItem value="demenagement">Déménagement</SelectItem>
                      <SelectItem value="urgence">Urgence</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
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
                  <FormLabel>Disponibilité pour un rendez-vous</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Lundi matin, Mercredi après-midi..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Indiquez vos disponibilités pour que nous puissions organiser un rendez-vous.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guarantor Awareness */}
            <FormField
              control={form.control}
              name="guarantorAwareness"
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
                      Je suis conscient(e) que 1 à 3 garants seront exigés
                    </FormLabel>
                    <FormDescription>
                      Pour finaliser un prêt, vous devrez présenter entre un et trois garants selon le montant demandé.
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

      {/* Additional Information */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Pour toute question concernant le processus de demande de prêt, n'hésitez pas à nous 
          contacter directement par téléphone ou via le <a href="/contact" className="underline">formulaire de contact</a>.
        </p>
      </div>
    </div>
  );
}
