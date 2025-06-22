'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { HeartHandshake, Play, Users, X } from 'lucide-react';

type VideoType = 'teaser' | 'gala' | 'interview';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface VideoItem {
  id: VideoType;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  icon: React.ReactNode;
}

export default function GalaCancellationSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const galleryImages: GalleryImage[] = [
    {
      src: "/images/gala/paris.webp",
      alt: "Gala de Paris - Reporté",
      title: "Gala de Paris",
      description: "Événement reporté en raison du conflit"
    },
    {
      src: "/images/gala/strasbourg.webp",
      alt: "Gala de Strasbourg - Reporté",
      title: "Gala de Strasbourg",
      description: "Événement reporté en raison du conflit"
    }
  ];

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const videos: VideoItem[] = [
    {
      id: 'teaser',
      title: 'Teaser',
      description: 'Découvrez le teaser de notre événement',
      url: 'https://www.youtube.com/embed/1A8h98fCKaI?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1',
      videoId: '1A8h98fCKaI',
      thumbnail: 'https://img.youtube.com/vi/1A8h98fCKaI/maxresdefault.jpg',
      icon: <Play className="w-6 h-6 text-white" />
    },
    {
      id: 'gala',
      title: 'Vidéo du Gala',
      description: 'Découvrez l\'ambiance de nos précédents galas',
      url: 'https://www.youtube.com/embed/fD9do9RTz0E?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1',
      videoId: 'fD9do9RTz0E',
      thumbnail: 'https://img.youtube.com/vi/fD9do9RTz0E/maxresdefault.jpg',
      icon: <Play className="w-6 h-6 text-white" />
    },
    {
      id: 'interview',
      title: 'Interview',
      description: 'Interview avec le Président Rav Shemouel Marciano',
      url: 'https://www.youtube.com/embed/lsK5SSQlWDM?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1',
      videoId: 'lsK5SSQlWDM',
      thumbnail: 'https://img.youtube.com/vi/lsK5SSQlWDM/maxresdefault.jpg',
      icon: <Users className="w-6 h-6 text-white" />
    }
  ];

  const handleVideoSelect = (videoId: VideoType) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Gestion de la fermeture avec la touche Échap
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section principale */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-red-600 mb-6">
             <strong>Annulation des galas</strong>
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
              Mais pas de notre mission - Une campagne plus essentielle que jamais
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              En raison du conflit avec l'Iran, les galas prévus à Strasbourg, Paris et Jérusalem ne pourront pas avoir lieu.
            </p>
              <p className="text-lg text-gray-700 mb-6">
                Mais les besoins, eux, sont toujours là. Plus que jamais, notre campagne{' '}
                <a 
                  href="https://allodons.fr/darkei-elyahou25" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  AlloDons
                </a> est vitale.
              </p>
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Aidez-nous à continuer. Aidez-nous à vous aider.
          </h2>
          </div>
        </div>

          {/* Affiches des galas annulés */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {galleryImages.map((image, index) => (
              <Card 
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openImageModal(image)}
              >
                <CardContent className="p-0">
                  <div className="relative group">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{image.title}</h3>
                    <p className="text-gray-600">{image.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modal pour l'affichage des images en grand */}
          {isImageModalOpen && selectedImage && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && closeImageModal()}
            >
              <div className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-lg overflow-hidden">
                <button
                  onClick={closeImageModal}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 z-10 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-8 h-8" />
                </button>
                <div className="relative w-full h-[70vh] max-h-[calc(100vh-10rem)]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="p-4 bg-white border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          )}

        {/* Section vidéo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Découvrez notre mission
          </h3>
          
          {/* Grille de vidéos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {videos.map((video) => (
              <div 
                key={video.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleVideoSelect(video.id)}
              >
                {/* Image de prévisualisation */}
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      // En cas d'erreur de chargement, utiliser une image de remplacement
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/1280x720?text=Chargement...';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      {video.icon}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de lecture vidéo */}
          {isModalOpen && selectedVideo && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
              onClick={(e) => {
                // Ferme le modal si on clique en dehors de la vidéo
                if (e.target === e.currentTarget) {
                  closeModal();
                }
              }}
            >
              <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl">
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 z-10 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-8 h-8" />
                </button>
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={videos.find(v => v.id === selectedVideo)?.url}
                    title={videos.find(v => v.id === selectedVideo)?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-white border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">
                    {videos.find(v => v.id === selectedVideo)?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Cliquez en dehors de la vidéo ou appuyez sur Échap pour fermer
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Appel à l'action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <HeartHandshake className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Votre soutien est plus important que jamais
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Même sans les galas, nos actions continuent. Chaque don compte pour aider ceux qui en ont besoin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8"
              onClick={() => window.open('https://allodons.fr/darkei-elyahou25', '_blank')}
            >
              <HeartHandshake className="w-5 h-5 mr-2" />
              Faire un don maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8"
              onClick={() => window.open('/actions', '_blank')}
            >
              Découvrir nos actions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
