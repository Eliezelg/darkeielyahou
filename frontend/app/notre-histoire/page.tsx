import { ScrollText, BookOpen, Car, Users, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

export default function HistoryPage() {
  return (
    <div>
      {/* Hero Section */}
      <PageHeader 
        title={
          <>
            Une décision. Un billet.<br />Une vie consacrée à aider.
          </>
        }
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section 1 */}
        <section className="max-w-4xl mx-auto mb-24 animate-slide-up">
          <h2 className="text-3xl font-serif text-primary mb-8">
            Un jeune homme, une intuition, une promesse
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Il y a 20 ans, Shemouel Marciano est tout juste marié. Il étudie à la Yéchiva, commence à construire sa vie, et s'apprête à devenir père.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Un événement vient tout bouleverser : le décès de sa grand-mère paternelle, une femme de Torah et de 'Hessed, au Maroc. Lors des <strong className="font-bold">Chlochim</strong>, un cousin (Gad) lui dit simplement :
            </p>
            <blockquote className="border-l-4 border-primary pl-6 italic my-8">
              "Pourquoi tu n'ouvrirais pas un Gma"h ici, à Jérusalem ?"
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              Shemouel n'a ni bureau, ni budget, ni plan. Mais il a une certitude : <strong className="font-bold">Il ne veut pas laisser ce monde inchangé</strong>.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="max-w-4xl mx-auto mb-24 animate-slide-up">
          <h2 className="text-3xl font-serif text-primary mb-8">
            100 dollars posés sur une table
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Ce soir-là, sans réfléchir trop longtemps, il rentre chez lui, prend 100 dollars de sa poche et annonce :
            </p>
            <blockquote className="border-l-4 border-primary pl-6 italic my-8">
              "<strong className="font-bold">J'ouvre un Gma"h. Pour l'élévation de son âme. Et pour apprendre à donner, comme elle m'a appris à vivre.</strong>"
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              C'est ainsi que naît <strong className="font-bold">Hasdei Esther</strong>, le premier Gma"h de Darkei Elyahou.<br/>
              Géré depuis sa maison, sans bureau, sans plateforme.<br/>
              Mais avec des valeurs, une vision, et une foi sans faille.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            Une oeuvre qui se construit par la réponse au besoin
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Shemouel ne cherche pas à "monter une structure".<br/> Il répond, tout simplement. Chaque étape de Darkei Elyahou naît d'un vide qu'il refuse de laisser béant :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="bg-secondary p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{milestone.icon}</div>
                <p className="text-muted-foreground">{milestone.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="max-w-4xl mx-auto mb-24 bg-secondary p-8 rounded-lg">
          <h2 className="text-3xl font-serif text-primary mb-8">
            Pas de structure complexe, juste de la présence
          </h2>
          <p className="text-muted-foreground mb-6">
            Darkei Elyahou est gérée <strong className="font-bold">depuis chez lui</strong>, à Beth Vagan, par lui et son épouse.<br/> Il n'a pas de secrétaire pendant 20 ans. 
            <br/>Mais il a un téléphone, une table, des voisins, et une foi inébranlable dans les gens.
          </p>
          <div className="space-y-4">
            <p className="text-lg font-serif">Chaque matin :</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Des familles viennent rendre ou demander un prêt</li>
              <li>Des gens déposent de l'argent pour faire du 'Hessed</li>
              <li>D'autres appellent pour une Brit, un Kolel, une voiture, un conseil…</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            Une oeuvre qui grandit, mais ne change pas d'âme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {['1000', '20'].includes(achievement.value) ? `+${achievement.value}` : achievement.value}
                </div>
                <p className="text-muted-foreground">{achievement.label}</p>
              </div>
            ))}
          </div>
          
    
          
          <p className="text-lg font-serif text-primary mt-6 font-medium">
            Mais à l'origine de tout cela, <strong className="font-bold">il n'y avait qu'un homme. Une décision. Et 100 dollars.</strong>
          </p>
        </section>

        {/* Section 6 */}
        <section className="max-w-4xl mx-auto text-center bg-primary text-white p-12 rounded-lg">
          <h2 className="text-3xl font-serif mb-8">
            Une vie entière dédiée à ce combat
          </h2>
          <blockquote className="text-xl italic">
            "Je ne sais pas où ça ira demain. Mais je sais que si quelqu'un frappe à ma porte, je veux pouvoir dire : Oui. Entre. Je t'écoute."
          </blockquote>
        </section>
      </div>
    </div>
  );
}

const milestones = [
  {
    icon: "💡",
    text: "Refusé dans un Kolel ? → Il crée Ohalei Esther, un Kolel pour les francophones, le vendredi matin."
  },
  {
    icon: "💬",
    text: "Une femme dit : \"Mon mari travaille, je ne trouve plus ma place\" → Il crée le Kolel Avrekhim Cheovdim"
  },
  {
    icon: "📖",
    text: "On veut faire le Daf Hayomi, mais on ne sait pas comment ? → Il fonde un Kolel dédié"
  },
  {
    icon: "🚗",
    text: "Une Brit sans voiture ? Une levaya sans transport ? → Il lance le Gma\"h de voitures"
  },
  {
    icon: "🧒",
    text: "Une rentrée scolaire, une guerre, une crise ? → Il intervient. Sans attendre."
  }
];

const achievements = [
  {
    value: "6",
    label: "Kollelim actifs chaque semaine"
  },
  {
    value: "8.000.000₪",
    label: "Gérés par le Gma\"h"
  },
  {
    value: "15",
    label: "Voitures à disposition dans tout Israël"
  },
  {
    value: "3",
    label: "Galas chaque année"
  },
  {
    value: "1000",
    label: "Familles aidées"
  },
  {
    value: "20",
    label: "Années de service"
  }
];