const { PrismaClient } = require('../generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function applyMigration() {
  try {
    console.log('Application de la migration pour supprimer KOL_JOIN...');
    
    // Lire le contenu de la migration
    const migrationPath = path.join(__dirname, '../prisma/migrations/20250729_remove_kol_join/migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Diviser en requêtes individuelles
    const queries = migrationSQL
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);
    
    // Exécuter chaque requête
    for (const query of queries) {
      try {
        console.log(`Exécution: ${query.substring(0, 50)}...`);
        await prisma.$executeRawUnsafe(query);
        console.log('✓ Succès');
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log('⚠ Déjà existant, ignoré');
        } else if (error.message.includes('does not exist')) {
          console.log('⚠ N\'existe pas, ignoré');
        } else {
          throw error;
        }
      }
    }
    
    console.log('\n✅ Migration appliquée avec succès!');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'application de la migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

applyMigration();