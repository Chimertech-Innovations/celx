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
    console.log("Checking Database Connection and Tables...");
    
    const userCount = await prisma.user.count();
    console.log(`- Users count: ${userCount}`);
    
    const journalCount = await prisma.journal.count();
    console.log(`- Journals count: ${journalCount}`);
    
    const articleCount = await prisma.article.count();
    console.log(`- Articles count: ${articleCount}`);
    
    const volumeCount = await prisma.volume.count();
    console.log(`- Volumes count: ${volumeCount}`);
    
    const issueCount = await prisma.issue.count();
    console.log(`- Issues count: ${issueCount}`);

    const announcementCount = await prisma.announcement.count();
    console.log(`- Announcements count: ${announcementCount}`);

    console.log("All checked successfully!");
  } catch (err) {
    console.error("Database diagnosis error:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
