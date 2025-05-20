import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Book, Users, Calendar, Building, BookOpen, AlarmClock, Timer, Globe, CheckCircle } from "lucide-react";
import KollelMembershipForm from "@/components/forms/kollel-membership-form";
import { PageHeader } from "@/components/page-header";

export default function KollelDafHayomi() {
  return (
    <div>
      {/* Hero Section */}
      <PageHeader 
        title="Kollel Daf Hayomi"
        subtitle="Étude quotidienne du Talmud – une page par jour, chaque jour"
        badge="KOLLELIM"
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12">
          {/* Origin & History */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Origine & histoire</h2>
            </div>
            <p className="mb-4">
              Il y a environ 6 ans, peu avant le début de la pandémie du Covid-19, plusieurs hommes de la communauté approchent Shemouel Marciano :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "On veut faire le Daf Hayomi… mais seuls, on n'y arrive pas. Il nous faut un cadre, un Rav, un lieu, une régularité."
            </blockquote>
            <p className="mb-4">
              Shemouel identifie immédiatement ce besoin : des hommes motivés, mais manquant d'outils ou d'organisation pour suivre ce programme mondial.
            </p>
            <p>
              Il crée un Kollel spécifiquement dédié au Daf Hayomi, avec un Rav qui enseigne chaque jour la page du jour, dans une ambiance rigoureuse, accueillante et fidèle au calendrier international.
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
              <li>Permettre à des hommes actifs, semi-avrekhim ou retraités de s'inscrire dans le cycle mondial d'étude du Daf Hayomi.</li>
              <li>Offrir un cadre stable, clair et pédagogique, pour tenir le rythme exigeant d'une page par jour.</li>
              <li>Créer un lien quotidien avec le Talmud et avec l'héritage de la Torah orale.</li>
            </ul>
          </section>

          <Separator />

          {/* Framework & Pedagogy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Encadrement & pédagogie</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Enseignement du Daf chaque jour, par un Rav expérimenté.</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Lecture et explication du texte, avec interactions autorisées (questions, clarifications).</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Étude collective, suivie d'une courte synthèse.</p>
              </div>
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
                <p>Hommes actifs souhaitant sanctifier le début de journée</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Avrekhim souhaitant suivre le cycle du Shas en parallèle de leur seder</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary mt-1">•</span>
                <p>Ba'alei batim ou retraités francophones motivés par l'étude régulière</p>
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
                  <Calendar className="w-4 h-4 text-primary" />
                  <div className="font-medium">Jours</div>
                </div>
                <p className="pl-6">Dimanche à vendredi</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlarmClock className="w-4 h-4 text-primary" />
                  <div className="font-medium">Horaire</div>
                </div>
                <p className="pl-6">Tôt le matin avant la téfila (adapté selon saison)</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <div className="font-medium">Programme</div>
                </div>
                <p className="pl-6">1 Daf/jour = 7 ans pour achever le Shas complet</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Challenge & Commitment */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Timer className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Défi & engagement</h2>
            </div>
            <p className="mb-4">
              Le Daf Hayomi est l'une des études les plus exigeantes :
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Aucune interruption : ni fêtes, ni vacances, ni maladie.</li>
              <li>Chaque Daf est lié au suivant. Manquer un jour = prendre du retard immédiat.</li>
              <li>Le cycle mondial avance, qu'on le suive ou non.</li>
            </ul>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Ce n'est pas un Kollel où on vient quand on peut. C'est un rendez-vous quotidien avec la Torah et le Klal Israël."
            </blockquote>
          </section>

          <Separator />

          {/* Community Impact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Impact communautaire</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Sentiment d'appartenance à une communauté mondiale d'étude</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Enracinement dans la Torah orale jour après jour</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Fierté personnelle de tenir un rythme sur 7 ans</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>Nombreux siyoumim organisés pour célébrer les étapes franchies</p>
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
                <p>Relié à un mouvement international</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Discipline et fidélité sur le long terme</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Adapté à tous les niveaux, grâce à l'accompagnement du Rav</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Un lien quotidien, concret, vivant avec le Talmud</p>
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
              <li>Veuillez préciser dans le formulaire que vous êtes intéressé par le Kollel Daf Hayomi</li>
              <li>Indiquez vos disponibilités pour les horaires d'étude</li>
              <li>Mentionnez votre niveau d'étude et votre expérience précédente avec le Daf Hayomi</li>
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
    </div>
  );
}
