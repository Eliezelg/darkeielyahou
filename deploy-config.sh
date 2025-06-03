#!/bin/bash

# Script pour déployer la configuration sur le VPS
# Utilisation: ./deploy-config.sh VOTRE_UTILISATEUR@VOTRE_IP

if [ -z "$1" ]; then
  echo "Usage: $0 utilisateur@adresse_ip"
  echo "Exemple: $0 root@123.456.789.10"
  exit 1
fi

VPS="$1"
TEMP_DIR="/tmp/darkeielyahou-config"
REMOTE_DIR="~/app/darkeielyahou"

# Créer un répertoire temporaire
mkdir -p "$TEMP_DIR"

# Copier le fichier de configuration actuel (ecosystem.config.js) dans le répertoire temporaire
if [ -f "ecosystem.config.js" ]; then
  cp "ecosystem.config.js" "$TEMP_DIR/"
  echo "✅ Fichier de configuration copié"
else
  echo "⚠️  Attention: Le fichier ecosystem.config.js n'existe pas localement"
  echo "Création d'un fichier à partir du template..."
  cp "ecosystem.template.js" "$TEMP_DIR/ecosystem.config.js"
  echo "ℹ️  Veuillez modifier le fichier dans $TEMP_DIR/ecosystem.config.js avant de continuer"
  echo "Puis relancez ce script"
  exit 1
fi

# Créer un script de déploiement
echo "#!/bin/bash" > "$TEMP_DIR/deploy.sh"
echo "set -e" >> "$TEMP_DIR/deploy.sh"
echo "echo '📁 Création du répertoire $REMOTE_DIR si nécessaire...'" >> "$TEMP_DIR/deploy.sh"
echo "mkdir -p $REMOTE_DIR" >> "$TEMP_DIR/deploy.sh"
echo "echo '📤 Copie de la configuration...'" >> "$TEMP_DIR/deploy.sh"
echo "cp -v ecosystem.config.js $REMOTE_DIR/" >> "$TEMP_DIR/deploy.sh"
echo "echo '✅ Configuration déployée avec succès'" >> "$TEMP_DIR/deploy.sh"

# Rendre le script exécutable
chmod +x "$TEMP_DIR/deploy.sh"

# Copier les fichiers vers le VPS
echo "🚀 Connexion au VPS et déploiement de la configuration..."
scp "$TEMP_DIR/ecosystem.config.js" "$VPS:$REMOTE_DIR/"

# Vérifier que le fichier a bien été copié
echo "✅ Fichier de configuration copié vers $VPS:$REMOTE_DIR/ecosystem.config.js"
echo ""
echo "📋 Prochaine étape :"
echo "1. Connectez-vous à votre VPS :"
echo "   ssh $VPS"
echo "2. Allez dans le dossier du projet :"
echo "   cd $REMOTE_DIR"
echo "3. Redémarrez les services :"
echo "   pm2 delete darkeielyahou-frontend darkeielyahou-backend 2>/dev/null || true"
echo "   pm2 start ecosystem.config.js --env production"
echo "   pm2 save"
echo ""
echo "🌐 Votre application devrait maintenant être accessible sur votre domaine !"
