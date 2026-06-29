const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Replace provider = "postgresql" with provider = "sqlite"
schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');

// Remove @db.Text
schema = schema.replace(/\s*@db\.Text/g, '');

// Change keywords String[] to keywords String
schema = schema.replace(/keywords\s+String\[\]/g, 'keywords String');

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Converted schema.prisma to SQLite compatibility.');
