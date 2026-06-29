const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, '../dev.db');
const db = new Database(dbPath);
try {
  const rows = db.prepare('SELECT id, email, name, role FROM users').all();
  console.log(JSON.stringify(rows, null, 2));
} catch (err) {
  console.error(err);
}
