import { prisma } from '../lib/prisma'

async function run() {
  const email = 'csesilambu3@gmail.com';
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        role: 'SUPER_ADMIN'
      }
    });
    console.log("=== USER UPDATED ===");
    console.log(`Email: ${updatedUser.email}`);
    console.log(`Name: ${updatedUser.name}`);
    console.log(`New Role: ${updatedUser.role}`);
    console.log(`ID: ${updatedUser.id}`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating user:", error);
    process.exit(1);
  }
}

run();
