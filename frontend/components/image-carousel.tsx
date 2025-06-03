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

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-primary"></div>;
  }

  // Précharger toutes les images dans un conteneur caché
  const preloadImages = images.map((image, index) => (
    <img 
      key={`preload-${index}`}
      src={encodeURI(image)}
      alt=""
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
          <img 
            src={encodeURI(image)}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
            style={{
              height: '100vh',
              minHeight: '500px',
            }}
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
