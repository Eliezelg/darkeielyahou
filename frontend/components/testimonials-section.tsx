"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'David Cohen',
    role: 'Bénéficiaire',
    content: "Grâce à Darkei Elyahou, j'ai pu reprendre confiance en moi et me reconstruire. Leur accompagnement personnalisé m'a permis de retrouver une stabilité financière et spirituelle.",
    avatar: '/avatars/david.jpg',
  },
  {
    id: '2',
    name: 'Sarah Levy',
    role: 'Mère de famille',
    content: "L'aide alimentaire que nous recevons chaque mois est une véritable bouée de sauvetage pour ma famille. Merci pour votre générosité et votre discrétion.",
    avatar: '/avatars/sarah.jpg',
  },
  {
    id: '3',
    name: 'Raphaël Amar',
    role: 'Étudiant en Torah',
    content: "La bourse d'étude que j'ai reçue m'a permis de me consacrer pleinement à mon apprentissage de la Torah. C'est une véritable bénédiction pour ma famille et moi.",
    avatar: '/avatars/raphael.jpg',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };
  
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
            Témoignages
          </h2>
          <p className="text-xl text-muted-foreground">
            Ce que disent ceux qui nous font confiance
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-10">
            <Quote className="h-10 w-10 text-primary/20 absolute top-6 left-6" />
            
            <div className="text-center px-4 md:px-8">
              <blockquote className="text-lg md:text-xl text-foreground/90 mb-6 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 overflow-hidden border-2 border-primary/20">
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/avatars/default.jpg';
                    }}
                  />
                </div>
                <div className="font-medium text-foreground">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTestimonial.role}
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                  )}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Vous souhaitez partager votre expérience avec nous ?
          </p>
          <Button>
            Laisser un témoignage
          </Button>
        </div>
      </div>
    </section>
  );
}
