import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  className?: string;
  badge?: string;
}

export function PageHeader({ title, subtitle, className = '', badge }: PageHeaderProps) {
  return (
    <section className={`bg-primary/95 text-white py-16 ${className}`}>
      <div className="container mx-auto px-6">
        {badge && (
          <div className="flex justify-center mb-4">
            <span className="inline-block bg-white/20 text-white font-semibold rounded-full px-4 py-1 text-sm">
              {badge}
            </span>
          </div>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-6 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <div className="text-xl md:text-2xl text-center">
            {typeof subtitle === 'string' ? <strong>{subtitle}</strong> : subtitle}
          </div>
        )}
      </div>
    </section>
  );
}
