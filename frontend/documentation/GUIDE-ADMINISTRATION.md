# Guide d'Administration - Site Darkei Elyahou

## Table des matières
1. [Accès et Connexion](#accès-et-connexion)
2. [Structure du Site](#structure-du-site)
3. [Modification du Contenu](#modification-du-contenu)
4. [Gestion des Formulaires](#gestion-des-formulaires)
5. [Ajout de Médias](#ajout-de-médias)
6. [Fonctionnalités à Implémenter](#fonctionnalités-à-implémenter)
7. [Support Technique](#support-technique)

---

## Accès et Connexion

### Informations d'Accès
- **URL d'administration** : https://darkei-elyahou.org/admin (à confirmer selon l'hébergement final)
- **Nom d'utilisateur** : admin@darkei-elyahou.org
- **Mot de passe initial** : DarkeiAdmin2025!

> ⚠️ **Important** : Changez ce mot de passe après votre première connexion pour des raisons de sécurité.

### Accès au Code Source
Pour les modifications avancées, vous pouvez accéder au code source via :
- **Dépôt Git** : [URL du dépôt]
- **FTP** : [Informations d'accès FTP]

---

## Structure du Site

Le site est développé avec Next.js et structuré comme suit :

### Pages Principales
- **Accueil** (`/`)
- **Notre Histoire** (`/notre-histoire`)
- **Nos Actions** (`/actions`) avec sous-pages pour chaque action
- **Les Galas** (`/galas`)
- **Faire un Don** (`/don`)
- **Contact** (`/contact`)
- **Mentions Légales** (`/mentions-legales`)
- **Formulaires** (`/formulaires`) avec sous-pages pour chaque formulaire

### Architecture des Fichiers
```
frontend/
├── app/                  # Pages du site
│   ├── page.tsx          # Page d'accueil
│   ├── actions/          # Section Nos Actions
│   ├── notre-histoire/   # Section Histoire
│   ├── galas/            # Section Galas
│   ├── don/              # Section Don
│   ├── contact/          # Contact
│   ├── formulaires/      # Formulaires
│   └── api/              # API endpoints
├── components/           # Composants réutilisables
├── lib/                  # Utilitaires et services
└── public/               # Fichiers statiques (images, etc.)
```

---

## Modification du Contenu

### Édition des Pages
Chaque page principale peut être modifiée en éditant le fichier `page.tsx` correspondant.

#### Exemple pour modifier la page d'accueil
1. Ouvrez le fichier `app/page.tsx`
2. Modifiez le texte ou les composants selon vos besoins
3. Déployez les changements

### Modification des Textes
Pour modifier des textes spécifiques :
1. Localisez le fichier contenant le texte à modifier
2. Recherchez le texte exact
3. Modifiez-le tout en préservant le format (balises HTML/JSX)

### Mise à jour des Images
1. Placez les nouvelles images dans le dossier `public/images/`
2. Utilisez-les dans les composants avec la balise `<Image>` :
   ```jsx
   import Image from 'next/image';
   
   <Image 
     src="/images/nom-image.jpg" 
     alt="Description de l'image" 
     width={800} 
     height={600} 
   />
   ```

---

## Gestion des Formulaires

### Configuration des Emails (SendGrid)
Les formulaires utilisent SendGrid pour envoyer les données par email.

1. **Mise en place** :
   - Créez un compte sur [SendGrid](https://sendgrid.com/)
   - Générez une clé API
   - Ajoutez cette clé dans le fichier `.env.local` :
     ```
     SENDGRID_API_KEY=votre_clé_api_sendgrid
     ```
   - Installez le package : `npm install @sendgrid/mail`

2. **Modification de l'email destinataire** :
   - Ouvrez le fichier `lib/sendgrid-service.ts`
   - Modifiez la valeur de `DEFAULT_EMAIL`

3. **Vérification de domaine** :
   - Vérifiez le domaine d'envoi d'emails dans SendGrid (contact@darkei-elyahou.org)

---

## Ajout de Médias

### Images
1. Optimisez vos images avant de les télécharger
2. Placez-les dans le dossier approprié sous `public/images/`
3. Utilisez-les avec le composant `<Image>` de Next.js

### Vidéos
Pour ajouter des vidéos dans le contenu :
1. Téléchargez les vidéos dans `public/videos/` ou utilisez un service d'hébergement vidéo
2. Intégrez-les avec le composant approprié :
   ```jsx
   <video 
     controls 
     width="100%" 
     poster="/images/thumbnail.jpg"
   >
     <source src="/videos/video.mp4" type="video/mp4" />
     Votre navigateur ne supporte pas la lecture de vidéos.
   </video>
   ```

---

## Fonctionnalités à Implémenter

Selon le cahier des charges, les fonctionnalités suivantes restent à développer :

### 1. Galerie Photos/Vidéos
- Créer une section dédiée dans `app/media/`
- Organiser les médias par événements ou thèmes
- Implémenter un composant de galerie avec prévisualisation

### 2. Témoignages Audio
- Intégrer un lecteur audio
- Stocker les fichiers audio dans `public/audio/`
- Créer une interface pour naviguer entre les témoignages

### 3. Newsletter (via Mailchimp)
- Créer un compte Mailchimp
- Intégrer le formulaire d'inscription à la newsletter
- Configurer les listes de diffusion et campagnes

### 4. Version Multilingue
- Implémenter la structure pour supporter le français, l'hébreu et l'anglais
- Créer des fichiers de traduction
- Développer un sélecteur de langue dans l'en-tête

---

## Support Technique

Pour toute assistance technique :
- **Email** : [adresse email du développeur]
- **Téléphone** : [numéro de téléphone du support]

### Ressources Utiles
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation SendGrid](https://docs.sendgrid.com/)
- [Guide Tailwind CSS](https://tailwindcss.com/docs)

---

*Ce guide a été créé le 12 mai 2025 et pourrait nécessiter des mises à jour régulières suite aux évolutions du site.*
