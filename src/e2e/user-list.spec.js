import { test, expect } from '@playwright/test';

test('page load', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('heading', { name: 'User Explorer' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Search users' })).toBeVisible();
});

test('filter function', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    const searchInput = page.getByRole('textbox', { name: 'Search users' });
    await searchInput.click();
    await searchInput.fill('leanne');
    
    const listItems = page.getByTestId('user-item');
    await expect(listItems).toHaveCount(1);
    
    const moreBtn = listItems.locator('[data-testid="more-btn"]');
    await expect(moreBtn).toBeVisible();
    
    await moreBtn.click();
    const userCard = page.getByTestId('user-card');
    await expect(userCard).toBeVisible();
    await expect(userCard).toContainText('Leanne Graham');
    
    await userCard.getByRole('button', { name: 'Close' }).click();
    await expect(userCard).not.toBeVisible();
});
