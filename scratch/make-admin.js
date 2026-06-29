const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, '../dev.db');
const db = new Database(dbPath);

try {
  const email = 'csesilambu3@gmail.com';
  // Update the user's role to SUPER_ADMIN
  const stmt = db.prepare('UPDATE users SET role = ? WHERE email = ?');
  const result = stmt.run('SUPER_ADMIN', email);
  
  if (result.changes > 0) {
    console.log(`Successfully updated ${email} to SUPER_ADMIN.`);
    const row = db.prepare('SELECT id, email, name, role FROM users WHERE email = ?').get(email);
    console.log("Updated User Info:", JSON.stringify(row, null, 2));
  } else {
    console.log(`No user found with email ${email}.`);
  }
} catch (err) {
  console.error("Error updating database:", err);
}
