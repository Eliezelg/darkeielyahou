#!/bin/bash

# Script de déploiement robuste pour Darkei Elyahou
# Ce script assure que les variables d'environnement sont correctement configurées

set -e

echo "🚀 Début du déploiement Darkei Elyahou"

# Vérification de l'existence des fichiers de configuration nécessaires
if [ ! -f .env.production.local ]; then
  echo "⚠️  ATTENTION: Le fichier .env.production.local n'existe pas!"
  echo "   Veuillez créer ce fichier à partir de .env.production.local.example"
  echo "   et remplir les informations sensibles (mots de passe, clés API, etc.)"
  exit 1
fi

# Aller dans le répertoire du projet
cd /root/app/darkeielyahou

# Pull des derniers changements
echo "📥 Récupération des derniers changements..."
git pull origin main

# Installation des dépendances backend
echo "📦 Installation des dépendances backend..."
cd backend
npm install
npx prisma generate

# Installation des dépendances frontend
echo "📦 Installation des dépendances frontend..."
cd ../frontend
npm install

# Build du frontend avec les bonnes variables d'environnement
echo "🔨 Build du frontend..."
rm -rf .next

# Utilise les variables d'environnement du fichier .env.production.local
echo "📄 Utilisation des variables d'environnement de production..."
npm run build

# Retour au répertoire racine
cd ..

# Arrêt et redémarrage de PM2
echo "🔄 Redémarrage des services PM2..."
pm2 delete all || true

# Charger les variables d'environnement depuis .env.production.local
echo "⚙️ Chargement des variables d'environnement pour PM2..."
source .env.production.local
pm2 start ecosystem.config.js --env production
pm2 save

# Redémarrage de nginx
echo "🌐 Redémarrage de nginx..."
sudo systemctl reload nginx

# Vérification de l'état des services
echo "🔍 Vérification des services déployés..."
pm2 list

echo "✅ Déploiement terminé avec succès!"
echo "🌍 Application disponible sur: https://darkei-elyahou.org"
echo "📝 N'oubliez pas de vérifier les logs avec 'pm2 logs' si nécessaire."