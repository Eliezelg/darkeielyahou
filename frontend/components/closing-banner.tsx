"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email("Veuillez entrer un email valide"),
});

export default function ClosingBanner() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Ne restez pas spectateur.
          </h2>
          <p className="text-lg mb-12 opacity-90 max-w-2xl mx-auto">
            Rejoignez une oeuvre vivante, enracinée dans la vérité, portée par la Torah, et faite pour ceux qui tendent la main.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium shadow-lg">
              Faire un don – via Allodons
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium border-2 border-white">
              Nous contacter
            </Button>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, this would submit to an API
    console.log(values);
    // Show success message
    alert("Merci pour votre inscription !");
    form.reset();
  }

  return (
    <Button
      size="lg"
      className="bg-white text-primary hover:bg-white/90 font-medium border-2 border-white"
      onClick={() => (document.getElementById('newsletter-modal') as HTMLDialogElement)?.showModal()}
    >
      Recevoir les actus
    </Button>
  );
}