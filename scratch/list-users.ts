import { prisma } from '../lib/prisma'

async function run() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { role: 'asc' }
    });
    console.log("=== USER LIST ===");
    users.forEach(u => {
      console.log(`Email: ${u.email}`);
      console.log(`Name: ${u.name}`);
      console.log(`Role: ${u.role}`);
      console.log(`ID: ${u.id}`);
      console.log("-------------------");
    });
    process.exit(0);
  } catch (error) {
    console.error("Error querying users:", error);
    process.exit(1);
  }
}

run();
