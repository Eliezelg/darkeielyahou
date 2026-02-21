# Dockerfile pour le backend Express.js sur Railway
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (y compris devDependencies pour la compilation)
RUN npm ci

# Copier le code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Compiler le TypeScript
RUN npm run build

# Supprimer les devDependencies pour l'image finale
RUN npm prune --production

# Exposer le port
EXPOSE 3001

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3001

# Commande de démarrage
CMD ["npm", "start"]
