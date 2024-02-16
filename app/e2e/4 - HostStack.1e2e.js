// HostingStackModal
describe('Hosting - Setup payments & Create a new Space', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        // location: 'always', // inuse||never||unset
        photos: 'YES',
        medialibrary: 'YES',
      }
    });
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('dev-login-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Hosting screen', async () => {
    await element(by.id('btm-nav-hosting')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('hosting-header-component'))).toBeVisible().withTimeout(60000);
  });

  // set up stripe (if not setup yet)
  it('Setup Payments / List Now', async () => {
    const listNowLabel = (await element(by.id('list-now')).getAttributes()).label

    console.log('listNowLabel: ', listNowLabel)

    if (listNowLabel == "List Now") {
      await element(by.id('list-now')).tap()

      await waitFor(element(by.id('hosting-step1-scroll-view'))).toBeVisible().withTimeout(60000);
      await waitFor(element(by.id('hosting-step1-back-button'))).toBeVisible().withTimeout(60000);
      await element(by.id('hosting-step1-back-button')).tap();
    } else {
      // "Setup Payments"
      null
    }

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('hosting-header-component'))).toBeVisible().withTimeout(60000);
  });
});