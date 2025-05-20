import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Book, Users, Calendar, Building, CheckCircle, Lightbulb } from "lucide-react";
import KollelMembershipForm from "@/components/forms/kollel-membership-form";
import { PageHeader } from "@/components/page-header";

export default function KollelNichmatHava() {
  return (

   <div>
      {/* Header Section */}
      <PageHeader 
        title="Kollel Nichmat Hava"
        subtitle="Kollel du soir – étude post-journée"
        badge="KOLLELIM"
      />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12">

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Origin & History */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Origine & histoire</h2>
            </div>
            <p className="mb-4">
              Il y a 11 ans, la belle-mère de Shemouel Marciano quitte ce monde. En sa mémoire, et fidèle à la démarche qui caractérise Darkei Elyahou, Shemouel cherche une réponse utile, vivante, durable. Il remarque que de nombreuses personnes actives souhaitent continuer à étudier le soir, mais manquent :
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>d'un cadre,</li>
              <li>d'un Rav,</li>
              <li>d'une motivation collective.</li>
            </ul>
            <p>
              C'est ainsi qu'est fondé le Kollel du soir : Nichmat Hava, en l'honneur de cette femme discrète qui valorisait la Torah au quotidien.
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
              <li>Offrir un espace d'étude du soir, pour ceux qui travaillent la journée ou sortent d'une autre structure.</li>
              <li>Maintenir un lien quotidien avec la Torah, au-delà des obligations professionnelles.</li>
              <li>Créer un moment de calme et de sens, après une journée souvent agitée.</li>
            </ul>
          </section>

          <Separator />

          {/* Framework & Pedagogy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Encadrement & pédagogie</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Format d'étude :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Étude libre ou guidée, selon les profils.</li>
                  <li>Présence d'un Rav référent pour les questions halakhiques.</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Sujets abordés :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Guemara (selon affinité)</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Halakha</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Moussar</p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <span className="text-primary">•</span>
                    <p>Études spécifiques selon les périodes</p>
                  </div>
                </div>
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
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Avrekhim souhaitant continuer l'étude après le seder de la journée.</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Jeunes pères de famille voulant sanctifier leurs soirées.</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Ba'alei batim à la recherche d'une structure sérieuse.</p>
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
                  <div className="font-medium">Fréquence</div>
                </div>
                <p className="pl-6">Du dimanche au jeudi</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="font-medium">Horaires</div>
                </div>
                <p className="pl-6">Généralement entre 20h00 et 22h00</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <div className="font-medium">Effectif actuel</div>
                </div>
                <p className="pl-6">Environ 15 hommes assidus</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Name Significance */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Signification du nom</h2>
            </div>
            <p>
              Nichmat Hava : "L'âme de Hava", pour que chaque mot de Torah étudié le soir élève son souvenir, et continue son oeuvre de bien discrète.
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
                <p>Adapté aux horaires de vie moderne</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Accueille aussi bien les avrekhim que les pères de famille actifs</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Crée une ambiance paisible d'étude, après les bruits du quotidien</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Porte la mémoire d'une femme simple, mais fondatrice dans l'ombre</p>
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
              <li>Veuillez préciser dans le formulaire que vous êtes intéressé par le Kollel Nichmat Hava</li>
              <li>Indiquez vos disponibilités pour les horaires du soir</li>
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
    </div>
    </div>
  );
}
