import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Book, Users, Calendar, Building, CheckCircle, Briefcase, Heart } from "lucide-react";
import KollelMembershipForm from "@/components/forms/kollel-membership-form";
import { PageHeader } from "@/components/page-header";

export default function KollelAvrekhimCheovdim() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <PageHeader 
          title="Kollel Avrekhim Cheovdim - en Reconversion"
          subtitle="Kollel du matin – pour ceux qui travaillent"
          className="mb-12"
        />

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Origin & History */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Origine & histoire</h2>
            </div>
            <p className="mb-4">
              Tout commence avec une phrase dite dans un Gan. La femme de Shemouel croise une mère qu'elle ne voit plus depuis quelques semaines. Celle-ci lui répond, bouleversée :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Mon mari travaille maintenant. On a quitté le Kollel. Je ne me sens plus à ma place dans la communauté…"
            </blockquote>
            <p className="mb-4">
              Quand Shemouel entend ce témoignage, il est frappé de plein fouet. Il comprend qu'il existe une zone grise silencieuse : Des dizaines d'avrekhim quittent les kollelim pour des raisons économiques, mais ne trouvent plus leur place dans la vie religieuse.
            </p>
            <p>
              Il décide d'agir.
            </p>
          </section>

          <Separator />

          {/* Objective */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Objectif</h2>
            </div>
            <p className="mb-4">
              Créer un cadre spirituel clair, digne et valorisant pour les anciens avrekhim entrés dans la vie active, mais désireux de rester bnei Torah.
            </p>
            <p>
              Ce Kollel est une bouée pour ceux qui veulent continuer à grandir en Torah, tout en nourrissant leur famille.
            </p>
          </section>

          <Separator />

          {/* Framework & Pedagogy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Encadrement & pédagogie</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Format quotidien</h3>
                  <p>Dimanche à jeudi, 9h00 à 12h00</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Méthode d'étude</h3>
                  <p>Étude en 'havrouta, accompagnée d'un shiour régulier</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Matières principales :</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Halakha pratique</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Guemara avec Rishonim</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Éléments de pensée juive ou Moussar</p>
                  </div>
                </div>
              </div>
              
              <p>
                Encadrement par un Rav expérimenté et une ambiance de "Kollel réel"
              </p>
            </div>
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
                <p>Anciens avrekhim ayant quitté le Kollel pour travailler</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Hommes à mi-temps ou avec horaires aménagés</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Bnei Torah en reconversion professionnelle</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Pères de famille souhaitant garder une rigueur d'étude</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Organization */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Organisation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  <div className="font-medium">Lieu</div>
                </div>
                <p className="pl-6">Beth Vagan – Jérusalem</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="font-medium">Horaires</div>
                </div>
                <p className="pl-6">9h00 à 12h00</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div className="font-medium">Jours</div>
                </div>
                <p className="pl-6">Dimanche à jeudi</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <div className="font-medium">Effectif actuel</div>
                </div>
                <p className="pl-6">20 avrekhim</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <p className="font-medium">Petite bourse mensuelle versée, financée intégralement par Darkei Elyahou</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Philosophy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Philosophie du projet</h2>
            </div>
            <p className="mb-2">
              Ce Kollel repose sur un principe très fort :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-lg font-medium">
              "Un homme ne devrait jamais avoir à choisir entre Torah et Parnassa."
            </blockquote>
            <p>
              C'est une transition douce, respectueuse et valorisante.
            </p>
          </section>

          <Separator />

          {/* Human Impact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Impact humain</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Des femmes retrouvent leur place sociale.</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Des familles gardent leur équilibre spirituel.</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Des hommes gardent leur posture de avrekhim, même avec une cravate.</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Une génération reste connectée à la Torah malgré la pression économique.</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* What makes it unique */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Ce qui rend ce Kollel unique</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Modèle inédit en Israël</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Adapté à une réalité souvent ignorée</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Maintient l'identité de bnei Torah dans la durée</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Évite la rupture brutale entre étude et monde du travail</p>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <span className="text-primary">✅</span>
                <p>Source d'espoir, de stabilité et de fidélité au Limoud</p>
              </div>
            </div>
          </section>
        </div>

        {/* Adhésion au Kollel */}
        <section className="mt-16">
          <h2 className="text-2xl font-serif mb-8 text-center">Demande d'adhésion au Kollel</h2>
          <div className="bg-muted p-6 rounded-lg mb-8">
            <p className="mb-2 font-medium">Avant de soumettre votre demande :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Veuillez préciser dans le formulaire que vous êtes intéressé par le Kollel Avrekhim Cheovdim</li>
              <li>Indiquez vos disponibilités pour les horaires du matin</li>
              <li>Mentionnez votre situation professionnelle actuelle</li>
            </ul>
          </div>
          
          <KollelMembershipForm />
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center space-y-6">
          <h2 className="text-2xl font-serif">Soutenir ce Kollel</h2>
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
  );
}
