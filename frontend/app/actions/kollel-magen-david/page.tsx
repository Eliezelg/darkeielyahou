import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Book, Users, Calendar, Star, CheckCircle, Shield, Home, CalendarDays } from "lucide-react";
import KollelMembershipForm from "@/components/forms/kollel-membership-form";
import { PageHeader } from "@/components/page-header";

export default function KollelMagenDavid() {
  return (
    <>
      <PageHeader 
        title="Kollel Magen David"
        subtitle="Kollel du vendredi & Shabbat – sanctifier le temps libre"
        badge="KOLLELIM"
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
              Il y a une dizaine d'années, plusieurs avrekhim ou jeunes pères de famille expriment à Shemouel Marciano une même difficulté :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Le vendredi, c'est la course. Le Shabbat, je dors ou je fais ce que je peux… mais l'étude passe à la trappe."
            </blockquote>
            <p className="mb-4">
              Shemouel comprend que malgré la volonté sincère de beaucoup, l'absence de cadre les empêche d'exploiter le potentiel spirituel du vendredi et du Shabbat.
            </p>
            <p>
              Il décide de créer un cadre souple mais structuré : un Kollel qui accompagne le week-end sans l'alourdir.
            </p>
          </section>

          <Separator />

          {/* Objective */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Objectif</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Proposer une étude librement planifiable, mais rigoureusement suivie</li>
              <li>Sanctifier les moments familiaux par un investissement en Limoud</li>
              <li>Donner un cadre de fidélité et de motivation, même en dehors de la semaine</li>
            </ul>
          </section>

          <Separator />

          {/* How it works */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Fonctionnement</h2>
            </div>
            
            <div className="space-y-4">
              <p className="font-medium">
                Chaque membre s'engage à étudier au moins 5 heures par semaine, réparties entre :
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-2xl">📆</span>
                  <p>Vendredi matin ou après-midi</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-2xl">🕯️</span>
                  <p>Shabbat (avant ou après les repas, selon le rythme familial)</p>
                </div>
              </div>
              
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Un suivi personnel est assuré pour garantir l'assiduité</li>
                <li>Étude en binôme ou individuelle selon le niveau</li>
              </ul>
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
                <p>Avrekhim ou ex-avrekhim déjà intégrés dans le monde du travail</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Hommes ayant des horaires irréguliers mais voulant maintenir une rigueur d'étude</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Pères de famille avec des obligations en semaine, mais disponibles le week-end</p>
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
                  <Home className="w-4 h-4 text-primary" />
                  <div className="font-medium">Lieu</div>
                </div>
                <p className="pl-6">À la maison, à la synagogue, dans les lieux calmes adaptés</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div className="font-medium">Fréquence</div>
                </div>
                <p className="pl-6">Chaque semaine, en autonomie guidée</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="font-medium">Horaires</div>
                </div>
                <p className="pl-6">Libres – la régularité prime sur la centralisation</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <div className="font-medium">Effectif</div>
                </div>
                <p className="pl-6">Environ 20 avrekhim ou membres actifs</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Name Significance */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Signification du nom</h2>
            </div>
            <p>
              Magen David : le bouclier spirituel du Shabbat, celui qui protège le foyer par la Torah, même dans le temps "hors cadre".
            </p>
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
                <p>Structure flexible mais engagée</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>S'intègre dans la vie familiale sans la perturber</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Maintient le lien au Limoud dans les périodes "off"</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Renforce la dimension spirituelle du Shabbat par l'étude</p>
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
              <li>Veuillez préciser dans le formulaire que vous êtes intéressé par le Kollel Magen David</li>
              <li>Indiquez vos disponibilités pour les séances d'étude</li>
              <li>Mentionnez votre niveau d'étude et votre parcours</li>
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
    </>
  );
}
