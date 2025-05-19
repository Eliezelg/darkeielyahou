"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setProgress(pos * 100);
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return; // Guard for SSR
    
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  useEffect(() => {
    // Safeguard for SSR (Server Side Rendering)
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleProgress);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleProgress);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-primary">
            Darkei Elyahou, c'est une réponse
          </h2>
          <p className="text-xl text-muted-foreground">
            Une façon d'être là. Une Torah qui se vit.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto relative rounded-xl overflow-hidden shadow-2xl group hover:shadow-2xl transition-shadow duration-300 bg-black"
        >
          <video 
            ref={videoRef}
            className="w-full aspect-video object-contain bg-black"
            poster="/darka-poster.jpg"
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            playsInline
            preload="metadata"
          >
            <source src="/darka.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
          
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="h-2 w-full bg-gray-700 cursor-pointer group/progress"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-accent relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 -top-1 h-4 w-4 rounded-full bg-accent opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/10 rounded-full"
                  aria-label={isPlaying ? "Pause" : "Lecture"}
                >
                  {isPlaying ? 
                    <Pause className="h-5 w-5" /> : 
                    <Play className="h-5 w-5" />}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/10 rounded-full"
                    aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
                  >
                    {isMuted || volume === 0 ? 
                      <VolumeX className="h-5 w-5" /> : 
                      <Volume2 className="h-5 w-5" />}
                  </Button>
                  
                  <div className="w-24">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      min={0}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="text-sm text-white/80">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/10 rounded-full"
                aria-label={isFullscreen ? "Quitter le mode plein écran" : "Plein écran"}
              >
                {isFullscreen ? 
                  <Minimize2 className="h-5 w-5" /> : 
                  <Maximize2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Lire la vidéo"
              >
                <Play className="h-10 w-10 ml-1" />
              </Button>
            </div>
          )}
        </div>
        <div className="mt-10 text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-foreground">
            <span className="text-2xl md:text-4xl font-normal text-primary">Ce qu'on construit ici ne s'achète pas.</span>
            <span className="block mt-2">Ça se transmet. Ça se porte. Et ça se vit ensemble.</span>
          </p>
        </div>
      </div>
    </section>
  );
}