require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { role: 'asc' }
    });
    console.log("=== POSTGRES USER LIST ===");
    users.forEach(u => {
      console.log(`Email: ${u.email}`);
      console.log(`Name: ${u.name}`);
      console.log(`Role: ${u.role}`);
      console.log(`ID: ${u.id}`);
      console.log("-------------------");
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}
run();
