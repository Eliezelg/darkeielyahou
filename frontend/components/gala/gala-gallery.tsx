'use client';

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "@/components/ui/image-modal";

interface GalaImageProps {
  src: string;
  alt: string;
  city: string;
  date: string;
}

interface GalaGalleryProps {
  images: GalaImageProps[];
}

export function GalaGallery({ images }: GalaGalleryProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageAlt, setSelectedImageAlt] = useState("");
  
  const openImageModal = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedImageAlt(alt);
    setIsImageModalOpen(true);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative group cursor-pointer" 
            onClick={() => openImageModal(image.src, image.alt)}
          >
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all">
              <Image 
                src={image.src}
                width={400}
                height={550}
                alt={image.alt}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                <h3 className="text-xl font-semibold mb-1">{image.city}</h3>
                <p>{image.date}</p>
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="bg-white/90 text-black px-3 py-1 rounded-lg font-medium">Agrandir</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <ImageModal 
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={selectedImage}
        imageAlt={selectedImageAlt}
      />
    </>
  );
}
