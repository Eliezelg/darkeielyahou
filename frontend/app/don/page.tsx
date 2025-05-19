import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, CreditCard, Calendar, FileText, Mail, PhoneCall, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function Don() {
  return (
    <>
      <PageHeader
        title="Faire Un Don"
        subtitle="Aidez-nous à vous aider"
        badge="SOUTENIR L'ASSOCIATION"
      />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8 text-center">
            Chaque action de Darkei Elyahou est possible <strong>grâce à vous</strong>.<br/> Vos dons financent :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 mb-12">
            <div className="flex flex-col items-center bg-primary/5 rounded-lg p-4">
              <span className="text-2xl mb-2">📚</span>
              <p>les Kollelim pour avrekhim, jeunes pères, et travailleurs</p>
            </div>
            
            <div className="flex flex-col items-center bg-primary/5 rounded-lg p-4">
              <span className="text-2xl mb-2">👨‍👩‍👧‍👦</span>
              <p>les aides sociales pour les familles en difficulté</p>
            </div>
            
            <div className="flex flex-col items-center bg-primary/5 rounded-lg p-4">
              <span className="text-2xl mb-2">💰</span>
              <p>les guemah d'argent et de voitures</p>
            </div>
            
            <div className="flex flex-col items-center bg-primary/5 rounded-lg p-4">
              <span className="text-2xl mb-2">🪖</span>
              <p>le soutien aux soldats mobilisés</p>
            </div>
            
            <div className="flex flex-col items-center bg-primary/5 rounded-lg p-4 md:col-span-2">
              <span className="text-2xl mb-2">🤝</span>
              <p>et bien plus encore</p>
            </div>
          </div>
          
          <p className="text-xl font-serif font-medium mt-8 text-center">
            <strong>Ce n'est pas une contribution. C'est un partenariat.</strong>
          </p>
        </div>

        {/* Main donation section */}
        <section className="bg-primary/5 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-serif mb-6 text-center">
            Faites votre don en ligne, en toute sécurité
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <FeatureCard 
              icon={<CreditCard className="h-6 w-6 text-primary" />}
              title="Plateforme Allodons"
              description="Plateforme reconnue pour les associations"
            />
            
            <FeatureCard 
              icon={<FileText className="h-6 w-6 text-primary" />}
              title="Reçu fiscal automatique"
              description="Reçu Cerfa envoyé automatiquement par email"
            />
            
            <FeatureCard 
              icon={<Calendar className="h-6 w-6 text-primary" />}
              title="Flexibilité"
              description="Possibilité de don ponctuel ou mensuel"
            />
            
            <FeatureCard 
              icon={<Heart className="h-6 w-6 text-primary" />}
              title="Options de paiement"
              description="CB, virement, prélèvement automatique"
            />
          </div>
          
          <div className="text-center mt-10">
            <a href="https://Allodons.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                JE FAIS UN DON – VIA Allodons
              </Button>
            </a>
          </div>
        </section>

        {/* Alternative donation methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif mb-6">Pour un virement ou un don personnalisé</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="mailto:contact@darkei-elyahou.org?subject=Don%20personnalis%C3%A9" 
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              contact@darkei-elyahou.org
            </a>
            
            <a 
              href="https://wa.me/972547236004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp : +972 54 723 6004
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border bg-background rounded-lg p-4 flex items-start gap-4">
      <div className="shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

function ImpactCard({ amount, description }: { amount: string; description: string }) {
  return (
    <div className="bg-primary/5 rounded-lg p-6 text-center">
      <div className="text-2xl font-bold mb-3 text-primary">{amount}</div>
      <p>{description}</p>
    </div>
  );
}
