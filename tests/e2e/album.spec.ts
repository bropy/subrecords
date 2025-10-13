import { test, expect } from '@playwright/test'

test('should visit album page and see album details', async ({ page }) => {
  await page.goto('/')

  await page.waitForLoadState('networkidle')

  const firstAlbum = page.locator('a[href*="/album/"]').first()
  await expect(firstAlbum).toBeVisible()
  await firstAlbum.click()

  await page.waitForLoadState('networkidle')

  await expect(page).toHaveURL(/\/album\//)

  await expect(page.locator('h1, h2').first()).toBeVisible()
})

