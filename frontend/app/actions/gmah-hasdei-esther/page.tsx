import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, DollarSign, Shield, Users, Calculator, MessageSquare, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function GmahHasdeiEsther() {
  return (
    <div>
      {/* Header Section - Full Width */}
      <PageHeader 
        title="GMA'H HASDEI ESTHER (ARGENT)"
        subtitle="Guemilout 'Hassadim Hasdei Esther - Gma'h d'argent en mémoire d'Esther z'l"
        className="mb-12"
        badge="GMAH"
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Origin & History */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-serif">Origine & histoire</h2>
            </div>
            <p className="mb-4">
              Ce Gma"h a été fondé il y a 20 ans par <strong>Shmouel Marciano</strong>, jeune marié, quelques jours après les <strong>Chlochim</strong> de sa grand-mère. Lorsqu'un cousin lui suggère :
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              "Pourquoi ne pas ouvrir un Gma"h à Jérusalem ?" Il prend 100 dollars de sa propre poche et <strong>annonce l'ouverture officielle</strong>, sans local, sans organisation, juste avec l'envie d'aider — comme le faisait sa grand-mère, silencieusement, sans attendre.
            </blockquote>
            <p>
              La première distribution a lieu <strong>dans son salon</strong>, sans ordinateur, sans fiche : juste du coeur, de la confiance, et une volonté de commencer.
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
              Permettre à des familles ou des personnes en difficulté <strong>d'emprunter de l'argent de manière digne, immédiate et sans intérêt</strong>, pour faire face à une urgence ou éviter une honte.
            </p>
            <p className="mt-2 font-medium">
              Le Gma"h agit comme <strong>un tampon vital</strong> entre le besoin et l'effondrement.
            </p>
          </section>

          <Separator />

          {/* How it works */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Fonctionnement complet</h2>
            </div>
            <p className="mb-4">
              Le Gma"h repose sur <strong>deux piliers financiers distincts</strong> :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <span className="text-primary font-medium">1.</span> Les dépôts récupérables
                  </CardTitle>
                  <CardDescription>≈ 95 % du fonds actuel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ce sont des <strong>sommes confiées par des particuliers</strong>, en général des proches de Shmouel ou des amis du projet.</li>
                    <li>Ces personnes <strong>ne font pas de don</strong> : elles souhaitent simplement <strong>mettre leur argent au service du 'Hessed</strong>, au lieu de le laisser en banque.</li>
                    <li>Elles peuvent <strong>retirer leur argent à tout moment</strong>, sous réserve de respecter un petit <strong>préavis</strong> (1 à 4 semaines selon le montant).</li>
                    <li>Le dépôt <strong>n'est pas rémunéré</strong> (pas d'intérêt).</li>
                    <li>Le principe est le suivant : "plutôt que mon argent dorme en banque, qu'il aide une famille à tenir debout."</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <span className="text-primary font-medium">2.</span> Les dons purs
                  </CardTitle>
                  <CardDescription>≈ 5 % du fonds total</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Ce sont des dons irréversibles, offerts pour soutenir le Gma"h dans ses frais ou augmenter sa capacité d'action.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Loan Framework */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Encadrement des prêts</h2>
            </div>
            <p className="mb-4">
              Chaque prêt est rigoureusement encadré :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>1 à 3 garants exigés</strong> selon le montant.</li>
              <li>Les garants doivent être <strong>connus personnellement de Shmouel ou présentés avec vérification rigoureuse</strong>.</li>
              <li>Les pièces justificatives (contrats, salaires, charges, situation familiale) sont <strong>examinées au cas par cas</strong>.</li>
              <li>En cas de retard de paiement, <strong>Shmouel contacte lui-même les garants</strong> — ce qui reste très rare grâce à la sélection stricte.</li>
            </ul>
          </section>

          <Separator />

          {/* Daily Management */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Gestion quotidienne</h2>
            </div>
            <p className="mb-4">
              Tous les matins, de <strong>8h30 à 9h</strong>, un mini bureau informel est ouvert <strong>chez Shmouel</strong>. Il y reçoit :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Les emprunteurs qui rendent ou viennent chercher de l'argent</li>
              <li>Les déposants qui veulent augmenter, retirer ou modifier leur dépôt</li>
              <li>Les personnes qui veulent comprendre le fonctionnement</li>
              <li>Les signatures de garanties</li>
              <li>Les demandes urgentes</li>
            </ul>
            <p className="mt-4">
              Shmouel <strong>gère tout seul</strong>, sans secrétaire, avec une organisation <strong>informelle mais extrêmement rigoureuse</strong>.
            </p>
          </section>

          <Separator />

          {/* People Helped */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Profils aidés (non exhaustif)</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Familles en difficulté ponctuelle (loyer, frais médicaux, divorce, décès…)</li>
              <li>Jeunes couples en début de vie</li>
              <li>Avrekhim pour les frais de rentrée, mariage ou naissance</li>
              <li>Femmes seules ou situations complexes (en lien avec garants fiables)</li>
            </ul>
          </section>

          <Separator />

          {/* Key Figures */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Chiffres clés</h2>
            </div>
            <div className="space-y-4 bg-primary/5 p-6 rounded-lg">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <DollarSign className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Volume total géré :</p>
                    <p className="text-muted-foreground">Près de 8 000 000 ₪</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Bénéficiaires actifs :</p>
                    <p className="text-muted-foreground">Des centaines chaque année</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 mt-0.5 mr-3 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Défauts de remboursement :</p>
                    <p className="text-muted-foreground">Quasi nuls grâce à la rigueur du suivi personnalisé</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Testimonial */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Témoignage réel</h2>
            </div>
            <blockquote className="bg-muted p-6 rounded-lg italic border-l-4 border-primary">
              "J'étais endetté de 9 000 ₪ avec deux enfants. La banque me harcelait. Darkei Elyahou m'a prêté en 24h, sans me juger. J'ai pu rembourser en 10 mois et me reconstruire."
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
                <p>Zéro intérêt – conformément à la halakha</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>100 % confiance – mais 0 % légèreté</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Géré personnellement par un bénévole sans structure lourde</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Discrétion totale – aucun nom divulgué, aucune pression</p>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <span className="text-primary">✅</span>
                <p>Permet à des dizaines de familles <strong>d'éviter l'effondrement</strong></p>
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
