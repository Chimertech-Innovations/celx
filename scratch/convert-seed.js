const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../prisma/seed.ts');
let seed = fs.readFileSync(seedPath, 'utf8');

// Convert keywords: ['a', 'b'] to keywords: 'a, b'
seed = seed.replace(/keywords:\s*\[([^\]]*)\]/g, (match, p1) => {
  // Parse elements
  const elements = p1
    .split(',')
    .map(el => el.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
  return `keywords: '${elements.join(', ')}'`;
});

fs.writeFileSync(seedPath, seed, 'utf8');
console.log('Converted seed.ts to SQLite compatibility.');
