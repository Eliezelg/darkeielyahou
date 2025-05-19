import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white overflow-hidden" style={{ backgroundImage: 'url("/images/avrehim.png")' }}>
      <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
      
      <div className="container mx-auto px-6 z-10 py-24">
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