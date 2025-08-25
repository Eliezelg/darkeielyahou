#!/usr/bin/env node

const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    console.log('\n=== Création d\'un administrateur ===\n');
    
    // Demander les informations
    const email = await question('Email de l\'administrateur: ');
    const fullName = await question('Nom complet: ');
    const password = await question('Mot de passe (min. 8 caractères): ');
    
    // Validation
    if (!email || !email.includes('@')) {
      throw new Error('Email invalide');
    }
    
    if (password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }
    
    // Vérifier si l'email existe déjà
    const existing = await prisma.adminUser.findUnique({
      where: { email }
    });
    
    if (existing) {
      throw new Error('Un administrateur avec cet email existe déjà');
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
    console.log(`Email: ${admin.email}`);
    console.log(`Nom: ${admin.fullName}`);
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAdmin();