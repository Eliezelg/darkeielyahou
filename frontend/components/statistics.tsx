"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Book, 
  Users, 
  Car, 
  Globe, 
  GraduationCap 
} from 'lucide-react';

type StatisticProps = {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
};

const statistics = [
  {
    icon: <Book className="w-10 h-10 text-primary" />,
    value: 6,
    label: "Kollelim ouverts chaque semaine",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    value: 1000,
    label: "Familles accompagnées chaque année",
    suffix: "+"
  },
  {
    icon: <Car className="w-10 h-10 text-primary" />,
    value: 15,
    label: "Voitures en prêt gratuit pour les moments-clés",
  },
  {
    icon: <Globe className="w-10 h-10 text-primary" />,
    value: 3,
    label: "Galas annuels : Paris – Jérusalem – Strasbourg",
  },
  {
    icon: <GraduationCap className="w-10 h-10 text-primary" />,
    value: 20,
    label: "Avrekhim en reconversion soutenus chaque jour",
    suffix: "+"
  }
];

export default function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="statistics" 
      ref={ref}
      className="py-24 bg-secondary"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-primary">
          Nos chiffres clés
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {statistics.map((stat, index) => (
            <StatisticCard 
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              shouldAnimate={inView}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatisticCard({ 
  icon, 
  value, 
  label, 
  suffix = "", 
  shouldAnimate,
  delay
}: StatisticProps & { 
  shouldAnimate: boolean;
  delay: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2000; // 2 seconds for the animation

  useEffect(() => {
    if (shouldAnimate) {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        setDisplayValue(Math.floor(progress * value));
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      // Delay the start of each animation
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, delay * 1000);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [shouldAnimate, value, delay]);

  return (
    <div 
      className="bg-white p-8 rounded-lg shadow-md text-center transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1"
      style={{
        opacity: shouldAnimate ? 1 : 0,
        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
      }}
    >
      <div className="flex justify-center mb-6">{icon}</div>
      <div className="text-4xl font-bold mb-2 text-primary">
        {suffix}{displayValue}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}