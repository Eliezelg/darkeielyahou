import fs from 'fs';
import path from 'path';

// Chemin vers le dossier des actions
const actionsDir = path.join(process.cwd(), 'app/actions');

// Fonction pour mettre à jour une page
function updatePage(filePath: string) {
  try {
    // Lire le contenu actuel du fichier
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Vérifier si la page a déjà été mise à jour
    if (content.includes('bg-primary/95 text-white py-24')) {
      console.log(`Skipping ${filePath} - already updated`);
      return;
    }
    
    // Extraire le titre principal et le sous-titre
    const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const subtitleMatch = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    
    if (!titleMatch) {
      console.log(`Skipping ${filePath} - no h1 found`);
      return;
    }
    
    const title = titleMatch[0];
    const titleContent = titleMatch[1].trim();
    const subtitle = subtitleMatch ? subtitleMatch[0] : '';
    
    // Créer le nouveau header avec le style bleu
    const newHeader = `
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-primary/95 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-6 animate-fade-in">
            ${titleContent}
          </h1>
          ${subtitle ? `<h2 className="text-xl md:text-2xl text-center mb-8">
            ${subtitle.replace(/className="[^"]*"/g, '')}
          </h2>` : ''}
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">`;
    
    // Remplacer le contenu existant
    content = content.replace(/<div[^>]*className=["'][^"']*container[^"']*["'][^>]*>/, newHeader);
    
    // Ajouter les balises de fermeture manquantes
    if (!content.includes('</div>\n  </div>')) {
      content = content.replace(/\s*<\/div>\s*$/, '\n    </div>\n  </div>');
    }
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
    
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
}

// Fonction pour parcourir le dossier des actions
function processDirectory(directory: string) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Si c'est un dossier, le parcourir récursivement
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      // Si c'est un fichier page.tsx, le mettre à jour
      updatePage(fullPath);
    }
  });
}

// Démarrer le processus
console.log('Starting to update action pages...');
processDirectory(actionsDir);
console.log('Update process completed!');
