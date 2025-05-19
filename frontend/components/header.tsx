"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Heart, 
  CalendarDays,
  Home,
  History,
  Gift
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <div className="relative h-24 w-96">
              <Image 
                src="/logo/logo.png" 
                alt="Darkei Elyahou" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center mx-auto space-x-8">
          <NavLink href="/" isScrolled={isScrolled} isHomePage={isHomePage}>
            <Home className="w-4 h-4 mr-1" />
            Accueil
          </NavLink>
          <NavLink href="/notre-histoire" isScrolled={isScrolled} isHomePage={isHomePage}>
            <History className="w-4 h-4 mr-1" />
            Notre Histoire
          </NavLink>
          <NavLink href="/actions" isScrolled={isScrolled} isHomePage={isHomePage}>
            <Heart className="w-4 h-4 mr-1" />
            Nos Actions
          </NavLink>
          <NavLink href="/galas" isScrolled={isScrolled} isHomePage={isHomePage}>
            <CalendarDays className="w-4 h-4 mr-1" />
            Les Galas
          </NavLink>
          
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-2 shadow-lg rounded-full transition-transform hover:scale-105">
            <Link href="/don" className="flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Faire un don
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 absolute top-4 right-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6 transition-colors text-deep-blue" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto py-4 space-y-4">
            <MobileNavLink href="/">
              <Home className="w-4 h-4 mr-2" />
              Accueil
            </MobileNavLink>
            <MobileNavLink href="/notre-histoire">
              <History className="w-4 h-4 mr-2" />
              Notre Histoire
            </MobileNavLink>
            <MobileNavLink href="/actions">
              <Heart className="w-4 h-4 mr-2" />
              Nos Actions
            </MobileNavLink>
            <MobileNavLink href="/galas">
              <CalendarDays className="w-4 h-4 mr-2" />
              Les Galas
            </MobileNavLink>

            <div className="pt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 rounded-full">
                <Link href="/don" className="flex items-center justify-center w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Faire un don
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ 
  href, 
  children, 
  isScrolled,
  isHomePage
}: { 
  href: string; 
  children: React.ReactNode; 
  isScrolled: boolean;
  isHomePage: boolean;
}) {
  return (
    <Link 
      href={href}
      className="flex items-center font-medium transition-colors text-foreground hover:text-primary"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <Link 
      href={href}
      className="flex items-center py-2 text-foreground hover:text-primary"
    >
      {children}
    </Link>
  );
}