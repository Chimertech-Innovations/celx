const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../prisma/seed.ts');
let seed = fs.readFileSync(seedPath, 'utf8');

// Remove skipDuplicates: true
seed = seed.replace(/\s*skipDuplicates:\s*true,?/g, '');

fs.writeFileSync(seedPath, seed, 'utf8');
console.log('Removed all skipDuplicates from seed.ts.');
