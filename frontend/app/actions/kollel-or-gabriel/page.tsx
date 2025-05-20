import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Book, Users, Calendar, Building, CheckCircle, Lightbulb } from "lucide-react";
import KollelMembershipForm from "@/components/forms/kollel-membership-form";
import { PageHeader } from "@/components/page-header";

export default function KollelOrGabriel() {
  return (
    <div>
      {/* Header Section */}
      <PageHeader 
        title="Kollel Or Gabriel"
        subtitle="Kollel Hachkama (étude à l'aube, avant la téfila)"
        badge="KOLLELIM"
      />
      
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
                Il y a 17 ans, Shemouel Marciano s'installe avec sa famille à Kiryat Yovel, un quartier de Jérusalem peu religieux à l'époque.
              </p>
              <p className="mb-4">
                Dès son arrivée, il cherche un minyan pour prier, mais on lui répond :
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                "On a essayé, ça ne marche pas. Personne ne vient."
              </blockquote>
              <p className="mb-4">
                Plutôt que de renoncer, Shemouel prend le pari inverse :
              </p>
              <p className="mb-4">
                Créer un Kolel d'étude AVANT la prière, pour attirer les hommes motivés dès l'aube, et enchaîner avec un minyan.
              </p>
              <p>
                Le Kollel Or Gabriel est né — avec la Torah comme point de départ de la journée, même dans un quartier difficile.
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
                <li>Établir une structure de limoud solide dès le lever du jour</li>
                <li>Enchaîner l'étude avec une téfila régulière dans le même lieu</li>
                <li>Créer une dynamique religieuse dans un quartier en devenir</li>
                <li>Maintenir un minyan fixe quotidien (sans interruption depuis 17 ans)</li>
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
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary">•</span>
                  <p>Étude en 'havrouta encadrée</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary">•</span>
                  <p>Shiour quotidien dispensé par un Rav expérimenté</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary">•</span>
                  <p>Sujets : Halakha pratique, Moussar, Machshava selon le calendrier</p>
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
                  <p>Avrekhim et ba'alei batim du quartier</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary">•</span>
                  <p>Habitants motivés par une étude matinale intense</p>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary">•</span>
                  <p>Travailleurs ou commerçants souhaitant commencer la journée par du limoud</p>
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
                  <p className="pl-6">Beth Knesset local à Kiryat Yovel</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div className="font-medium">Fréquence</div>
                  </div>
                  <p className="pl-6">Chaque jour (dimanche à vendredi inclus)</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <div className="font-medium">Horaire</div>
                  </div>
                  <p className="pl-6">Étude dès 6h00, suivie d'un minyan à 7h00</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div className="font-medium">Effectif actuel</div>
                  </div>
                  <p className="pl-6">12 avrekhim réguliers, plus plusieurs hommes du quartier</p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Impact */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Impact</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary mt-1">•</span>
                  <p>A contribué à changer l'ambiance spirituelle du quartier</p>
                </div>
                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary mt-1">•</span>
                  <p>A permis à des dizaines d'hommes de structurer leur journée autour de la Torah</p>
                </div>
                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary mt-1">•</span>
                  <p>Le minyan ne s'est jamais interrompu, même pendant les périodes de fêtes ou de crise</p>
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
                "Or Gabriel" : la lumière de la Torah au réveil, mais aussi un hommage à Gabriel, un proche ayant marqué le début de cette aventure.
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
                  <p>Implanté dans un quartier non religieux à l'époque</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Étude + Minyan intégrés, sans interruption depuis 17 ans</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Vecteur de transformation communautaire silencieuse</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Maintenu avec constance et ténacité, sans publicité</p>
                </div>
              </div>
            </section>

            {/* Adhésion au Kollel */}
            <section className="mt-16">
              <h2 className="text-2xl font-serif mb-8 text-center">Demande d'adhésion au Kollel</h2>
              <div className="bg-muted p-6 rounded-lg mb-8">
                <p className="mb-2 font-medium">Avant de soumettre votre demande :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Veuillez préciser dans le formulaire que vous êtes intéressé par le Kollel Or Gabriel</li>
                  <li>Indiquez vos disponibilités pour les horaires d'étude</li>
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

          </div> {/* Fin de grid gap-12 */}
        </div> {/* Fin de max-w-4xl mx-auto */}
      </div> {/* Fin de container */}
    </div> // Fin de pt-24
  );
}
