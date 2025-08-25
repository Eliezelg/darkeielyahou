import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Activer le débogage
const DEBUG = true;

// Fonction pour journaliser les messages de débogage
function debug(message: string, data?: any) {
  if (DEBUG) {
    console.log(`[CAROUSEL API] ${message}`, data || '');
  }
}

// Images à exclure explicitement
const EXCLUDED_IMAGES = ['avrehim.png'];

export async function GET() {
  try {
    debug('Démarrage de la récupération des images du carrousel');
    const carouselDir = path.join(process.cwd(), 'public', 'images', 'carousel');
    debug('Dossier du carrousel', carouselDir);
    
    // Vérifier si le dossier existe
    if (!fs.existsSync(carouselDir)) {
      debug('Le dossier du carrousel n\'existe pas, renvoi d\'un tableau vide');
      return NextResponse.json({ images: [] });
    }
    
    // Lire le contenu du dossier
    const files = fs.readdirSync(carouselDir);
    debug('Fichiers trouvés dans le dossier du carrousel', files);
    
    // Filtrer pour ne garder que les fichiers image (prioriser WebP)
    const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif'];
    // Trier les fichiers par nom de base et extension pour privilégier WebP
    const imageMap = new Map();
    
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext).replace('_resultat', '');
      const isImage = imageExtensions.includes(ext);
      
      if (!isImage) {
        debug(`Fichier ignoré (pas une image): ${file}`);
        return;
      }
      
      // Ignorer les fichiers .md ou autres non-images
      if (file.endsWith('.md')) {
        debug(`Fichier markdown ignoré: ${file}`);
        return;
      }
      
      // Si on a déjà une image avec ce nom de base, vérifier si l'extension actuelle est prioritaire
      if (imageMap.has(baseName)) {
        const existingFile = imageMap.get(baseName);
        const existingExt = path.extname(existingFile).toLowerCase();
        const currentPriority = imageExtensions.indexOf(ext);
        const existingPriority = imageExtensions.indexOf(existingExt);
        
        // Si l'extension actuelle est plus prioritaire (index plus petit dans imageExtensions)
        if (currentPriority < existingPriority) {
          debug(`Remplacement de ${existingFile} par ${file} (priorité d'extension plus élevée)`); 
          imageMap.set(baseName, file);
        }
      } else {
        // Si c'est la première fois qu'on voit ce nom de base
        imageMap.set(baseName, file);
      }
    });
    
    // Convertir la map en tableau de chemins d'images
    const images = Array.from(imageMap.values()).map(file => `/images/carousel/${file}`);
    
    debug('Images filtrées pour le carrousel', images);
    
    // Si aucune image n'est trouvée, renvoyer un tableau vide
    if (images.length === 0) {
      debug('Aucune image trouvée, renvoi d\'un tableau vide');
      return NextResponse.json({ images: [] });
    }
    
    // Valider que les images existent réellement et exclure les images non désirées
    const validatedImages = images.filter(imagePath => {
      // Vérifier si l'image est dans la liste d'exclusion
      const filename = path.basename(imagePath);
      if (EXCLUDED_IMAGES.some(excluded => filename.includes(excluded))) {
        debug(`Image exclue: ${imagePath}`);
        return false;
      }
      
      // Vérifier si l'image existe
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      debug(`Vérification du chemin: ${fullPath}`);
      const exists = fs.existsSync(fullPath);
      if (!exists) {
        debug(`Image introuvable sur le chemin: ${fullPath}`);
        return false;
      }
      
      debug(`Image validée: ${imagePath}`);
      return true;
    });
    
    debug('Images validées pour le carrousel', validatedImages);
    
    // Si aucune image valide n'est trouvée, renvoyer un tableau vide
    if (validatedImages.length === 0) {
      debug('Aucune image valide trouvée, renvoi d\'un tableau vide');
      return NextResponse.json({ images: [] });
    }
    
    // Utiliser uniquement les images validées
    debug('Liste finale des images pour le carrousel', validatedImages);
    
    return NextResponse.json({ images: validatedImages });
  } catch (error) {
    console.error('Erreur lors de la lecture du dossier d\'images:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
