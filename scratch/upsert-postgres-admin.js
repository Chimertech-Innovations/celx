require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    // 1. Ensure admin@celx.test is SUPER_ADMIN
    console.log("Upserting/Updating admin@celx.test...");
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@celx.test' },
      update: { role: 'SUPER_ADMIN' },
      create: {
        name: 'Super Admin',
        email: 'admin@celx.test',
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    console.log(`Updated admin@celx.test: ID=${adminUser.id}, Role=${adminUser.role}`);

    // 2. Ensure csesilambu3@gmail.com is SUPER_ADMIN
    console.log("Upserting/Updating csesilambu3@gmail.com...");
    const personalUser = await prisma.user.upsert({
      where: { email: 'csesilambu3@gmail.com' },
      update: { role: 'SUPER_ADMIN' },
      create: {
        name: 'Silambarasan',
        email: 'csesilambu3@gmail.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });
    console.log(`Updated csesilambu3@gmail.com: ID=${personalUser.id}, Role=${personalUser.role}`);
    
    console.log("Database update completed successfully.");
  } catch (err) {
    console.error("Error updating PostgreSQL:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
