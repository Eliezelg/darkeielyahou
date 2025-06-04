"use client";

import { Separator } from "@/components/ui/separator";

export default function MentionsLegales() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">Mentions Légales</h1>
      
      <div className="max-w-3xl mx-auto prose prose-lg">
        <section className="mb-10">
          <h2 className="text-2xl font-serif mb-4">Éditeur du site</h2>
          <p>
            Association Darkei Elyahou, régie par la loi française sur les associations de 1901<br />
            Président : Shemouel Marciano<br />
            Responsable de publication : Shemouel Marciano
          </p>
          <p>
            Email : contact@darkei-elyahou.org<br />
            Téléphone : +972 54 723 6004
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-10">
          <h2 className="text-2xl font-serif mb-4">Informations sur l'association en France</h2>
          <p>
            Nom officiel : DARKEI ELYAHOU<br />
            Numéro RNA : W941004399 (Répertoire National des Associations)<br />
            Type d'organisation : Association simplement déclarée<br />
            Statut : Active<br />
            Adresse : 56 Avenue Jean Jaurès, 75019 Paris
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-10">
          <h2 className="text-2xl font-serif mb-4">Informations sur l'association en Israël</h2>
          <p>
            Nom officiel : דרכי אליהו - ירושלים (ע"ר) / Darkei Elyahou - Jérusalem<br />
            Numéro d'organisation : 580498178<br />
            Type d'organisation : Association enregistrée (עמותה)<br />
            Adresse : Rue Zanguevill (זנגוויל) 9/60, Jérusalem
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-10">
          <h2 className="text-2xl font-serif mb-4">Hébergeur du site</h2>
          <p>
            [Nom de l'hébergeur choisi – à compléter]<br />
            Adresse de l'hébergeur : [Adresse à compléter]
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-10">
          <h2 className="text-2xl font-serif mb-4">Traitement des données</h2>
          <p>
            Les données personnelles recueillies via les formulaires sont exclusivement utilisées pour :
          </p>
          <ul>
            <li>Répondre aux demandes</li>
            <li>Gérer les dons</li>
            <li>Envoyer les actualités et informations de l'association</li>
          </ul>
          <p>
            Aucune donnée ne sera cédée ni vendue à des tiers. Conformément à la loi RGPD, vous pouvez demander 
            la suppression ou la modification de vos données à tout moment en écrivant à contact@darkei-elyahou.org
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-10">
          <h2 className="text-2xl font-serif mb-4">Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site Darkei Elyahou est protégé par les lois relatives à la propriété intellectuelle.
            Toute reproduction, représentation ou diffusion, totale ou partielle, du contenu de ce site par quelque procédé
            que ce soit, sans l'autorisation expresse et préalable de l'association Darkei Elyahou est interdite et constituerait
            une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </section>
        
        <Separator className="my-8" />
        
        <section>
          <h2 className="text-2xl font-serif mb-4">Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Conformément à la législation
            en vigueur, ces cookies ne nécessitent pas de consentement préalable car ils sont strictement nécessaires
            à la fourniture du service. Aucun cookie publicitaire ou de traçage n'est utilisé.
          </p>
        </section>
      </div>
    </div>
  );
}
