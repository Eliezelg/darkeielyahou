import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Heart, Briefcase, School } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function Actions() {
  return (
    <div>
      {/* Hero Section */}
      <PageHeader 
        title="Nos Actions"
        subtitle="Parce qu'aider ne se limite jamais à une seule forme"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="text-lg">
            Depuis plus de 20 ans, Darkei Elyahou répond aux besoins de la communauté avec <strong>souplesse, 
            rigueur et coeur.</strong> Chaque projet est né d'un <strong>besoin réel</strong>, identifié sur le terrain par 
            Shemouel Marciano. Aucune action n'a été planifiée depuis un bureau — elles ont toutes été <strong>vécues, construites, portées</strong>.
          </p>
          <p className="text-lg mt-4">
            Découvrez ci-dessous les différentes <strong>branches d'action</strong> de l'association. 
            Chacune a son identité, son histoire, son public. Toutes sont reliées par un même fil :
            <strong> "Aidez-nous à vous aider".</strong>
          </p>
        </div>

      <div className="grid gap-12">
        {/* Section Kollelim */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif">Kollelim – L&apos;étude qui structure la vie</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard 
              title="Kollel Ohalei Esther" 
              description="Étude du vendredi matin" 
              href="/actions/kollel-ohalei-esther"
              icon="📚"
            />
            <ActionCard 
              title="Kollel Or Gabriel" 
              description="Étude du matin avant la téfila (Hachkama)" 
              href="/actions/kollel-or-gabriel"
              icon="🌞"
            />
            <ActionCard 
              title="Kollel Nichmat Hava" 
              description="Étude du soir" 
              href="/actions/kollel-nichmat-hava"
              icon="🌙"
            />
            <ActionCard 
              title="Kollel Magen David" 
              description="Étude vendredi & Shabbat" 
              href="/actions/kollel-magen-david"
              icon="✡️"
            />
            <ActionCard 
              title="Kollel Avrekhim Cheovdim" 
              description="Pour ceux qui travaillent" 
              href="/actions/kollel-avrekhim-cheovdim"
              icon="💼"
            />
            <ActionCard 
              title="Kollel Daf Hayomi" 
              description="Une page de Talmud par jour" 
              href="/actions/kollel-daf-hayomi"
              icon="📖"
            />
          </div>
        </section>

        <Separator className="my-8" />

        {/* Section Soutien Social */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif">Soutien Social – Agir avec dignité</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard 
              title="Aide sociale" 
              description="Bons d'achat & aides ponctuelles" 
              href="/actions/aide-sociale"
              icon="🛒"
            />
            <ActionCard 
              title="Soutien aux familles de 'Hayalim" 
              description="Guerre 2023–2024" 
              href="/actions/soutien-hayalim"
              icon="🪖"
            />
            <ActionCard 
              title="Soutien à la jeunesse francophone" 
              description="Partenariat avec Metarei Halev" 
              href="/partenariats/metarei-halev"
              icon="👨‍👩‍👦"
            />
            <ActionCard 
              title="Habiller avec dignité" 
              description="Ventes à prix coûtant" 
              href="/actions/habiller-dignite"
              icon="👔"
            />
          </div>
        </section>

        <Separator className="my-8" />

        {/* Section GMA'H */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif">GMA'H – Entraide concrète</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCard 
              title="GMA'H Hasdei Esther" 
              description="Prêts d'argent sans intérêt" 
              href="/actions/gmah-hasdei-esther"
              icon="💰"
            />
            <ActionCard 
              title="GMA'H de voitures" 
              description="Véhicules à disposition" 
              href="/actions/gmah-voitures"
              icon="🚗"
            />
          </div>
        </section>

        <Separator className="my-8" />
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-serif mb-6">Soutenez ces actions</h3>
        <Link href="/don">
          <Button size="lg" className="bg-primary text-primary-foreground px-8">
            Faire un don
          </Button>
        </Link>
      </div>
    </div>
  </div>
  );
}

function ActionCard({ title, description, href, icon }: { 
  title: string; 
  description: string; 
  href: string;
  icon: string;
}) {
  return (
    <Card className="overflow-hidden border border-muted transition-all hover:border-primary hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <span className="text-2xl">{icon}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Link href={href} className="w-full">
          <Button variant="outline" className="w-full justify-between group">
            <span>Voir les détails</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
