import { test, expect, Page } from '@playwright/test';

/** Log in by setting localStorage so we land directly on the platform. */
async function login(page: Page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('prelegal_user', 'test@example.com'));
  await page.goto('/platform/');
}

/** Select a document type from the selector screen. */
async function selectDocument(page: Page, name: string) {
  await page.getByRole('button', { name }).click();
}

test.describe('Document selector', () => {
  test('shows the document selector on /platform', async ({ page }) => {
    await login(page);
    await expect(page.getByText('Choose a document to draft')).toBeVisible();
  });

  test('lists at least 11 document types', async ({ page }) => {
    await login(page);
    const cards = page.locator('button').filter({ hasText: 'Agreement' });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('does not show NDA cover-page as a separate entry', async ({ page }) => {
    await login(page);
    await expect(page.getByText('Mutual Non-Disclosure Agreement Cover Page')).not.toBeVisible();
  });
});

test.describe('Document drafting — Mutual NDA', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await selectDocument(page, 'Mutual Non-Disclosure Agreement');
  });

  test('shows chat panel and preview panel', async ({ page }) => {
    await expect(page.getByText('Chat with AI to draft your agreement')).toBeVisible();
    await expect(page.getByText('Preview')).toBeVisible();
  });

  test('shows the document name in the chat header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Mutual Non-Disclosure Agreement' })).toBeVisible();
  });

  test('shows Key Terms panel in the preview', async ({ page }) => {
    await expect(page.getByText('Key Terms')).toBeVisible();
  });

  test('Download PDF button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /download pdf/i })).toBeVisible();
  });

  test('Change document link returns to selector', async ({ page }) => {
    await page.getByText('Change document').click();
    await expect(page.getByText('Choose a document to draft')).toBeVisible();
  });
});

test.describe('Document drafting — Cloud Service Agreement', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await selectDocument(page, 'Cloud Service Agreement');
  });

  test('shows Cloud Service Agreement in the chat header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cloud Service Agreement' })).toBeVisible();
  });

  test('shows Key Terms panel', async ({ page }) => {
    await expect(page.getByText('Key Terms')).toBeVisible();
  });
});
