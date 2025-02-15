// AuthStack & HomeStack
import { navigateToHomeScreen } from "./helpers";

describe('AuthStack & Home Stack', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always', // inuse||never||unset
        photos: 'YES',
        // medialibrary: 'YES',
      }
    });
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Login screen displays correctly', async () => {
    await waitFor(element(by.id('email-input'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('welcome-text'))).toBeVisible();
    await expect(element(by.text('Continue with Email'))).toBeVisible();
  });

  it('Navigate to EmailLinkSent screen', async () => {
    await element(by.id('email-input')).replaceText('kingyx6@gmail.com'); // kingyx4@gmail.com
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Login Link Sent'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.text('Continue with Email'))).not.toBeVisible();
  });

  it('Navigate back to Login screen', async () => {
    await element(by.id("back-button")).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('welcome-text'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('email-input')).replaceText('kingyx3@hotmail.com');
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen()
  });

  it('Navigate to TopUp screen', async () => {
    await element(by.id('top-up-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Top Up Wallet'))).toBeVisible().withTimeout(60000);
    await expect(element(by.text("Top Up Amount"))).toBeVisible()
  });

  it('TopUp $100 can be selected & Navigate back to Home screen', async () => {
    await element(by.id('top-up-button-100')).tap();

    // Wait for action to complete & perform the visibility checks
    await waitFor(element(by.text('SGD 100'))).toBeVisible().withTimeout(60000);
    await expect(element(by.text('SGD 100'))).toBeVisible()

    await element(by.id("back-button")).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen();
  });

  it('Navigate to Account Screen & Log Out', async () => { // Log back in
    await element(by.id('btm-nav-account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(60000);
    await element(by.id('log-out-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('email-input'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Home screen (Dev Authentication)', async () => { // Log back in
    await element(by.id('email-input')).replaceText('kingyx3@hotmail.com');
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen()
  });
});
