#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.join(__dirname, 'dist', 'assets');
const markdownFile = path.join(__dirname, '..', '..', '..', '_pages', 'paper_cards.md');

console.log('🔄 Updating paper_cards.md with new asset references...');

try {
  // Read the dist/assets directory to find the generated files
  const files = fs.readdirSync(distDir);
  
  // Find the JS and CSS files
  const jsFile = files.find(file => file.startsWith('index-') && file.endsWith('.js'));
  const cssFile = files.find(file => file.startsWith('index-') && file.endsWith('.css'));
  
  if (!jsFile || !cssFile) {
    console.error('❌ Could not find generated JS or CSS files in dist/assets');
    console.log('Available files:', files);
    process.exit(1);
  }
  
  console.log(`📄 Found JS file: ${jsFile}`);
  console.log(`🎨 Found CSS file: ${cssFile}`);
  
  // Read the current markdown file
  let markdownContent = fs.readFileSync(markdownFile, 'utf8');
  
  // Create the new script and link tags
  const newScriptTag = `<script type="module" src="/assets/apps/paper-cards/dist/assets/${jsFile}"></script>`;
  const newLinkTag = `<link rel="stylesheet" href="/assets/apps/paper-cards/dist/assets/${cssFile}">`;
  
  // Replace the existing script and link tags using regex
  // Match script tag with type="module" and src containing paper-cards
  const scriptRegex = /<script type="module" src="\/assets\/apps\/paper-cards\/dist\/assets\/index-[^"]+\.js"><\/script>/;
  const linkRegex = /<link rel="stylesheet" href="\/assets\/apps\/paper-cards\/dist\/assets\/index-[^"]+\.css">/;
  
  // Check if patterns exist in the file
  if (!scriptRegex.test(markdownContent)) {
    console.error('❌ Could not find existing script tag pattern in markdown file');
    process.exit(1);
  }
  
  if (!linkRegex.test(markdownContent)) {
    console.error('❌ Could not find existing link tag pattern in markdown file');
    process.exit(1);
  }
  
  // Replace the tags
  markdownContent = markdownContent.replace(scriptRegex, newScriptTag);
  markdownContent = markdownContent.replace(linkRegex, newLinkTag);
  
  // Write the updated content back to the file
  fs.writeFileSync(markdownFile, markdownContent, 'utf8');
  
  console.log('✅ Successfully updated paper_cards.md');
  console.log(`   Script: ${newScriptTag}`);
  console.log(`   Link:   ${newLinkTag}`);
  
} catch (error) {
  console.error('❌ Error updating markdown file:', error.message);
  process.exit(1);
}