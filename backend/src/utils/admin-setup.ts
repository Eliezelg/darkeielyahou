/**
 * Script de configuration de l'utilisateur admin initial
 */

import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function setupAdminUser(): Promise<void> {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await prisma.adminUser.findFirst({
      where: { email: 'admin@darkei-elyahou.org' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Créer le mot de passe hashé
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeMe123!', 10);

    // Créer l'admin
    const admin = await prisma.adminUser.create({
      data: {
        email: 'admin@darkei-elyahou.org',
        password: hashedPassword,
        fullName: 'Administrateur Principal',
        isActive: true
      }
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error setting up admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  setupAdminUser();
}
