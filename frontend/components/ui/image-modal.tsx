'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
        <VisuallyHidden>
          <DialogTitle>Image {imageAlt}</DialogTitle>
        </VisuallyHidden>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 z-50 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-h-[80vh] flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={1200}
              className="object-contain max-h-[80vh]"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
