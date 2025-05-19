# Darkei Elyahou - Documentation Technique Complète

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Technique](#architecture-technique)
3. [Structure du Projet](#structure-du-projet)
4. [Base de Données](#base-de-données)
5. [API - Documentation Technique](#api)
6. [Sécurité](#sécurité)
7. [Déploiement](#déploiement)
8. [Développement](#développement)

## Vue d'ensemble

L'application Darkei Elyahou est une plateforme complète de gestion des demandes et formulaires pour l'association caritative Darkei Elyahou. Elle permet aux bénéficiaires de soumettre des demandes d'aide et aux administrateurs de les gérer efficacement.

## Architecture Technique

### Stack Technique

#### Frontend
- **Framework** : Next.js 13+ avec App Router
- **Langage** : TypeScript 5.2
- **UI/UX** : 
  - shadcn/ui pour les composants d'interface
  - Tailwind CSS pour le styling
  - Animations avec Framer Motion
- **Gestion d'état** : React Context + Hooks
- **Validation de formulaire** : React Hook Form + Zod

#### Backend
- **Runtime** : Node.js 18+
- **Framework** : Express.js avec TypeScript
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : Session-based avec Express Session
- **Validation** : Zod pour la validation des schémas
- **Logging** : Winston pour la journalisation

## Structure du Projet

```
.
├── frontend/              # Application Next.js
│   ├── src/
│   │   ├── app/          # Pages et routes
│   │   ├── components/    # Composants réutilisables
│   │   ├── lib/          # Utilitaires et configurations
│   │   └── styles/       # Fichiers de style globaux
│   └── public/           # Fichiers statiques
│
└── backend/             # API Express
    ├── src/
    │   ├── controllers/  # Logique métier
    │   ├── middleware/   # Middleware Express
    │   ├── routes/      # Définition des routes
    │   └── prisma/      # Schéma et migrations Prisma
    └── tests/           # Tests automatisés
```

## Base de Données

### Modèle de Données

#### FormRequest
```prisma
model FormRequest {
  id          String       @id @default(cuid())
  formType    FormType     @default(OTHER)
  formData    Json         // Données du formulaire
  status      RequestStatus @default(PENDING)
  notes       String?      // Notes internes
  metadata    Json?        // Métadonnées supplémentaires
  
  // Relations
  createdBy   String?      // Email de l'utilisateur
  createdByUser AdminUser?  @relation(fields: [createdBy], references: [email])
  
  assignedTo String?      // Email de l'administrateur assigné
  assignedToUser AdminUser? @relation(fields: [assignedTo], references: [email])
  
  // Timestamps
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  // Index
  @@index([formType])
  @@index([status])
  @@index([createdAt])
}
```

#### AdminUser
```prisma
model AdminUser {
  id           String    @id @default(cuid())
  email        String    @unique
  password     String    // Mot de passe hashé (bcrypt)
  fullName     String
  isActive     Boolean   @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  // Relations
  assignedRequests FormRequest[]
  createdRequests  FormRequest[]
}
```

## API

### Authentification

#### Connexion
```http
POST /api/admin/login
```

**Corps :**
```json
{
  "email": "admin@example.com",
  "password": "motdepasse"
}
```

### Gestion des Demandes

#### Lister les demandes
```http
GET /api/admin/requests?status=PENDING&page=1&limit=10
```

#### Créer une demande
```http
POST /api/requests
```

**Corps :**
```json
{
  "formType": "SOCIAL_AID",
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

## Sécurité

- Authentification par session sécurisée
- Protection CSRF
- Validation des entrées
- Gestion des erreurs centralisée
- En-têtes de sécurité HTTP

## Déploiement

### Prérequis
- Node.js 18+
- PostgreSQL 12+
- Variables d'environnement configurées

### Installation
1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Configurer les variables d'environnement
4. Exécuter les migrations Prisma
5. Démarrer les serveurs

## Développement

### Commandes utiles

```bash
# Développement
npm run dev

# Construction pour la production
npm run build

# Linting
npm run lint

# Exécuter les tests
npm test
```
