import { test, expect } from '@playwright/test';

test.describe('Album Navigation', () => {
  test('should navigate from main page to album and display album title', async ({ page }) => {
    // Navigate to the main page
    await page.goto('/en');

    // Wait for the page to load and albums to be visible
    await page.waitForSelector('section.py-20.bg-netflix-dark-gray', { timeout: 10000 });

    // Find the first album card (Link element) and get its album name
    const firstAlbumCard = page.locator('a.group.cursor-pointer.block').first();
    await expect(firstAlbumCard).toBeVisible();
    
    // Get the album name from the main page for verification
    const albumName = await firstAlbumCard.locator('h3.font-semibold.text-netflix-white').textContent();
    expect(albumName).toBeTruthy();
    console.log('Album name from main page:', albumName);

    // Click on the album card to navigate to album detail page
    await firstAlbumCard.click();

    // Wait for navigation to album page
    await page.waitForURL(/\/en\/album\//);

    // Verify we're on an album page
    expect(page.url()).toMatch(/\/en\/album\/.+/);

    // Wait for the album detail page to load
    await page.waitForSelector('h1.text-4xl.font-bold.text-netflix-white', { timeout: 10000 });

    // Verify the album title is displayed at the top
    const albumTitle = page.locator('h1.text-4xl.font-bold.text-netflix-white');
    await expect(albumTitle).toBeVisible();
    
    // Verify the title contains text (should match the album name from main page)
    const titleText = await albumTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.trim().length).toBeGreaterThan(0);
    console.log('Album title on detail page:', titleText);

    // Additional verification: check that artist name is also displayed
    const artistName = page.locator('p.text-xl.text-netflix-text-gray');
    await expect(artistName).toBeVisible();
    
    const artistText = await artistName.textContent();
    expect(artistText).toBeTruthy();
    expect(artistText).toMatch(/^by\s+.+/); // Should start with "by " followed by artist name
    console.log('Artist name:', artistText);

    // Verify the album title matches what we clicked on (allowing for slight differences)
    expect(titleText?.toLowerCase().trim()).toContain(albumName?.toLowerCase().trim() || '');
  });
});
