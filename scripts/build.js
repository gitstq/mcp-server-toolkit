// Build script for MCP Server Toolkit
import fs from 'fs';
import path from 'path';

const distDir = './dist';

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy bin directory
const srcBin = './bin';
const destBin = path.join(distDir, 'bin');

if (fs.existsSync(srcBin)) {
  if (!fs.existsSync(destBin)) {
    fs.mkdirSync(destBin, { recursive: true });
  }
  const files = fs.readdirSync(srcBin);
  for (const file of files) {
    fs.copyFileSync(path.join(srcBin, file), path.join(destBin, file));
    console.log('Copied: bin/' + file);
  }
}

// Copy src directory
const srcDir = './src';
const destSrc = path.join(distDir, 'src');

if (fs.existsSync(srcDir)) {
  if (!fs.existsSync(destSrc)) {
    fs.mkdirSync(destSrc, { recursive: true });
  }

  function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else if (entry.name.endsWith('.js')) {
        fs.copyFileSync(srcPath, destPath);
        console.log('Copied: ' + path.relative('./', srcPath));
      }
    }
  }
  copyDir(srcDir, destSrc);
}

console.log('\nBuild complete. Output in ./dist/');
console.log('Run with: node dist/bin/cli.js');
