const fs = require('fs');
const path = require('path');

// The base URL of your website (no trailing slash)
const BASE_URL = 'https://azmaininquaid.mind-byte.com'; // Replace with your actual domain
const LAST_MOD = new Date().toISOString().split('T')[0];

// Read blog post data to generate dynamic URLs
const blogDir = path.join(__dirname, 'public/blog');
const slugsSet = new Set(['hello-world']);

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir);
  files.forEach((f) => {
    if (f.endsWith('.md')) {
      slugsSet.add(f.replace(/\.md$/, ''));
    }
  });
}

const slugs = Array.from(slugsSet);

// Static pages
const staticPages = [
  '/',  // Home page
  '/?section=about',
  '/?section=projects',
  '/?section=problem-solving',
  '/?section=research',
  '/?section=skills',
  '/?section=activities',
  '/?section=resume',
  '/?section=contact',
  '/?section=blog',
  '/name-reference.html'
];

// Create sitemap XML content
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

// Add static pages
staticPages.forEach(page => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${BASE_URL}${page}</loc>\n`;
  sitemap += `    <lastmod>${LAST_MOD}</lastmod>\n`;
  sitemap += '    <changefreq>weekly</changefreq>\n';
  sitemap += page === '/' ? '    <priority>1.0</priority>\n' : '    <priority>0.9</priority>\n';
  sitemap += '  </url>\n';
});

// Add dynamic blog pages
slugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${BASE_URL}/blog/${slug}</loc>\n`;
  sitemap += `    <lastmod>${LAST_MOD}</lastmod>\n`;
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.8</priority>\n';
  sitemap += '  </url>\n';
});

sitemap += '</urlset>';

// Write the sitemap to the public directory
fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemap);

console.log('Sitemap generated successfully!');

// Generate robots.txt with sitemap reference
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
# Allow all web crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'public/robots.txt'), robotsTxt);
console.log('Robots.txt generated successfully!'); 