import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Car, Settings, List, Check, MapPin, User, MessageSquare, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function GmahVoitures() {
  return (
    <div className="pt-24">
      {/* Header Section */}
      <PageHeader 
        title="GMA'H de Voitures"
        subtitle="Projet communautaire de transport ponctuel"
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
              Il y a une dizaine d'années, Shemouel Marciano se rend compte qu'autour de lui, de nombreuses familles :
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>n'ont pas de véhicule personnel,</li>
              <li>ou bien ne peuvent pas se permettre d'en entretenir un,</li>
              <li>mais se retrouvent régulièrement dans des situations où une voiture est indispensable : brit mila, shabbat 'hatan, levaya, mariage, accouchement…</li>
            </ul>
            <p>
              L'idée naît avec son ami Elie Goldstein, qui propose une infrastructure de départ, offre l'assurance des premières voitures et l'encourage à structurer le projet.
            </p>
            <p className="mt-2">
              Le Gma"h est né.
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
              Offrir un accès simple, ponctuel et symbolique à une voiture pour ceux qui n'en ont pas — sans avoir à passer par une agence ou louer à des tarifs élevés.
            </p>
          </section>

          <Separator />

          {/* How it works */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Fonctionnement</h2>
            </div>
            <p className="mb-4">
              Le Gma"h met à disposition 15 véhicules répartis dans plusieurs villes d'Israël :
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                <MapPin className="w-4 h-4 text-primary" />
                <p>Jérusalem (plusieurs quartiers)</p>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                <MapPin className="w-4 h-4 text-primary" />
                <p>Modi'in Illit</p>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                <MapPin className="w-4 h-4 text-primary" />
                <p>Beit Shemesh</p>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                <MapPin className="w-4 h-4 text-primary" />
                <p>Elad</p>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                <MapPin className="w-4 h-4 text-primary" />
                <p>Afula</p>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                <MapPin className="w-4 h-4 text-primary" />
                <p>Autres villes à venir selon les besoins</p>
              </div>
            </div>

            <p className="mb-2">Chaque voiture est :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>suivie par un responsable local,</li>
              <li>
                gérée en amont par l'épouse de Shemouel, qui centralise :
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>le planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>les réservations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>les documents officiels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>les contraventions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>les entretiens</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <Separator />

          {/* Conditions & Usage */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <List className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Conditions & usage</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="mb-2">La voiture est prêtée pour une durée définie (quelques heures à une journée, parfois deux maximum).</p>
              </div>
              
              <div>
                <p className="mb-2 font-medium">Motifs acceptés :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Brit mila</li>
                  <li>Enterrement (levaya)</li>
                  <li>Mariage / Shabbat 'hatan</li>
                  <li>Courses familiales urgentes</li>
                </ul>
              </div>
              
              <div>
                <p className="mb-2 font-medium">Les bénéficiaires s'engagent à :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Rendre la voiture propre,</li>
                  <li>Faire le plein d'essence avant restitution,</li>
                  <li>Participer symboliquement aux frais (entre 20 ₪ et 70 ₪ selon le cas),</li>
                  <li>Respecter scrupuleusement l'horaire.</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* Management and Rigour */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Gestion et rigueur</h2>
            </div>
            
            <ul className="list-disc pl-5 space-y-3">
              <li>Chaque voiture est équipée d'une fiche de suivi : état, niveau de carburant, remarques.</li>
              <li>
                Une traçabilité stricte est assurée :
                <ul className="list-circle pl-5 space-y-1 mt-1">
                  <li>Si une amende ou un péage arrive 2 mois plus tard, le système permet de savoir qui avait la voiture, quel jour, à quelle heure.</li>
                  <li>Le responsable local ou la femme de Shemouel contacte l'utilisateur directement pour régularisation.</li>
                </ul>
              </li>
              <li>Contrôle régulier de la carte grise, de l'assurance et des entretiens mécaniques.</li>
            </ul>
          </section>

          <Separator />

          {/* Human Particularity */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Particularité humaine</h2>
            </div>
            
            <p className="mb-3">Ce Gma"h est souvent la seule solution pour des familles :</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>sans carte de crédit (donc inéligibles à la location)</li>
              <li>sans expérience administrative</li>
              <li>sans proche motorisé</li>
            </ul>
            
            <blockquote className="bg-muted p-6 rounded-lg italic border-l-4 border-primary">
              "Une Brit sans voiture devient un casse-tête. Avec ce Gma"h, en 10 minutes on a la solution — avec dignité."
            </blockquote>
          </section>

          <Separator />

          {/* What makes it unique */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Ce qui rend ce Gma"h unique</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Accessible, simple, rapide</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Couverture large en Israël</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Organisation familiale et rigoureuse</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Modèle duplicable dans d'autres villes</p>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <span className="text-primary">✅</span>
                <p>Résout un besoin réel et souvent invisible</p>
              </div>
            </div>
          </section>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center space-y-6">
            <h2 className="text-2xl font-serif">Soutenir ce Gma"h</h2>
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
