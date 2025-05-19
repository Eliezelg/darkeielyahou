import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, Package, Users, Search, Banknote, CheckCircle } from "lucide-react";
import SocialAidForm from "@/components/forms/social-aid-form";
import { PageHeader } from "@/components/page-header";
import React from "react";

export default function AideSociale() {
  return (
    <div className="pt-24">
      {/* Header Section */}
      <PageHeader
        title="Bons d'achat & Soutien Ponctuel"
        subtitle="Mivtzaim de soutien – bons d'achat & aide directe"
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
                Cette action est née de l'expérience personnelle de Shemouel Marciano. Lorsqu'il était encore avrekh, il constatait combien chaque fête était un défi financier : courses de Pessa'h, fournitures scolaires, vêtements de fête…
              </p>
              <p className="mb-4">
                Très vite, il comprend que de nombreuses familles de son entourage vivent les mêmes difficultés : elles ne demandent pas, ne mendient pas, mais souffrent en silence.
              </p>
              <p>
                Il commence avec 10 000 shekels de bons pour Pessa'h, distribués discrètement à des familles connues. Aujourd'hui, ces distributions atteignent plus de 190 000 shekels, deux fois par an.
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
                <li>Soulager les familles nombreuses ou en difficulté ponctuelle sans passer par un parcours humiliant.</li>
                <li>Préparer les fêtes dans la dignité.</li>
                <li>Aider au moment clé de la rentrée scolaire, sans stress financier.</li>
                <li>Intervenir en cas de coup dur inattendu, avant que la situation ne s'aggrave.</li>
              </ul>
            </section>

            <Separator />

            {/* How it works */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Fonctionnement</h2>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <span className="text-primary mr-2">🔸</span> 
                      Bons d'achat pour les fêtes (Pessa'h & Tichri)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Montants attribués en fonction du nombre d'enfants et de leur âge.</li>
                      <li>Bons utilisables dans des grandes chaînes ou magasins partenaires.</li>
                      <li>Produits : denrées de fête, vêtements, chaussures, ustensiles.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <span className="text-primary mr-2">🔸</span> 
                      Bons pour la rentrée scolaire
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Couvre les uniformes, les livres, les fournitures scolaires.</li>
                      <li>Distribution en août, avant la rentrée, pour anticiper les besoins.</li>
                      <li>Coordination avec les écoles pour cibler les familles nombreuses.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <span className="text-primary mr-2">🔸</span> 
                      Aides ponctuelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>En cas d'urgence : factures d'électricité, traitements médicaux non remboursés, loyers impayés…</li>
                      <li>Analyse rapide du besoin et remise d'aide sous 72h maximum.</li>
                      <li>Accompagnement vers des solutions durables quand nécessaire.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Beneficiaries */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Bénéficiaires</h2>
              </div>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Familles nombreuses avec plusieurs enfants scolarisés.</li>
                <li>Avrekhim qui étudient la Torah et ont des ressources limitées.</li>
                <li>Familles monoparentales traversant des périodes difficiles.</li>
                <li>Personnes en situation de chômage ou de maladie temporaire.</li>
                <li>Nouveaux arrivants (olim) en phase d'installation.</li>
              </ul>
            </section>

            <Separator />

            {/* Selection Process */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Processus de sélection</h2>
              </div>
              
              <p className="mb-3">
                Les bénéficiaires sont identifiés par :
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>des recommandations par des rabbanim ou enseignants,</li>
                <li>le Gma"h d'argent (lorsqu'une situation financière fragile est constatée),</li>
                <li>des demandes directes avec justificatifs (situation familiale, charges, revenus, etc.)</li>
              </ul>
              
              <p className="mt-3">
                Chaque dossier est examiné avec rigueur, discrétion et bienveillance.
              </p>
            </section>

            <Separator />

            {/* Financing */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Banknote className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Financement</h2>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <p>
                  Ces aides ne sont pas financées par des subventions publiques. Elles sont entièrement couvertes par les dons privés récoltés lors des galas ou via la plateforme Allodons.
                </p>
              </div>
            </section>

            <Separator />

            {/* What makes it unique */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-serif">Ce qui rend ce programme unique</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Réponse concrète, rapide et humaine</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Distribué sans humiliation, dans un cadre respectueux</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Piloté directement par Shemouel avec des relais locaux de confiance</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <p>Impact sur plus de 100 familles chaque année, rien que pour la rentrée scolaire</p>
                </div>
              </div>
            </section>

            {/* Demande d'aide */}
            <section className="mt-16">
              <h2 className="text-2xl font-serif mb-8 text-center">Faire une demande d'aide</h2>
              <div className="bg-muted p-6 rounded-lg mb-8">
                <p className="mb-2 font-medium">Avant de soumettre votre demande :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Assurez-vous de bien expliquer votre situation familiale</li>
                  <li>Précisez le type d'aide dont vous avez besoin (fêtes, rentrée scolaire, etc.)</li>
                  <li>Sachez que toutes les demandes sont traitées avec la plus grande confidentialité</li>
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
      </div>
    </div>
  );
}
