import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Heart, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-secondary-foreground text-secondary py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-serif mb-6">DARKEI ELYAHOU</h3>
            <p className="mb-6 text-white/80 uppercase font-bold">
              AIDEZ-NOUS À VOUS AIDER
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-6">Nos Actions</h3>
            <ul className="space-y-3">
              <FooterLink href="/actions/soutien-hayalim">Soutien aux Soldats</FooterLink>
              <FooterLink href="/actions/gmah-voitures">Prêt de véhicules</FooterLink>
              <FooterLink href="/actions/aide-social">Aide sociale</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-6">Nous aider</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Heart className="w-5 h-5 mr-3 mt-0.5 text-white/70" />
                <Link href="https://Allodons.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  Faire un don via Allodons
                </Link>
              </li>
              <li className="flex items-start">
                <FaWhatsapp className="w-5 h-5 mr-3 mt-0.5 text-white/70" />
                <Link href="whatsapp://send?phone=972547236004" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  Contactez-nous par WhatsApp
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+33664987371"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3 text-white/70" />
                  +33 6 64 98 73 71
                </a>
                <a 
                  href="https://wa.me/972547236004" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3 text-white/70" />
                  +972 54 723 6004
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@darkei-elyahou.org" 
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3 text-white/70" />
                  contact@darkei-elyahou.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-10 bg-white/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>🕎 Darkei Elyahou – tous droits réservés © {new Date().getFullYear()}</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>



        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
          <a href="https://webpro650.co.il" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <img src="/logo/webpro-logo.png" alt="WebPro Logo" className="h-6" />
          </a>
          <span dir="rtl">האתר נבנה ועוצב ע"י</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-white/80 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
    >
      {icon}
    </Link>
  );
}