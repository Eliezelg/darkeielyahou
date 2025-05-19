import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * Combine plusieurs noms de classes en une seule chaîne
 * Gère automatiquement les conflits de classes Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate une date en français
 * @param date Date à formater
 * @returns Date formatée en français (ex: "15 mars 2023")
 */
export function formatDateFr(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR', options);
}

/**
 * Formate un montant en euros
 * @param amount Montant à formater
 * @returns Montant formaté (ex: "1 234,56 €")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Tronque un texte à une longueur maximale
 * @param text Texte à tronquer
 * @param maxLength Longueur maximale avant troncature
 * @returns Texte tronqué avec "..." si nécessaire
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Génère un identifiant unique
 * @returns Un identifiant unique
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Vérifie si une valeur est vide
 * @param value Valeur à vérifier
 * @returns true si la valeur est vide, null ou undefined
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

/**
 * Met en majuscule la première lettre d'une chaîne
 * @param str Chaîne à formater
 * @returns Chaîne avec la première lettre en majuscule
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Valide une adresse email
 * @param email Adresse email à valider
 * @returns true si l'email est valide, false sinon
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Retarde l'exécution d'une fonction
 * @param ms Nombre de millisecondes à attendre
 * @returns Une promesse qui se résout après le délai
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gestion des erreurs asynchrones
 * @param promise Promesse à exécuter
 * @returns Un tuple [data, error]
 */
export async function asyncHandler<T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}
