'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { CalendarHeart } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom de famille doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phoneCountryCode: z.string().min(2, { message: "Veuillez sélectionner un indicatif" }),
  phoneNumber: z.string().min(5, { message: "Le numéro de téléphone doit être valide" }),
  city: z.string({ required_error: "Veuillez sélectionner une ville" }),
  maleAttendees: z.string().optional(),
  femaleAttendees: z.string().optional(),
}).refine(data => {
  // Au moins un des champs doit avoir une valeur autre que "0" ou undefined
  const maleCount = parseInt(data.maleAttendees || "0");
  const femaleCount = parseInt(data.femaleAttendees || "0");
  return maleCount > 0 || femaleCount > 0;
}, {
  message: "Veuillez indiquer au moins un participant (homme ou femme)",
  path: ["maleAttendees"]
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
    console.log(values);
    
    // Indiquer que la soumission est en cours
    setIsSubmitting(true);
    
    // Préparation des données avec les champs mis à jour
    const formData = {
      ...values,
      phone: `${values.phoneCountryCode}${values.phoneNumber}`,
      totalAttendees: Number(values.maleAttendees) + Number(values.femaleAttendees)
    };
    
    try {
      // Envoyer les données au serveur
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forms/GALA_REGISTRATION`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Afficher le message de succès du serveur ou un message par défaut
        toast({
          title: "Inscription envoyée",
          description: data.message || "Votre inscription au gala a été enregistrée avec succès. Nous vous contacterons prochainement avec plus de détails."
        });
        
        // Marquer le formulaire comme soumis pour afficher le message de confirmation
        setIsSubmitted(true);
        
        // Définir la couleur bleue du site
        const primaryBlue = "#006989"; // Le bleu principal utilisé sur le site Darkei Elyahou
        
        // Créer un email HTML pour le participant avec un joli design et le logo
        const userHtmlContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation d'inscription au gala</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
              .header { background-color: ${primaryBlue}; padding: 25px 20px; text-align: center; border-radius: 6px 6px 0 0; }
              .logo { max-width: 180px; margin: 0 auto 15px; display: block; background-color: white; border-radius: 5px; padding: 10px; }
              .header h1 { color: white; margin: 0; font-weight: 600; }
              .content { padding: 25px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; }
              .footer { background-color: ${primaryBlue}; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 6px 6px; }
              .details { background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid ${primaryBlue}; border-radius: 4px; }
              h1 { color: white; }
              h2 { color: ${primaryBlue}; margin-top: 0; }
              p { margin-bottom: 15px; }
              .gala-info { background-color: #fafafa; border: 1px solid #eaeaea; padding: 15px; margin-top: 20px; text-align: center; }
              .gala-info h3 { color: ${primaryBlue}; margin-top: 0; }
              .button { display: inline-block; background-color: ${primaryBlue}; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="https://darkei-elyahou.org/logo/logo.png" alt="Darkei Elyahou" class="logo">
              <h1>Confirmation d'inscription au gala</h1>
            </div>
            <div class="content">
              <p>Bonjour ${values.firstName},</p>
              <p>Nous avons bien reçu votre inscription au <strong>gala de ${values.city}</strong> de Darkei Elyahou. Nous vous remercions pour votre confiance.</p>
              
              <div class="details">
                <h2>Détails de votre inscription</h2>
                <p><strong>Prénom:</strong> ${values.firstName}</p>
                <p><strong>Nom:</strong> ${values.lastName}</p>
                <p><strong>Email:</strong> ${values.email}</p>
                <p><strong>Téléphone:</strong> ${values.phoneCountryCode}${values.phoneNumber}</p>
                <p><strong>Ville du gala:</strong> ${values.city}</p>
                <p><strong>Participants:</strong> ${Number(values.maleAttendees) + Number(values.femaleAttendees)} personnes (${values.maleAttendees} hommes, ${values.femaleAttendees} femmes)</p>
              </div>
              
              <div class="gala-info">
                <h3>Informations sur le gala de ${values.city}</h3>
                <p>Vous trouverez en pièce jointe l'affiche officielle de l'événement.</p>
              </div>
              
              <p>Cordialement,<br>L'équipe Darkei Elyahou</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Darkei Elyahou. Tous droits réservés.</p>
            </div>
          </body>
          </html>
        `;
        
        // Créer un texte simple pour les clients de messagerie qui ne supportent pas HTML
        const textContent = `
Bonjour ${values.firstName},

Nous avons bien reçu votre inscription au gala de Darkei Elyahou.

Détails de votre inscription:
- Prénom: ${values.firstName}
- Nom: ${values.lastName}
- Email: ${values.email}
- Téléphone: ${values.phoneCountryCode}${values.phoneNumber}
- Ville: ${values.city}
- Participants: ${Number(values.maleAttendees) + Number(values.femaleAttendees)} personnes (${values.maleAttendees} hommes, ${values.femaleAttendees} femmes)

Nous vous remercions pour votre confiance et vous contacterons prochainement avec plus de détails concernant l'événement.

Cordialement,
L'équipe Darkei Elyahou
`;
        
        // Importer le service d'email
        const { sendEmail } = await import('@/lib/email-service');
        
        // Envoyer l'email au participant
        await sendEmail({
          to: values.email,
          from: 'contact@darkei-elyahou.org',
          subject: `Confirmation d'inscription au gala - ${values.firstName} ${values.lastName}`,
          text: textContent,
          html: userHtmlContent,
        });
        
        // Envoyer une copie à l'administrateur
        await sendEmail({
          to: 'contact@darkei-elyahou.org',
          from: 'contact@darkei-elyahou.org', 
          subject: `[ADMIN] Nouvelle inscription au gala - ${values.firstName} ${values.lastName}`,
          text: `Nouvelle inscription au gala reçue:\n\n${JSON.stringify(formData, null, 2)}`,
          html: `<h1>Nouvelle inscription au gala</h1><pre>${JSON.stringify(formData, null, 2)}</pre>`,
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
      console.error('Erreur lors de l\'envoi du formulaire ou de l\'email:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre inscription. Veuillez réessayer plus tard."
      });
    } finally {
      // Fin du processus de soumission
      setIsSubmitting(false);
    }
  }

  // Si le formulaire a été soumis avec succès, afficher le message de confirmation
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md border border-muted">
        <div className="text-center py-8 space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-green-700">Inscription envoyée avec succès !</h2>
          <div className="space-y-4 text-center">
            <p className="text-gray-600">
              Merci pour votre inscription au gala de Darkei Elyahou. Un email de confirmation a été envoyé à l'adresse que vous avez fournie.
            </p>
            
          </div>
          <div className="pt-4">
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mr-2"
            >
              Faire une nouvelle inscription
            </Button>
            <Button asChild>
              <a href="/galas">Retourner à la page des galas</a>
            </Button>
          </div>
        </div>
      </div>
    );
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
            {/* Prénom */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom*</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Nom de famille */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de famille*</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom de famille" {...field} />
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
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone with country code */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phoneCountryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Indicatif pays*</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={(value) => {
                        setCountryCode(value);
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="+972">+972 (Israël 🇮🇱)</SelectItem>
                        <SelectItem value="+33">+33 (France 🇫🇷)</SelectItem>
                        <SelectItem value="+1">+1 (États-Unis 🇺🇸)</SelectItem>
                        <SelectItem value="+32">+32 (Belgique 🇧🇪)</SelectItem>
                        <SelectItem value="+41">+41 (Suisse 🇨🇭)</SelectItem>
                        <SelectItem value="+44">+44 (Royaume-Uni 🇬🇧)</SelectItem>
                        <SelectItem value="+212">+212 (Maroc 🇲🇦)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Votre numéro" 
                        {...field} 
                        onChange={(e) => {
                          // Ne garder que les chiffres et quelques caractères spéciaux
                          const value = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
                          e.target.value = value;
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville du gala*</FormLabel>
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

            {/* Number of Attendees - Split by gender */}
            <div className="space-y-2">
              <h3 className="text-base font-medium">Participants</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="maleAttendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d'hommes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i} value={String(i + 1)}>{i + 1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="femaleAttendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de femmes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i} value={String(i + 1)}>{i + 1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

                                                                                    
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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
