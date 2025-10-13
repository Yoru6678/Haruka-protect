const fs = require("fs");
const path = require("path");

const baseDir = process.cwd();
const extensions = [".js", ".ts", ".jsx", ".cjs", ".mjs"];

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file === "node_modules") continue;
      walk(fullPath, files);
    } else if (extensions.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function fixFile(filePath) {
  if (filePath === __filename) return;

  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // 1. await dans .get(...) → séparer en deux lignes
  content = content.replace(
    /client\.channels\.cache\.get\(\s*await\s+([^)]+)\)/g,
    (_, expr) => {
      return `const raidlogId = await ${expr};\nconst channel = client.channels.cache.get(raidlogId)`;
    }
  );

  // 2. await await → await
  content = content.replace(/\bawait\s+await\b/g, "await");

  // 3. await .await → .await
  content = content.replace(/\bawait\s+\.\s*await(\w*)/g, ".$1");

  // 4. ;.send(...) → .send(...)
  content = content.replace(/;\s*\.(\w+)/g, (_, method) => `\n${method}`);

  // 5. const a = const b = ... → séparer
  content = content.replace(
    /const\s+(\w+)\s*=\s*const\s+(\w+)\s*=\s*(await\s+[^\n;]+);?/g,
    (_, a, b, expr) => `const ${b} = ${expr};\nconst ${a} = client.channels.cache.get(${b});`
  );

  // 6. execute(...) → async execute(...)
  content = content.replace(
    /(?<!async\s)execute\s*\(([^)]*)\)\s*{/g,
    "async execute($1) {"
  );

  // 7. Redéclaration de channel → renommer
  let seenChannel = 0;
  content = content.replace(/const\s+channel\s*=/g, () => {
    seenChannel++;
    return seenChannel === 1 ? "const channel =" : `const channel${seenChannel} =`;
  });

  // 8. Redéclaration de raidlogChannel → renommer
  let seenRaid = 0;
  content = content.replace(/const\s+raidlogChannel\s*=/g, () => {
    seenRaid++;
    return seenRaid === 1 ? "const raidlogChannel =" : `const raidlogChannel${seenRaid} =`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ corrigé : ${filePath}`);
  }
}

const allFiles = walk(baseDir);
allFiles.forEach(fixFile);