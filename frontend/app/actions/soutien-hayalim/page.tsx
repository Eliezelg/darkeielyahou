import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Package, Users, Shield, Banknote, CheckCircle } from "lucide-react";
import SocialAidForm from "@/components/forms/social-aid-form";

export default function SoutienHayalim() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-primary/10 text-primary font-semibold rounded-full px-4 py-1 mb-4">
            SOUTIEN AUX FAMILLES
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Mivtza Chayal</h1>
          <h2 className="text-xl text-muted-foreground">
            Soutien moral, logistique et financier aux familles de soldats mobilisés
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Origin & History */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Origine & histoire</h2>
            </div>
            <p className="mb-4">
              Le 7 octobre 2023, l'État d'Israël est frappé par une attaque barbare qui marque le début d'un conflit militaire d'envergure. Des milliers de soldats sont mobilisés du jour au lendemain, laissant derrière eux des femmes seules avec des enfants, sans préparation, ni cadre.
            </p>
            <p className="mb-4">
              Shmouel Marciano comprend immédiatement que l'attente, la solitude et la gestion du quotidien deviennent une montagne pour ces familles.
            </p>
            <p>
              Il décide de réagir immédiatement, sans budget prévu et en pleine préparation des galas, en mettant en place une cellule de crise communautaire sous l'égide de Darkei Elyahou.
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
              <li>Identifier rapidement les familles concernées (soldats mobilisés, pères absents)</li>
              <li>Leur offrir soutien moral, matériel, éducatif et logistique</li>
              <li>Libérer les mères pour qu'elles tiennent debout dans la durée</li>
            </ul>
          </section>

          <Separator />

          {/* Actions concrètes */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Actions concrètes</h2>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span className="text-primary mr-2">🔸</span> 
                    Recensement ciblé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>40 familles francophones identifiées dans les premières semaines</li>
                    <li>Détails collectés : nombre d'enfants, âge, adresse, besoins spécifiques</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span className="text-primary mr-2">🔸</span> 
                    Cadeaux personnalisés pour les enfants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Bons d'achat, chocolats, macarons, jouets en fonction de l'âge</li>
                    <li>Lettrage personnalisé avec messages d'encouragement</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span className="text-primary mr-2">🔸</span> 
                    Soutien à la mère
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Babysitters offertes à la demande, autant de fois que nécessaire, même plusieurs soirs par semaine</li>
                    <li>Possibilité d'envoyer une femme de ménage ponctuellement</li>
                    <li>Accompagnement téléphonique et écoute constante</li>
                  </ul>
                  
                  <blockquote className="border-l-4 border-primary pl-4 italic mt-4">
                    "Le but était simple : éviter que la mère craque. Si elle s'effondre, tout s'écroule. Alors on l'a portée."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Public concerné */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Public concerné</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Familles francophones de Yeroushalayim et ses environs</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Pères réservistes appelés au front</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Mères isolées avec enfants en bas âge</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Familles qui n'auraient jamais demandé d'aide si la guerre n'avait pas éclaté</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Enjeux */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Enjeux</h2>
            </div>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Aucune aide officielle prévue pour ces cas particuliers</li>
              <li>Nécessité de réagir vite, dans le silence et sans formulaires</li>
              <li>Maintenir l'équilibre familial émotionnel et spirituel dans une période de peur</li>
            </ul>
          </section>

          <Separator />

          {/* Financement */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Banknote className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Financement</h2>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg">
              <p>
                Aucune ligne budgétaire prévue : tout a été couvert par la générosité spontanée des donateurs. Shmouel a puisé dans les fonds des galas en cours pour ne pas attendre.
              </p>
            </div>
          </section>

          <Separator />

          {/* Durée et adaptation */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Durée et adaptation</h2>
            </div>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Première phase : octobre à janvier – 40 familles aidées</li>
              <li>Phase suivante : demandes résiduelles encore prises en charge jusqu'à aujourd'hui</li>
              <li>Ce dispositif peut être réactivé en 48h si une nouvelle vague de mobilisation surgit</li>
            </ul>
          </section>

          <Separator />

          {/* What makes it unique */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Ce qui rend cette action unique</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Intervention immédiate et structurée, sans lourdeur administrative</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Modèle duplicable en cas de nouvelle crise</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Priorité donnée à la solidité psychologique de la mère</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Action émotionnellement forte et profondément humaine</p>
              </div>
            </div>
          </section>
        </div>

        {/* Demande d'aide */}
        <section className="mt-16">
          <h2 className="text-2xl font-serif mb-8 text-center">Demander du soutien</h2>
          <div className="bg-muted p-6 rounded-lg mb-8">
            <p className="mb-2 font-medium">Si vous êtes concerné(e) :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Remplissez le formulaire pour nous faire part de votre situation</li>
              <li>Précisez le nombre et l'âge de vos enfants</li>
              <li>Indiquez les types de soutien dont vous auriez besoin (babysitting, aide ménagère, etc.)</li>
            </ul>
          </div>
          
          <SocialAidForm />
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center space-y-6">
          <h2 className="text-2xl font-serif">Soutenir cette action</h2>
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
