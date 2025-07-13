import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Award, Heart, MessageCircle, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import GalaForm from "@/components/forms/gala";
import { PageHeader } from "@/components/page-header";
import { GalaGallery } from "@/components/gala/gala-gallery";
import React from "react";

const Galas = () => {
  return (
    <div>
      {/* Header Section */}
      <PageHeader
        title="LES GALAS DE DARKEI ELYAHOU"
        subtitle="Une soirée. Une mission. Un avenir."
        className="mb-12"
        badge="ÉVÉNEMENT"
      />

      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg mb-6">
            Depuis 2010, les <strong>galas annuels</strong> de Darkei Elyahou sont bien plus que des événements de collecte. 
            Ce sont des <strong>rendez-vous d'âme</strong>, où se rencontrent ceux qui donnent, ceux qui reçoivent, 
            et ceux qui vivent pour transmettre. Chaque gala est <strong>préparé avec amour</strong>, dans un esprit de <strong>kavod, 
            d'élévation et de vérité</strong>, avec un objectif simple :
          </p>
          <p className="text-xl font-bold text-primary">
            Permettre à Darkei Elyahou d&apos;aider toute l&apos;année, sans jamais dire non.
          </p>
        </div>

        <div className="grid gap-16">
        {/* Date des prochains galas avec images d'affiches */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif text-center mb-8">Les Prochains Galas</h2>
          
          <GalaGallery 
            images={[
              {
                src: "/images/gala/strasbourg.jpg",
                alt: "Gala de Strasbourg",
                city: "Strasbourg",
                date: "Mercredi 10 Septembre 2025"
              },
              {
                src: "/images/gala/paris.jpg",
                alt: "Gala de Paris",
                city: "Paris",
                date: "Mardi 09 Septembre 2025"
              }
            ]}
          />
        </section>
        
        {/* Formulaire d'inscription */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif text-center mb-8">S'inscrire au Prochain Gala</h2>
          <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg p-6 border border-border">
            <GalaForm />
          </div>
        </section>
        
        {/* Historique des galas */}
        <section className="mb-12">  
          <h2 className="text-3xl font-serif text-center mb-8">Notre Histoire</h2>
          <div className="space-y-10">
            <TimelineItem 
              year="2010" 
              title="Une tombola de départ"
              description={"La première édition a lieu dans une <strong>petite salle à Bayit Vegan</strong>.<br/><br/>Shemouel organise une tombola pour financer les premières bourses du Gma''h.<br/><br/><strong>30 personnes.<br/>3 000 shekels</strong>.<br/><br/>Mais déjà une vision : <strong>faire ensemble, grandir ensemble</strong>."}
              icon={<Calendar className="w-10 h-10" />}
              isFirst
            />
            
            <TimelineItem 
              year="2010–2022" 
              title="Grandir dans la discrétion"
              description="Pendant plus de dix ans, les galas sont organisés en Israël, chaque année, dans des formats sobres mais chaleureux.<br/> Les levées de fonds en France se font <strong>en porte-à-porte, en rencontres individuelles</strong>.<br/><br/>Ce qui compte, c'est la cause. Pas les projecteurs."
              icon={<Users className="w-10 h-10" />}
            />
            
            <TimelineItem 
              year="2023" 
              title="Premier gala à Paris"
              description="Sur les conseils de proches amis (notamment <strong>Yann Smadja, Steeve Sitruk, Jérémy Bouznah</strong>),<br/> Shemouel accepte de créer une vraie <strong>soirée à Paris</strong>, pour <strong>honorer les donateurs français</strong>.<br/><br/>🎥 Film de présentation<br/>🎵 Animation musicale<br/>🍽️ Buffet raffiné<br/>📜 Témoignages bouleversants<br/><br/>Le résultat ? Une salle comble, une ambiance puissante, et une campagne réussie."
              icon={<MapPin className="w-10 h-10" />}
            />
            
            <TimelineItem 
              year="2024" 
              title="Paris + Jérusalem"
              description="Face à l'impact du format, Shemouel organise désormais <strong>deux galas</strong> chaque année :<br/><br/> <strong>À Paris</strong>, pour les donateurs européens <br/> <strong>À Jérusalem</strong>, pour les soutiens locaux.<br/><br/> Chacun a son ton, sa couleur, son décor <br/> Mais tous portent le même cri du coeur : <strong>'Aidez-nous à vous aider'.</strong>"
              icon={<Award className="w-10 h-10" />}
            />
            
            <TimelineItem 
              year="2025" 
              title="Strasbourg entre dans la danse"
              description="Cette année, pour la première fois, une <strong>troisième soirée</strong> est ajoutée à l'agenda :<br/><br/>📍 <strong>Strasbourg</strong> – Mercredi 10 Septembre 2025<br/>📍 <strong>Paris</strong> – Mardi 09 Septembre 2025<br/><br/>L'objectif annoncé : <strong>360 000 € pour 2025</strong>, pour couvrir l'ensemble des actions listées sur ce site."
              icon={<Heart className="w-10 h-10" />}
            />
          </div>
        </section>

       
        {/* Qu'est-ce qu'un gala Darkei Elyahou */}
        <section className="mt-12 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-serif mb-6 text-center">Un gala, c&apos;est...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="Une soirée de kavod"
              description="Pas de surenchère"
              emoji="✨"
            />
            <FeatureCard 
              title="Un moment communautaire"
              description="Intergénérationnel"
              emoji="👨‍👩‍👧‍👦"
            />
            <FeatureCard 
              title="Un message fort"
              description="Direct, sans détour"
              emoji="💬"
            />
            <FeatureCard 
              title="Une opportunité"
              description="De devenir <strong>associé</strong>, pas simple donateur"
              emoji="🎁"
            />
            <FeatureCard 
              title="Une vitrine vivante"
              description="De ce qui se fait <strong>toute l'année</strong>"
              emoji="🫶"
            />
          </div>
        </section>

        {/* Inscriptions et dons */}
        <section className="mt-12">
          <h2 className="text-3xl font-serif mb-6 text-center">Inscriptions et dons</h2>
          <p className="text-lg mb-8 text-center">
            Les dons liés aux galas se font via la plateforme Allodons, avec suivi automatisé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 text-center">
            <Link href="https://allodons.fr/darkei-elyahou25" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary text-primary-foreground px-8">
                Faire un don via Allodons
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 text-center">
            <a 
              href="https://wa.me/972547236004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp : +972 54 723 6004
            </a>
            
            <a 
              href="mailto:contact@darkei-elyahou.org" 
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              contact@darkei-elyahou.org
            </a>
          </div>
         </section>
      </div>
    </div>
      {/* Fin de la page */}
    </div>
  );
};

export default Galas;

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isFirst?: boolean;
}

const TimelineItem = ({
  year,
  title,
  description,
  icon,
  isFirst = false
}: TimelineItemProps) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-6">
      <div className="rounded-full p-4 bg-primary text-primary-foreground">
        {icon}
      </div>
      {!isFirst && (
        <div className="h-full w-1 bg-primary/20 -mt-2"></div>
      )}
    </div>
    <div className={`pt-3 ${isFirst ? "" : "-mt-6"}`}>
      <span className="text-sm font-bold text-primary inline-block px-3 py-1 bg-primary/10 rounded-full mb-2">
        {year}
      </span>
      <h3 className="text-2xl font-serif mb-2">{title}</h3>
      <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  </div>
);

interface GalaCardProps {
  city: string;
  date: string;
  venue: string;
}

const GalaCard = ({ city, date, venue }: GalaCardProps) => (
  <Card className="overflow-hidden border-primary/30 hover:border-primary transition-all">
    <CardHeader className="bg-primary/5 pb-3">
      <CardTitle className="text-2xl font-serif">{city}</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Date</p>
            <p className="text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Lieu</p>
            <p className="text-muted-foreground">{venue}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface FeatureCardProps {
  title: string;
  description: string;
  emoji: string;
}

const FeatureCard = ({ title, description, emoji }: FeatureCardProps) => (
  <div className="p-4 bg-background rounded-lg border border-border">
    <div className="text-3xl mb-3">{emoji}</div>
    <h3 className="font-medium text-lg mb-1">{title}</h3>
    <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);
