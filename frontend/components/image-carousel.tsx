"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

export default function ImageCarousel({ images, interval = 6000 }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Gestion simple de la rotation des images
  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [images, interval]);

  // Vérifier si le tableau d'images est vide ou non défini
  if (!images || images.length === 0) {
    console.warn('Aucune image disponible pour le carrousel');
    return <div className="w-full h-full bg-primary flex items-center justify-center">
      <div className="text-white text-opacity-50 text-xl">Chargement des images...</div>
    </div>;
  }
  
  // Afficher un log pour aider au débogage
  console.log(`Affichage du carrousel avec ${images.length} images`, images);

  // Précharger les premières images (les autres seront chargées avec priority=false)
  const preloadImages = images.slice(3).map((image, index) => (
    <Image 
      key={`preload-${index + 3}`}
      src={image}
      alt=""
      width={1}
      height={1}
      className="hidden" 
      aria-hidden="true"
    />
  ));
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Images visibles dans le carrousel */}
      {images.map((image, index) => (
        <div
          key={`carousel-image-${index}-${image}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image 
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover object-center"
            style={{
              minHeight: '500px',
            }}
            sizes="100vw"
            priority={index < 3}
          />
        </div>
      ))}
      
      {/* Container caché pour précharger les images */}
      <div className="hidden" aria-hidden="true">
        {preloadImages}
      </div>
    </div>
  );
}
