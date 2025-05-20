import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Book, Users, Calendar, Star, CheckCircle } from "lucide-react";
import KollelMembershipForm from "@/components/forms/kollel-membership-form";
import { PageHeader } from "@/components/page-header";

export default function KollelOhaleiEsther() {
  return (
    <div>
      {/* Header Section */}
      <PageHeader 
        title="Kollel Ohalei Esther"
        subtitle="Kollel du vendredi – réservé aux francophones"
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
              Tout commence par une expérience de rejet. Peu après son mariage, Shemouel Marciano cherche à intégrer un Kollel pour étudier le vendredi matin. Mais dans plusieurs structures proches de chez lui, on lui répète :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Reviens dans un mois... après les fêtes... on verra…"
            </blockquote>
            <p>
              Après plusieurs semaines de refus polis mais récurrents, Shemouel rentre chez lui un vendredi matin et dit à sa femme :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Ça suffit. J'ouvre mon propre Kollel."
            </blockquote>
            <p>
              Ce sera le Kollel du vendredi, et il sera ouvert à tous les francophones, sans conditions d'origine ou d'ancienneté.
            </p>
          </section>

          <Separator />

          {/* Objective */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Objectif</h2>
            </div>
            <p>
              Créer un espace d'étude régulier le vendredi matin, pour les avrekhim qui veulent sanctifier cette demi-journée souvent délaissée. Proposer une ambiance de Torah, de rigueur et de camaraderie spécifiquement adaptée aux francophones.
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
                  <h3 className="font-medium mb-2">Rosh Kollel</h3>
                  <p>Rav Schwob, francophone reconnu pour sa maîtrise de la halakha et sa pédagogie.</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Format</h3>
                  <p>Étude en 'havrouta + shiour du Rav</p>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Sujet d'étude</h3>
                <p>Principalement halakha, moussar ou sujets d'actualité du calendrier juif</p>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Avrekhim francophones</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Jeunes mariés</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Hommes en reconversion partielle ou avec une demi-journée libre</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Travailleurs qui veulent démarrer leur journée de vendredi avec de la Torah</p>
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
                <div className="font-medium">Jour</div>
                <p>Chaque vendredi matin</p>
              </div>
              
              <div className="space-y-1">
                <div className="font-medium">Durée</div>
                <p>Environ 2h30 d'étude</p>
              </div>
              
              <div className="space-y-1">
                <div className="font-medium">Lieu</div>
                <p>Beth Vagan, Jérusalem</p>
              </div>
              
              <div className="space-y-1">
                <div className="font-medium">Nombre de participants</div>
                <ul className="list-disc pl-5">
                  <li>Démarrage à 10 avrekhim</li>
                  <li>Montée jusqu'à 40</li>
                  <li>Actuellement : environ 22 avrekhim réguliers</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* Values */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Valeurs portées</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Accueil inconditionnel</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Esprit francophone chaleureux</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Stabilité d'un cadre d'étude fixe</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Torah du vendredi = Torah de la préparation du Shabbat</p>
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
                <p>Créé à la suite d'un rejet – symbole d'auto-construction</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Réservé aux francophones, dans un esprit de famille</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Toujours actif 19 ans après sa création</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Nommé en hommage à Esther z"l, la grand-mère de Shemouel</p>
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
              <li>Veuillez préciser dans le formulaire que vous êtes intéressé par le Kollel Ohalei Esther</li>
              <li>Indiquez vos disponibilités pour le vendredi matin</li>
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
  );
}
