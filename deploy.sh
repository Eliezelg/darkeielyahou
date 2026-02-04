#!/bin/bash

# ===========================================
# Script de déploiement robuste pour Darkei Elyahou
# Version: 2.0.0 - Avec rollback et healthcheck
# ===========================================

set -e

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Variables
PROJECT_DIR="/root/app/darkeielyahou"
BACKUP_DIR="/root/app/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

log_info "🚀 Début du déploiement Darkei Elyahou"

# Vérification de l'existence des fichiers de configuration nécessaires
if [ ! -f "$PROJECT_DIR/.env.production.local" ]; then
  log_error "Le fichier .env.production.local n'existe pas!"
  echo "   Veuillez créer ce fichier à partir de .env.production.local.example"
  echo "   et remplir les informations sensibles (mots de passe, clés API, etc.)"
  exit 1
fi

# Aller dans le répertoire du projet
cd "$PROJECT_DIR"

# Créer une sauvegarde avant déploiement
log_info "💾 Création d'une sauvegarde..."
mkdir -p "$BACKUP_DIR"
if [ -d "frontend/.next" ]; then
  cp -r frontend/.next "$BACKUP_DIR/.next_$TIMESTAMP" 2>/dev/null || true
fi

# Fonction de rollback en cas d'erreur
rollback() {
  log_error "❌ Erreur lors du déploiement! Tentative de rollback..."
  if [ -d "$BACKUP_DIR/.next_$TIMESTAMP" ]; then
    rm -rf frontend/.next
    cp -r "$BACKUP_DIR/.next_$TIMESTAMP" frontend/.next
    pm2 reload ecosystem.config.js --env production || true
    log_warn "Rollback effectué vers la version précédente"
  fi
  exit 1
}

# Capturer les erreurs pour rollback
trap rollback ERR

# Pull des derniers changements
log_info "📥 Récupération des derniers changements..."
git fetch origin main
git reset --hard origin/main

# Installation des dépendances backend
log_info "📦 Installation des dépendances backend..."
cd backend
npm ci --production=false
npx prisma generate

# Installation des dépendances frontend
log_info "📦 Installation des dépendances frontend..."
cd ../frontend
npm ci --production=false

# Build du frontend avec les bonnes variables d'environnement
log_info "🔨 Build du frontend..."
rm -rf .next

# Utilise les variables d'environnement du fichier .env.production.local
source ../.env.production.local
NEXT_PUBLIC_API_URL="/api" npm run build

# Retour au répertoire racine
cd ..

# Rechargement gracieux de PM2 (sans interruption de service)
log_info "🔄 Rechargement gracieux des services PM2..."
if pm2 list | grep -q "darkeielyahou"; then
  # Les apps existent, on les recharge
  pm2 reload ecosystem.config.js --env production --update-env
else
  # Première installation, on démarre
  pm2 start ecosystem.config.js --env production
fi
pm2 save

# Redémarrage de nginx
log_info "🌐 Rechargement de nginx..."
sudo systemctl reload nginx

# Healthcheck - vérifier que les services répondent
log_info "🏥 Vérification de la santé des services..."
sleep 5  # Attendre que les services démarrent

# Test du backend
BACKEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health || echo "000")
if [ "$BACKEND_HEALTH" = "200" ]; then
  log_info "✅ Backend opérationnel (HTTP $BACKEND_HEALTH)"
else
  log_error "❌ Backend non disponible (HTTP $BACKEND_HEALTH)"
  rollback
fi

# Test du frontend
FRONTEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")
if [ "$FRONTEND_HEALTH" = "200" ]; then
  log_info "✅ Frontend opérationnel (HTTP $FRONTEND_HEALTH)"
else
  log_warn "⚠️ Frontend retourne HTTP $FRONTEND_HEALTH (peut être normal pour certaines pages)"
fi

# Nettoyage des anciennes sauvegardes (garder les 5 dernières)
log_info "🧹 Nettoyage des anciennes sauvegardes..."
cd "$BACKUP_DIR"
ls -t .next_* 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null || true

# Désactiver le trap
trap - ERR

# Vérification de l'état des services
log_info "🔍 État des services déployés:"
pm2 list

log_info "✅ Déploiement terminé avec succès!"
echo ""
echo "🌍 Application disponible sur: https://darkei-elyahou.org"
echo "📝 Commandes utiles:"
echo "   - pm2 logs          : Voir les logs en temps réel"
echo "   - pm2 monit         : Monitoring des processus"
echo "   - pm2 status        : État des services"