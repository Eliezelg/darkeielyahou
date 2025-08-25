const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createDefaultAdmin() {
  try {
    const email = process.argv[2] || 'admin@darkei-elyahou.org';
    const password = process.argv[3] || 'Admin123!';
    const fullName = process.argv[4] || 'Administrateur Principal';
    
    console.log('\n=== Création d\'un administrateur ===');
    console.log(`Email: ${email}`);
    console.log(`Nom: ${fullName}`);
    console.log(`Mot de passe: ${password}`);
    
    // Vérifier si l'email existe déjà
    const existing = await prisma.adminUser.findUnique({
      where: { email }
    });
    
    if (existing) {
      console.log('\n⚠️  Un administrateur avec cet email existe déjà');
      console.log('Pour créer un autre admin, utilisez:');
      console.log('node scripts/create-admin-quick.js autre-email@example.com MotDePasse123! "Nom Complet"');
      return;
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer l'administrateur
    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        isActive: true
      }
    });
    
    console.log('\n✅ Administrateur créé avec succès !');
    console.log('\n📝 Connexion à l\'administration:');
    console.log(`   URL: http://localhost:3000/admin`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Mot de passe: ${password}`);
    console.log('\n⚠️  IMPORTANT: Changez ce mot de passe dès votre première connexion !');
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createDefaultAdmin();