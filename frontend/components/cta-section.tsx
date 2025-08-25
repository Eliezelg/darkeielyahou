"use client";

import { Button } from '@/components/ui/button';
import { HeartHandshake, ChevronRight, Gift } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Décoration arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
          <div className="p-8 md:p-12 md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Soutenez notre action
            </h2>
            <p className="text-blue-100 mb-6">
              Votre don permet de soutenir nos actions et d'aider les familles dans le besoin.
              Chaque contribution compte et fait la différence.
            </p>
            <div className="space-y-4">
              <Button 
                asChild 
                size="lg" 
                className="w-full md:w-auto bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800"
              >
                <Link href="/don">
                  <HeartHandshake className="mr-2 h-5 w-5" />
                  Faire un don
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full md:w-auto border-white/20 text-white hover:bg-white/10"
              >
                <Link href="/actions" className="flex items-center">
                  Découvrir nos actions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="p-8 md:p-12 md:w-1/2 bg-white">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-600">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">
                Dons déductibles d'impôts
              </h3>
            </div>
            
            <p className="mt-2 text-gray-600">
              Votre don à Darkei Elyahou ouvre droit à une réduction d'impôt sur le revenu 
              égale à 66 % de votre don, dans la limite de 20 % de votre revenu imposable.
            </p>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/logo.png"
                    alt="Logo Darkei Elyahou"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Darkei Elyahou
                  </p>
                  <p className="text-sm text-gray-500">
                    Association reconnue d'utilité publique
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Besoin d'aide ? Contactez-nous à{' '}
            <a href="mailto:contact@darkei-elyahou.org" className="text-blue-600 hover:underline">
              contact@darkei-elyahou.org
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
