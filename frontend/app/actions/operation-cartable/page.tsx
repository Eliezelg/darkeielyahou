import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function OperationCartable() {
  return (
    <div>
      {/* Hero Section */}
      <PageHeader
        title="Opération Cartable"
        subtitle="Pour que chaque enfant puisse rentrer à l'école avec le nécessaire"
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto mb-16">
          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-4 text-primary">📜 Pourquoi ce projet ?</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Chaque rentrée scolaire coûte cher.
                Un cartable, des cahiers, des stylos, parfois des livres ou une trousse…
                Et quand on a plusieurs enfants, ou simplement pas les moyens, c&apos;est très dur.
              </p>
              <p>
                C&apos;est pourquoi, chaque année, Darkei Elyahou organise une opération cartable :
                On distribue des bons d&apos;achat utilisables dans des magasins partenaires, pour permettre
                à chaque famille de préparer la rentrée sans honte et sans retard.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-4 text-primary">💸 Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📅</span>
                  <div>
                    <h3 className="font-medium text-lg">Période</h3>
                    <p>Juin et juillet</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="font-medium text-lg">Sur dossier</h3>
                    <p>Situation familiale, charges, besoins précis</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">💳</span>
                  <div>
                    <h3 className="font-medium text-lg">Montant</h3>
                    <p>Jusqu&apos;à 400 ₪ par enfant</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <h3 className="font-medium text-lg">Forme</h3>
                    <p>Bons d&apos;achat uniquement, utilisables dans des enseignes sélectionnées</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <h3 className="font-medium text-lg">Distribution</h3>
                    <p>En toute discrétion, sur rendez-vous ou par relais de confiance</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-4 text-primary">👪 Qui peut recevoir ?</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Toute famille qui en fait la demande et dont la situation le justifie, après étude du dossier
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-4 text-primary">📌 Ce qui rend cette action différente :</h2>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✅</span> 
                <span>Pas de files d&apos;attente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✅</span> 
                <span>Pas de stock imposé : chaque famille choisit ce dont elle a vraiment besoin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✅</span> 
                <span>Une aide concrète, rapide, discrète</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✅</span> 
                <span>Des enfants qui peuvent arriver à l&apos;école comme les autres – et avec le sourire</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif mb-6">Soutenez cette action</h3>
          <Link href="/don">
            <Button size="lg" className="bg-primary text-primary-foreground px-8">
              Faire un don
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
