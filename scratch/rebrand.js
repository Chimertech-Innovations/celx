const fs = require('fs');
const path = require('path');

const TARGET_DIRS = ['app', 'components', 'lib', 'prisma'];
const ROOT_DIR = 'd:\\Project\\Cl\\celx';

const EXTENSIONS = ['.ts', '.tsx', '.json', '.css', '.prisma', '.yml'];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (EXTENSIONS.includes(path.extname(f))) {
        callback(dirPath);
      }
    }
  });
}

console.log('🔄 Starting branding find-and-replace...');

let modifiedCount = 0;

walkDir(ROOT_DIR, filePath => {
  // Only target the specific directories
  const relative = path.relative(ROOT_DIR, filePath);
  const firstSegment = relative.split(path.sep)[0];
  if (!TARGET_DIRS.includes(firstSegment) && relative !== 'package.json') {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace occurrences
  content = content.replace(/CelX/g, 'CleX');
  content = content.replace(/CELX/g, 'CLEX');
  // Also optionally lowercase celx to clex if they exist (but not in file paths or package names)
  content = content.replace(/celx\.org/g, 'clex.org');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Rebranded: ${relative}`);
    modifiedCount++;
  }
});

console.log(`🎉 Done! Rebranded ${modifiedCount} files.`);
