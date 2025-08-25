import { Calculator, Users, ShieldCheck, Clock, PiggyBank, HeartHandshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GmahPage() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative bg-primary/95 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-6 animate-fade-in">
            Gma"h Hasdei Esther
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-90">
            Un Guemilout 'Hassadim fondé à la mémoire d'Esther z"l, la grand-mère paternelle de Shemouel
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Origin Story */}
        <section className="max-w-4xl mx-auto mb-24 animate-slide-up">
          <h2 className="text-3xl font-serif text-primary mb-8">L'histoire</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Il y a 20 ans, suite à une simple suggestion d'un cousin lors des <strong>Chlochim</strong> de sa grand-mère, 
              <strong>Shemouel Marciano</strong> prend une décision qui changera des milliers de vies. 
              <strong>Annonce l'ouverture officielle</strong> d'une structure permettant 
              <strong>d'emprunter de l'argent de manière digne, immédiate et sans intérêt</strong>.
              Avec seulement 100 dollars en poche, il pose les fondations de ce qui deviendra 
              <strong>un tampon vital</strong> et l'un des <strong>piliers financiers</strong> de Darkei Elyahou.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 italic my-8">
              La première distribution a lieu dans son salon, sans ordinateur, sans fiche : 
              juste du coeur, de la confiance, et une volonté de commencer.
            </blockquote>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-24">
          <h2 className="text-3xl font-serif text-primary mb-12 text-center">Ce qui rend ce Gma"h unique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 text-primary">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Financial Structure */}
        <section className="mb-24 bg-secondary p-8 rounded-lg">
          <h2 className="text-3xl font-serif text-primary mb-8">Structure financière</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-serif mb-4 text-primary">Dépôts récupérables (95%)</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Sommes confiées par des particuliers</strong></li>
                <li>• <strong>Argent mis au service du 'Hessed</strong></li>
                <li>• <strong>Ne font pas de don</strong> mais <strong>mettent leur argent au service du 'Hessed</strong></li>
                <li>• Peuvent <strong>retirer leur argent à tout moment</strong> avec un court <strong>préavis</strong></li>
                <li>• Le capital <strong>n'est pas rémunéré</strong></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-serif mb-4 text-primary">Dons purs (5%)</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Dons irréversibles</li>
                <li>• Soutien aux frais de fonctionnement</li>
                <li>• Augmentation de la capacité d'action</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Daily Operations */}
        <section className="mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">Gestion quotidienne</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-border">
            <div className="mb-8">
              <h3 className="text-xl font-serif mb-4">Horaires d'ouverture</h3>
              <p className="text-muted-foreground">
                Tous les matins, de <strong>8h30 à 9h</strong>, un mini bureau informel est ouvert <strong>chez Shemouel</strong>.
                <strong>Gère tout seul</strong> cette activité de manière <strong>informelle mais extrêmement rigoureuse</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyOperations.map((operation, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-primary">{operation.icon}</div>
                  <p className="text-muted-foreground">{operation.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-primary mb-8 text-center">Chiffres clés</h2>
          <div className="prose prose-lg max-w-none">
            <ul className="space-y-4 text-muted-foreground">
              {statistics.map((stat, index) => (
                <li key={index} className="text-lg">
                  <strong>{stat.label}</strong> : {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Testimonial */}
        <section className="max-w-4xl mx-auto text-center bg-primary text-white p-12 rounded-lg">
          <h2 className="text-3xl font-serif mb-8">Témoignage</h2>
          <blockquote className="text-xl italic">
            "J'étais endetté de 9 000 ₪ avec deux enfants. La banque me harcelait. 
            Darkei Elyahou m'a prêté en 24h, sans me juger. J'ai pu rembourser en 10 mois et me reconstruire."
          </blockquote>
        </section>
      </div>
    </div>
  );
}

const uniqueFeatures = [
  {
    icon: <Calculator className="w-8 h-8" />,
    title: "Zéro intérêt",
    description: "Conformément à la halakha, tous les prêts sont accordés sans aucun intérêt."
  },
  {
    icon: <HeartHandshake className="w-8 h-8" />,
    title: "100% confiance",
    description: "Une approche basée sur la confiance mais avec une gestion rigoureuse."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Gestion personnelle",
    description: "Géré directement par un bénévole, sans structure administrative lourde."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Discrétion totale",
    description: "Confidentialité absolue - aucun nom divulgué, aucune pression."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Réponse rapide",
    description: "Une aide immédiate pour éviter l'aggravation des situations difficiles."
  },
  {
    icon: <PiggyBank className="w-8 h-8" />,
    title: "Prévention",
    description: "Permet à des dizaines de familles d'éviter l'effondrement financier."
  }
];

interface DailyOperation {
  icon: React.ReactNode;
  text: React.ReactNode;
}

const dailyOperations: DailyOperation[] = [
  {
    icon: <Users className="w-6 h-6" />,
    text: "Accueil des emprunteurs pour les remboursements ou nouveaux prêts"
  },
  {
    icon: <PiggyBank className="w-6 h-6" />,
    text: "Gestion des dépôts et modifications"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    text: (
      <span>
        <strong>1 à 3 garants exigés</strong> - connus personnellement de Shemouel ou présentés avec vérification rigoureuse. 
        Chaque demande est <strong>examinée au cas par cas</strong>. <strong>Shemouel contacte lui-même les garants</strong>.
      </span>
    )
  },
  {
    icon: <Clock className="w-6 h-6" />,
    text: "Traitement des demandes urgentes"
  }
];

const statistics = [
  {
    value: "près de 8 000 000 ₪",
    label: "Volume total géré"
  },
  {
    value: "des centaines chaque année",
    label: "Nombre de bénéficiaires actifs"
  },
  {
    value: "quasi nul grâce à la rigueur du suivi",
    label: "Nombre de défauts de remboursement sérieux"
  }
];