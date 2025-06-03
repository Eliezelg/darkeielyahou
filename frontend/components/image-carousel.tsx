"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

export default function ImageCarousel({ images, interval = 5000 }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Gestion de la rotation des images
  useEffect(() => {
    console.log("Images reçues par le carrousel:", images);
    
    if (!images || images.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [images, interval]);
  
  // Préchargement de l'image actuelle
  useEffect(() => {
    if (!images || images.length === 0) {
      console.log("Aucune image à précharger");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setHasError(false);
    
    const preloadCurrentImage = () => {
      try {
        // Précharger l'image actuelle
        if (images[currentImageIndex]) {
          const img = new window.Image();
          img.onload = () => {
            console.log(`Image chargée avec succès: ${images[currentImageIndex]}`);
            setIsLoading(false);
          };
          img.onerror = () => {
            console.error(`Erreur de chargement de l'image: ${images[currentImageIndex]}`);
            setHasError(true);
            setIsLoading(false);
          };
          img.src = images[currentImageIndex];
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors du préchargement de l'image:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };
    
    // Délai court pour permettre au navigateur de gérer le changement d'état
    const timerId = setTimeout(() => {
      preloadCurrentImage();
    }, 100);
    
    return () => clearTimeout(timerId);
  }, [images, currentImageIndex]);

  if (!images || images.length === 0) {
    return <div className="w-full h-full bg-primary"></div>;
  }
  
  // Afficher un état de chargement si les images sont en cours de chargement
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary">
        <div className="w-full h-full"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={`carousel-image-${index}-${image}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url(${image})`,
              height: '100vh',
              minHeight: '500px',
              width: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            {/* Couche de débogage - uniquement visible en mode développement */}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 text-xs rounded">
                Image: {index + 1}/{images.length} - {image.split('/').pop()}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
