#!/bin/bash

# Script de déploiement robuste pour Darkei Elyahou
# Ce script assure que les variables d'environnement sont correctement configurées

set -e

echo "🚀 Début du déploiement Darkei Elyahou"

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
NEXT_PUBLIC_API_URL="" npm run build

# Retour au répertoire racine
cd ..

# Arrêt et redémarrage de PM2
echo "🔄 Redémarrage des services PM2..."
pm2 delete all || true
pm2 start ecosystem.config.js --env production
pm2 save

# Redémarrage de nginx
echo "🌐 Redémarrage de nginx..."
sudo systemctl reload nginx

echo "✅ Déploiement terminé avec succès!"
echo "🌍 Application disponible sur: https://darkei-elyahou.org"