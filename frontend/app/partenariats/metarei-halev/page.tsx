import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, Target, Handshake, Calendar, User, Users, 
  CheckCircle
} from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function MetareiHalev() {
  return (
    <div>
      <PageHeader 
        title="Jeunesse Francophone"
        subtitle="Soutien aux jeunes filles francophones – En partenariat avec l'association Metarei Halev, dirigée par Guila Journo"
        badge="PARTENARIAT"
      />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Main Content */}
          <div className="grid gap-12">
            {/* Origin & History */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Origine & histoire</h2>
              </div>
              <p className="mb-4">
                Shemouel Marciano, attentif aux besoins communautaires dans leur évolution générationnelle, est approché par Guila Journo, éducatrice passionnée et directrice de l'association Metarei Halev.
              </p>
              <p className="mb-4">
                Son projet : Créer un cadre éducatif et protecteur pour les jeunes filles francophones en Israël, souvent en perte de repères, tiraillées entre plusieurs cultures, et souvent livrées à elles-mêmes en dehors de l'école.
              </p>
              <p>
                En tant que père de famille et élu municipal, Shemouel comprend l'urgence de soutenir ce type d'initiative, préventive, éducative et réparatrice.
              </p>
            </section>

          <Separator />

          {/* Objective */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Objectif</h2>
            </div>
            <ul className="list-disc pl-5 space-y-3">
              <li>Créer un espace éducatif bienveillant et stimulant pour les jeunes filles francophones</li>
              <li>Proposer des activités extrascolaires constructives : ateliers, sorties, cercles de parole</li>
              <li>Offrir un encadrement moral, spirituel et émotionnel</li>
              <li>Prévenir les ruptures identitaires et les glissements vers des comportements à risque</li>
            </ul>
          </section>

          <Separator />

          {/* Partnership Form */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Handshake className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Forme du partenariat</h2>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Soutien financier régulier de Darkei Elyahou à Metarei Halev</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Collaboration pédagogique ponctuelle (événements, conférences, formations)</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Mise en réseau : Shemouel met à disposition ses contacts communautaires, municipaux et associatifs</p>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Je ne dirige pas leur projet, je suis leur associé. On travaille main dans la main, avec confiance et admiration mutuelle."
            </blockquote>
          </section>

          <Separator />

          {/* Target Audience */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Public concerné</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Jeunes filles de la communauté francophone (12–18 ans)</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Élèves de Baté Yaakov, écoles israéliennes ou structures hybrides</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Familles en difficulté éducative ou en perte de lien avec leurs adolescentes</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Activities */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Activités proposées</h2>
            </div>
            <p className="text-muted-foreground mb-4">Avec le soutien de Darkei Elyahou</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Développement personnel</h3>
                </div>
                <p>Ateliers sur la confiance, pudeur, relations saines...</p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Activités créatives</h3>
                </div>
                <p>Théâtre, chant, arts visuels, cuisine...</p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Accompagnement individuel</h3>
                </div>
                <p>Suivi discret pour les cas sensibles</p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Soirées et rencontres</h3>
                </div>
                <p>Soirées moussarnies, rencontres avec des modèles inspirants</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* What makes it unique */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Ce qui rend ce partenariat unique</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Vise la prévention, non la réparation</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Cible un public souvent oublié : les jeunes filles francophones entre 13 et 18 ans</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Porté par une femme de terrain (Guila) et soutenu par un homme d'action (Shemouel)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Offre une continuité éducative complémentaire aux écoles et aux familles</p>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center space-y-6">
          <h2 className="text-2xl font-serif">Soutenir ce projet</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/don">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Faire un don
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
