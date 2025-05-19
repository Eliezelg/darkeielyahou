import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, Target, School, Calendar, BookOpen, Users, 
  Handshake, CheckCircle, AlertTriangle
} from "lucide-react";

export default function BethSandler() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-primary/10 text-primary font-semibold rounded-full px-4 py-1 mb-4">
            PARTENARIAT
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Beth Sandler</h1>
          <h2 className="text-xl text-muted-foreground mb-4">
            Kollel intensif pour futurs rabbins – soutenu et co-dirigé par Shemouel Marciano
          </h2>
          <div className="flex justify-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-flex items-center gap-2 max-w-xl">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-medium text-sm">
                Important : structure juridiquement indépendante de Darkei Elyahou
              </p>
            </div>
          </div>
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
              Le 19 mars 2012, un attentat frappe l'école Ozar Hatorah à Toulouse, tuant plusieurs enfants juifs et leur enseignant, Rav Yonathan Sandler z"l, ami intime de Shemouel Marciano. Les deux avaient étudié ensemble à la Yéchiva et au Kollel.
            </p>
            <p className="mb-4">
              Quelques mois après la tragédie, Eva Sandler, veuve de Rav Yonathan, décide de perpétuer sa mémoire par une Torah vivante. Avec l'aide de Shemouel, elle fonde le Kollel Beth Sandler, une structure exigeante qui forme des rabbanim certifiés.
            </p>
            <p>
              Shemouel y prend une place clé — non pas au nom de Darkei Elyahou, mais en tant qu'ami, leader communautaire et gestionnaire engagé.
            </p>
          </section>

          <Separator />

          {/* Objective */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Objectif</h2>
            </div>
            <ul className="list-disc pl-5 space-y-3">
              <li>Former une nouvelle génération de rabbanim francophones capables de répondre aux défis modernes.</li>
              <li>Créer une Torah vivante et structurée, à l'image de Rav Sandler z"l : douce, ferme, ancrée.</li>
              <li>Donner accès à un parcours reconnu par le Rabbinat d'Israël, pour ceux qui veulent transmettre, enseigner, guider.</li>
            </ul>
          </section>

          <Separator />

          {/* How it works */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <School className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Fonctionnement</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <School className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Lieu</h3>
                </div>
                <p>Jérusalem – structure stable depuis plus de 10 ans</p>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Programme</h3>
                </div>
                <p>5 jours par semaine</p>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Horaires</h3>
                </div>
                <p>Journée complète – étude intensive</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="font-medium">Matières</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>Halakha pratique (Shabbat, Nidda, Bassar Be'halav…)</li>
                <li>Dinim du mariage, divorce, deuil</li>
                <li>Étude de poskim, application halakhique, oraux</li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-primary" />
                <h3 className="font-medium">Certification</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>Le cycle s'achève par des examens officiels du Grand Rabbinat d'Israël</li>
                <li>Les diplômés peuvent obtenir la semikha (ordination) et exercer dans des postes rabbinique ou d'enseignement</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Direction Committee */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Composition du comité de direction</h2>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Eva Sandler</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Mme Mérav (sa soeur)</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                <span className="text-primary">•</span>
                <p>Shemouel Marciano</p>
              </div>
            </div>
            
            <p>
              Shemouel y joue un rôle opérationnel, pédagogique et structurel, tout en respectant l'autonomie de l'association.
            </p>
          </section>

          <Separator />

          {/* Link with Darkei Elyahou */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Handshake className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-serif">Lien avec Darkei Elyahou</h2>
            </div>
            
            <ul className="list-disc pl-5 space-y-3">
              <li className="font-medium">Pas de confusion : Beth Sandler est une entité indépendante.</li>
              <li>Cependant, les valeurs, la vision et la méthode de gestion de Shemouel s'y retrouvent.</li>
              <li>Certains avrekhim de Beth Sandler participent aussi aux Kollelim de Darkei Elyahou pour des études complémentaires.</li>
            </ul>
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
                <p>Né d'un drame – transformé en lumière perpétuelle</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Rigueur académique et chaleur humaine</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Reconnu officiellement par le Rabbinat</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">✅</span>
                <p>Dirigé par un comité équilibré entre transmission féminine (Eva) et direction rabbinique (Shemouel)</p>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center space-y-6">
          <h2 className="text-2xl font-serif">En savoir plus</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Nous contacter
              </Button>
            </Link>
            <Link href="/don">
              <Button size="lg" variant="outline">
                Faire un don
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
