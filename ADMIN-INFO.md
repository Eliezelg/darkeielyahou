on # Informations d'Administration - Darkei Elyahou

## Accès Administrateur
- **URL d'administration** : https://darkeielyahou.fr/wp-admin (si WordPress est utilisé)
- **Nom d'utilisateur** : admin@darkei-elyahou.org
- **Mot de passe initial** : DarkeiAdmin2025! (à changer après la première connexion)

## Configuration Email (SendGrid)
Pour que les formulaires envoient correctement les emails via SendGrid :

1. Créer un compte sur [SendGrid](https://sendgrid.com/)
2. Générer une clé API dans les paramètres de votre compte SendGrid
3. Ajouter cette clé dans le fichier `.env.local` à la racine du projet :
   ```
   SENDGRID_API_KEY=votre_clé_api_sendgrid
   ```
4. Vérifier le domaine d'envoi d'emails dans SendGrid (contact@darkei-elyahou.org)
5. Installer le package SendGrid :
   ```
   npm install @sendgrid/mail
   ```

## Modifier du Contenu
Pour modifier le contenu du site :

### Pages principales
Les pages principales se trouvent dans le dossier `app/` avec la structure suivante :
- `app/page.tsx` - Page d'accueil
- `app/notre-histoire/page.tsx` - Page Histoire
- `app/actions/page.tsx` - Page Actions
- `app/galas/page.tsx` - Page Galas
- `app/don/page.tsx` - Page Don
- `app/contact/page.tsx` - Page Contact
- `app/mentions-legales/page.tsx` - Mentions légales

### Composants réutilisables
Les composants communs sont dans le dossier `components/` :
- `components/header.tsx` - En-tête du site
- `components/footer.tsx` - Pied de page
- `components/hero.tsx` - Bannière d'accueil

### Ajouter des images
1. Placez les nouvelles images dans le dossier `public/images/`
2. Pour les utiliser, importez-les avec :
   ```jsx
   import Image from 'next/image';
   
   <Image 
     src="/images/nom-image.jpg" 
     alt="Description de l'image" 
     width={800} 
     height={600} 
   />
   ```

## Couleurs et Styles
La couleur dominante définie dans le cahier des charges est :
- Pantone converti en CMJN = C:99 M:96 Y:3 K:0 (Rose magenta profond)

Cette couleur est configurée dans le fichier `tailwind.config.js`

## Fonctionnalités à Implémenter
- **Galerie photos/vidéos** : à développer dans `app/media/`
- **Témoignages audio** : à implémenter
- **Newsletter** : à configurer avec Mailchimp
- **Version multilingue** : à implémenter (français, hébreu, anglais)

Pour assistance technique, contactez le développeur à : [adresse email du développeur]
