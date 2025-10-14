import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const screenshotsDir = join(__dirname, '..', 'screenshots');

// Create screenshots directory
try {
  mkdirSync(screenshotsDir, { recursive: true });
} catch (err) {
  console.error('Error creating screenshots directory:', err);
}

const baseURL = 'http://localhost:3001';
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

const pages = [
  { name: 'home', path: '/' },
  { name: 'post', path: '/posts/react-18-new-features' },
  { name: 'tags', path: '/tags' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' }
];

async function captureScreenshots() {
  const browser = await chromium.launch();

  for (const theme of ['light', 'dark']) {
    console.log(`\n📸 Capturing ${theme} theme screenshots...`);

    const context = await browser.newContext({
      colorScheme: theme === 'dark' ? 'dark' : 'light'
    });

    const page = await context.newPage();

    for (const pageConfig of pages) {
      console.log(`  → ${pageConfig.name} page`);

      try {
        await page.goto(`${baseURL}${pageConfig.path}`, {
          waitUntil: 'networkidle',
          timeout: 10000
        });

        // Wait for content to load
        await page.waitForTimeout(500);

        for (const viewport of viewports) {
          await page.setViewportSize({
            width: viewport.width,
            height: viewport.height
          });

          // Wait for layout to settle
          await page.waitForTimeout(300);

          const filename = `${pageConfig.name}-${theme}-${viewport.name}.png`;
          await page.screenshot({
            path: join(screenshotsDir, filename),
            fullPage: true
          });

          console.log(`    ✓ ${viewport.name} (${viewport.width}x${viewport.height})`);
        }

        // Capture hover states for interactive elements on desktop
        if (pageConfig.name === 'home') {
          await page.setViewportSize({ width: 1440, height: 900 });

          // Hover over first article card
          const articleCard = await page.locator('.article-card').first();
          if (await articleCard.count() > 0) {
            await articleCard.hover();
            await page.waitForTimeout(200);
            await page.screenshot({
              path: join(screenshotsDir, `${pageConfig.name}-${theme}-card-hover.png`),
              fullPage: true
            });
            console.log(`    ✓ card hover state`);
          }
        }

        // Capture navbar interactions
        if (pageConfig.name === 'home') {
          await page.setViewportSize({ width: 1440, height: 900 });
          const navLink = await page.locator('.navbar a').first();
          if (await navLink.count() > 0) {
            await navLink.hover();
            await page.waitForTimeout(200);
            await page.screenshot({
              path: join(screenshotsDir, `navbar-${theme}-hover.png`),
              clip: { x: 0, y: 0, width: 1440, height: 100 }
            });
          }
        }

      } catch (error) {
        console.error(`    ✗ Error capturing ${pageConfig.name}:`, error.message);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\n✨ Screenshot capture completed!');
  console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
}

// Run the script
captureScreenshots().catch(console.error);
