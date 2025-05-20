import { Shirt, ShoppingBag, Calendar, Users } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

export default function HabillerDignitePage() {
  return (
    <div>
      {/* Hero Section */}
      <PageHeader 
        title="Habiller avec dignité"
        subtitle="Mivtza Levouch – Campagnes d'habillement à prix coûtant"
        badge="ACTION SOLIDAIRE"
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section 1: Titre et Description */}
        <section className="max-w-4xl mx-auto mb-24 animate-slide-up">
          <h2 className="text-3xl font-serif text-primary mb-8">
            🟩 FICHE 12 : HABILLER AVEC DIGNITÉ
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="font-bold">🔹 Nom :</strong> Mivtza Levouch – Campagnes d'habillement à prix coûtant 
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="font-bold">📍 En partenariat avec :</strong> Haim Farahat, tsaddik discret et homme de terrain
            </p>
          </div>
        </section>

        {/* Section 2: Origine et Histoire */}
        <section className="max-w-4xl mx-auto mb-24 animate-slide-up">
          <h2 className="text-3xl font-serif text-primary mb-8">
            📜 Origine & histoire
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              À l'approche des fêtes ou de la rentrée, beaucoup de familles francophones n'ont tout simplement pas les moyens d'habiller leurs enfants comme elles le voudraient. Costumes, chaussures, chemises, cravates, ceintures… deviennent un luxe.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Haim Farahat, homme de confiance de la communauté, propose à Shmouel Marciano un modèle simple :
            </p>
            <blockquote className="border-l-4 border-primary pl-6 italic my-8">
              "Importer ou négocier des habits de grande qualité à prix d'usine, puis organiser une vente événementielle, sans marge, dans le respect total des familles."
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              Shmouel accepte immédiatement, à condition d'y associer les valeurs de Darkei Elyahou : accueil, souplesse, aide discrète pour ceux qui n'arrivent même pas à payer le coût réel.
            </p>
          </div>
        </section>

        {/* Section 3: Objectif */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            🎯 Objectif
          </h2>
          <div className="bg-secondary p-8 rounded-lg">
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>Habiller les familles dans la dignité, la qualité et la simplicité</li>
              <li>Supprimer la barrière économique qui empêche les enfants d'avoir un vêtement propre et neuf pour la fête</li>
              <li>Créer un moment chaleureux et valorisant, non un vide-grenier anonyme</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Fonctionnement */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            👔 Fonctionnement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-secondary p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4"><Calendar className="h-8 w-8 text-primary" /></div>
              <p className="font-bold mb-2">Fréquence :</p>
              <p className="text-muted-foreground">2 fois par an (avant Pessa'h et avant Tichri)</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4"><ShoppingBag className="h-8 w-8 text-primary" /></div>
              <p className="font-bold mb-2">Produits :</p>
              <p className="text-muted-foreground">Costumes, chemises, chaussures, ceintures, accessoires</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🏷️</div>
              <p className="font-bold mb-2">Prix :</p>
              <p className="text-muted-foreground">Prix coûtant direct fournisseur, souvent entre 100 ₪ et 200 ₪ pour un costume</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🎁</div>
              <p className="font-bold mb-2">Pour les familles les plus fragiles :</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Paiement symbolique (ex : 120 ₪ au lieu de 200 ₪)</li>
                <li>Possibilité de règlement différé</li>
                <li>Soutien discret validé par Shmouel en amont</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Public concerné */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            👥 Public concerné
          </h2>
          <div className="bg-secondary p-8 rounded-lg">
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>Familles nombreuses</li>
              <li>Mères seules</li>
              <li>Avrekhim sans bourse suffisante</li>
              <li>Nouveaux immigrants francophones</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Mode d'accès */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            💬 Mode d'accès
          </h2>
          <div className="bg-secondary p-8 rounded-lg mb-8">
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>Annonces via les canaux de Darkei Elyahou (WhatsApp, bouche-à-oreille)</li>
              <li>Répartition par créneaux horaires pour éviter les foules</li>
              <li>Présence de bénévoles pour conseiller et orienter</li>
            </ul>
          </div>
          <blockquote className="border-l-4 border-primary pl-6 italic my-8 text-muted-foreground">
            <p>"Il ne s'agit pas juste d'acheter un costume. Il s'agit de rendre une famille fière, de préparer une fête avec le sourire."</p>
          </blockquote>
        </section>

        {/* Section 7: Financement */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-serif text-primary mb-8">
            💸 Financement
          </h2>
          <div className="bg-secondary p-8 rounded-lg">
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>Le stock est financé à l'avance par Haim Farahat ou via des dons dédiés</li>
              <li>Les pertes éventuelles sont prises en charge par Darkei Elyahou</li>
              <li>Aucun bénéfice, aucun commerce : seulement du 'Hessed pur</li>
            </ul>
          </div>
        </section>

        {/* Section 8: Ce qui rend cette action unique */}
        <section className="max-w-4xl mx-auto text-center bg-primary text-white p-12 rounded-lg">
          <h2 className="text-3xl font-serif mb-8">
            📌 Ce qui rend cette action unique
          </h2>
          <ul className="list-none space-y-4 text-lg">
            <li>✅ Accès à des vêtements de grande qualité, neufs et élégants</li>
            <li>✅ Aucun business – que du don de soi</li>
            <li>✅ Organisation fluide, sans exposition ni stigmatisation</li>
            <li>✅ Respect absolu des familles, jusque dans la présentation des habits</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
