"use client";

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import ImageCarousel from './image-carousel';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    // Images par défaut si aucune image n'est retournée (utilisant WebP)
    const defaultImages = [
      '/images/carousel/image (1)_resultat.webp',
      '/images/carousel/image (2)_resultat.webp',
      '/images/carousel/image (3)_resultat.webp',
    ];

    // Fonction pour récupérer les images du dossier carousel via l'API
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch('/api/carousel-images');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des images');
        }
        
        const data = await response.json();
        
        if (data.images && data.images.length > 0) {
          console.log('Images du carrousel chargées avec succès:', data.images);
          setCarouselImages(data.images);
        } else {
          // Si aucune image n'est retournée, on utilise les images par défaut
          console.log('Aucune image retournée par l\'API, utilisation des images par défaut');
          setCarouselImages(defaultImages);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des images du carrousel:', error);
        // En cas d'erreur, on utilise les images par défaut
        console.log('Utilisation des images par défaut suite à une erreur');
        setCarouselImages(defaultImages);
      }
    };

    fetchCarouselImages();
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageCarousel images={carouselImages} interval={6000} />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/70" />
      
      <div className="container mx-auto px-6 z-20 py-24 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 animate-fade-in">
            AIDEZ-NOUS À VOUS AIDER
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-slide-up opacity-90">
            Une main tendue. Une Torah vivante. Une réponse à chaque besoin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in">

            <a href="/actions">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium border-2 border-white">
                Découvrir nos actions
              </Button>
            </a>
            <a href="/don">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
                Faire un don
              </Button>
            </a>
            <a href="/galas">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium border-2 border-white">
                Participer à un gala
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a 
          href="#statistics" 
          aria-label="Scroll to statistics"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </a>
      </div>
    </section>
  );
}