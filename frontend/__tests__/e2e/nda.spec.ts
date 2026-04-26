import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const fillForm = async (page: Page) => {
  await page.getByPlaceholder('How Confidential Information may be used').fill('Evaluating a potential acquisition');
  await page.locator('input[type="date"]').first().fill('2026-04-22');
  // Governing law field is labeled "State" with placeholder "e.g. Delaware"
  await page.getByLabel('State').fill('California');
  await page.getByLabel('Jurisdiction').fill('San Francisco, California');
  // Party 1
  await page.locator('input[placeholder="Print Name"]').first().fill('Alice Smith');
  await page.locator('input[placeholder="Title"]').first().fill('CEO');
  await page.locator('input[placeholder="Company"]').first().fill('Acme Corp');
  // Party 2
  await page.locator('input[placeholder="Print Name"]').nth(1).fill('Bob Jones');
  await page.locator('input[placeholder="Title"]').nth(1).fill('CTO');
  await page.locator('input[placeholder="Company"]').nth(1).fill('Beta LLC');
};

test.describe('NDA Creator — page load', () => {
  test('loads successfully and shows key headings', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Mutual NDA Creator' })).toBeVisible();
    await expect(page.getByText('Mutual Non-Disclosure Agreement').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Standard Terms' })).toBeVisible();
  });

  test('Download PDF button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /download pdf/i })).toBeVisible();
  });
});

test.describe('NDA Creator — form interaction', () => {
  test('typing purpose updates the preview', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('How Confidential Information may be used').fill('Strategic acquisition evaluation');
    await expect(page.locator('#nda-doc').getByText('Strategic acquisition evaluation').first()).toBeVisible();
  });

  test('typing governing law updates the preview', async ({ page }) => {
    await page.goto('/');
    // Field label is "State", placeholder is "e.g. Delaware"
    await page.getByLabel('State').fill('Delaware');
    await expect(page.locator('#nda-doc').getByText('Delaware').first()).toBeVisible();
  });

  test('party company names appear in signature table headers', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[placeholder="Company"]').first().fill('Acme Corp');
    await page.locator('input[placeholder="Company"]').nth(1).fill('Beta LLC');
    await expect(page.locator('#nda-doc').getByText('Party 1 — Acme Corp')).toBeVisible();
    await expect(page.locator('#nda-doc').getByText('Party 2 — Beta LLC')).toBeVisible();
  });

  test('switching MNDA term to "until terminated" checks the second radio', async ({ page }) => {
    await page.goto('/');
    // Label text in the form is "Until terminated"
    await page.getByText('Until terminated').click();
    const doc = page.locator('#nda-doc');
    // The "until_terminated" check row should now show ☑
    await expect(doc.getByText(/Continues until terminated/)).toBeVisible();
  });
});

test.describe('NDA Creator — PDF page-break structure in DOM', () => {
  test('document has exactly two .page-break elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#nda-doc .page-break')).toHaveCount(2);
  });

  test('first .page-break wraps the signature table', async ({ page }) => {
    await page.goto('/');
    const firstBreak = page.locator('#nda-doc .page-break').first();
    await expect(firstBreak.locator('table')).toBeVisible();
  });

  test('second .page-break contains Standard Terms heading', async ({ page }) => {
    await page.goto('/');
    const secondBreak = page.locator('#nda-doc .page-break').nth(1);
    await expect(secondBreak.getByRole('heading', { name: 'Standard Terms' })).toBeVisible();
  });

  test('both .page-break elements have pageBreakBefore: always inline style', async ({ page }) => {
    await page.goto('/');
    const breaks = page.locator('#nda-doc .page-break');
    const count = await breaks.count();
    for (let i = 0; i < count; i++) {
      const style = await breaks.nth(i).getAttribute('style');
      // Next.js minifies inline styles: no space after colon
      expect(style).toMatch(/page-break-before:\s*always/);
    }
  });

  test('signature table page comes before Standard Terms page in DOM order', async ({ page }) => {
    await page.goto('/');
    // Use DOM compareDocumentPosition to verify order without relying on text indices
    const isFirstBeforeSecond = await page.evaluate(() => {
      const breaks = document.querySelectorAll('#nda-doc .page-break');
      if (breaks.length < 2) return false;
      const pos = breaks[0].compareDocumentPosition(breaks[1]);
      return !!(pos & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(isFirstBeforeSecond).toBe(true);
  });
});

test.describe('NDA Creator — PDF download', () => {
  test('clicking Download PDF triggers a file download named mutual-nda.pdf', async ({ page }) => {
    await page.goto('/');
    await fillForm(page);

    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 30000 }),
      page.getByRole('button', { name: /download pdf/i }).click(),
    ]);

    expect(download.suggestedFilename()).toBe('mutual-nda.pdf');

    const downloadPath = path.join(process.cwd(), '__tests__', 'e2e', 'downloads', 'mutual-nda.pdf');
    fs.mkdirSync(path.dirname(downloadPath), { recursive: true });
    await download.saveAs(downloadPath);

    const stat = fs.statSync(downloadPath);
    expect(stat.size).toBeGreaterThan(10000);
  });
});
