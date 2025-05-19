"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { formatFormDataForEmail, sendEmail } from "@/lib/sendgrid-service";

const formSchema = z.object({
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().optional(),
  subject: z.string({
    required_error: "Veuillez sélectionner un sujet.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      // Formater les données pour SendGrid
      const emailData = formatFormDataForEmail(values, 'Contact');
      
      // Envoyer l'email via notre service
      const success = await sendEmail(emailData);
      
      if (success) {
        toast({
          title: "Merci pour votre message !",
          description: "Nous vous répondrons dans les meilleurs délais.",
        });
        form.reset();
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-6 pt-32 pb-16">
      <h1 className="text-4xl md:text-5xl font-serif mb-6 text-center">Contact</h1>
      <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
       <strong>Vous souhaitez nous écrire, poser une question ou prendre rendez-vous ?</strong> Remplissez le formulaire de contact, nous vous répondrons dans les meilleurs délais.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-serif mb-6">Formulaire de contact</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="votre-email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 1 23 45 67 89" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sujet *</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Don">Don</option>
                        <option value="Demande d'aide">Demande d'aide</option>
                        <option value="Question sur les galas">Question sur les galas</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Votre message..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </Form>
        </div>
        
        <div>
          <h2 className="text-2xl font-serif mb-6">Nous contacter</h2>
          <p className="mb-8">
            Vous pouvez également nous joindre par les moyens suivants :
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="w-6 h-6 mr-4 mt-1 text-primary" />
              <div>
                <h3 className="font-medium mb-1 text-gray-700">Email</h3>
                <p className="text-gray-600">contact@darkei-elyahou.org</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-6 h-6 mr-4 mt-1 text-primary" />
              <div>
                <h3 className="font-medium mb-1 text-gray-700">WhatsApp</h3>
                <p className="text-gray-600">+972 [XXX XXX XXX]</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-6 h-6 mr-4 mt-1 text-primary" />
              <div>
                <h3 className="font-medium mb-1">Adresse postale</h3>
                <p>Beth Vagan, Jérusalem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
