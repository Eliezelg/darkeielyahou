#!/bin/bash

# Script de déploiement manuel pour Darkei Elyahou
# À exécuter depuis votre machine locale

SERVER_USER="your_user"
SERVER_HOST="your_server_ip"
SERVER_PATH="/path/to/darkeielyahou"

echo "🚀 Déploiement manuel de Darkei Elyahou..."

# Se connecter au serveur et déployer
ssh $SERVER_USER@$SERVER_HOST << 'ENDSSH'
  cd $SERVER_PATH
  
  echo "📥 Récupération des dernières modifications..."
  git pull origin main
  
  echo "📦 Installation des dépendances backend..."
  cd backend
  npm install
  npx prisma generate
  
  echo "📦 Installation et build du frontend..."
  cd ../frontend
  npm install
  NEXT_PUBLIC_API_URL="/api" npm run build
  
  echo "🔄 Redémarrage des services..."
  pm2 restart all
  pm2 save
  
  echo "✅ Déploiement terminé !"
ENDSSH

echo "✨ Déploiement complété avec succès!"