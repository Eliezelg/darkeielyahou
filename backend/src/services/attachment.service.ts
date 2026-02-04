/**
 * Service de gestion des pièces jointes pour les emails
 * Gère le cache et la lecture des fichiers en base64
 */

import * as path from 'path';
import * as fs from 'fs/promises';
import type { EmailAttachment, GalaFormData } from '../types';

// Cache pour les fichiers statiques (logo, affiches)
const fileCache = new Map<string, string>();

/**
 * Lit un fichier et le convertit en base64 avec mise en cache
 */
export async function readFileAsBase64Cached(filePath: string): Promise<string | null> {
  // Vérifier le cache
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath)!;
  }

  try {
    // Vérifier si le fichier existe
    await fs.access(filePath);
    // Lire le fichier de manière asynchrone
    const content = await fs.readFile(filePath);
    const base64Content = content.toString('base64');
    // Mettre en cache
    fileCache.set(filePath, base64Content);
    return base64Content;
  } catch (error) {
    const err = error as Error;
    console.error(`Fichier non trouvé ou erreur de lecture: ${filePath}`, err.message);
    return null;
  }
}

/**
 * Obtient le chemin de l'affiche du gala selon la ville
 */
export function getGalaPosterPath(city: string, baseDir: string): string | null {
  if (!city) return null;

  const cityLowerCase = city.toLowerCase();
  const posterPaths: Record<string, string> = {
    'paris': path.join(baseDir, '../frontend/public/images/gala/paris.jpg'),
    'jerusalem': path.join(baseDir, '../frontend/public/images/gala/jerusalem.webp'),
    'strasbourg': path.join(baseDir, '../frontend/public/images/gala/strasbourg.jpg')
  };

  return posterPaths[cityLowerCase] || null;
}

/**
 * Obtient le chemin du logo
 */
export function getLogoPath(baseDir: string): string {
  return path.join(baseDir, '../frontend/public/logo/logo.jpg');
}

/**
 * Prépare la pièce jointe du logo
 */
export async function getLogoAttachment(baseDir: string): Promise<EmailAttachment | null> {
  const logoPath = getLogoPath(baseDir);
  const logoContent = await readFileAsBase64Cached(logoPath);

  if (!logoContent) {
    return null;
  }

  return {
    filename: 'logo.png',
    content: logoContent,
    type: 'image/png',
    disposition: 'inline',
    content_id: 'logo'
  };
}

/**
 * Prépare la pièce jointe de l'affiche du gala
 */
export async function getGalaPosterAttachment(city: string, baseDir: string): Promise<EmailAttachment | null> {
  const posterPath = getGalaPosterPath(city, baseDir);

  if (!posterPath) {
    console.log('Ville non reconnue pour l\'affiche:', city);
    return null;
  }

  const posterContent = await readFileAsBase64Cached(posterPath);

  if (!posterContent) {
    return null;
  }

  const cityLowerCase = city.toLowerCase();
  const extension = posterPath.includes('.webp') ? 'webp' : 'jpg';
  const mimeType = posterPath.includes('.webp') ? 'image/webp' : 'image/jpeg';

  return {
    filename: `gala-${cityLowerCase}.${extension}`,
    content: posterContent,
    type: mimeType,
    disposition: 'inline',
    content_id: 'poster'
  };
}

/**
 * Prépare les pièces jointes pour un email du gala
 */
export async function buildGalaAttachments(formData: Partial<GalaFormData> | null, baseDir: string): Promise<EmailAttachment[]> {
  const attachments: EmailAttachment[] = [];

  // Ajouter le logo
  const logoAttachment = await getLogoAttachment(baseDir);
  if (logoAttachment) {
    attachments.push(logoAttachment);
    console.log('Logo trouvé et ajouté en pièce jointe');
  }

  // Ajouter l'affiche du gala si ville spécifiée
  if (formData && formData.city) {
    const posterAttachment = await getGalaPosterAttachment(formData.city, baseDir);
    if (posterAttachment) {
      attachments.push(posterAttachment);
      console.log(`Affiche pour ${formData.city} trouvée et ajoutée en pièce jointe`);
    }
  }

  return attachments;
}

/**
 * Vide le cache des fichiers (utile pour les tests ou refresh)
 */
export function clearCache(): void {
  fileCache.clear();
}

/**
 * Obtient la taille du cache
 */
export function getCacheSize(): number {
  return fileCache.size;
}
