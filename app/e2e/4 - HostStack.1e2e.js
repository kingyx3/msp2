// BookingStackModal
describe('Check a booking detail & send message to the host', () => {
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

    if (listNowLabel == "List Now") {
      null
    } else {
      // "Setup Payments"
      null
    }

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('hosting-header-component'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to SpaceDetail screen', async () => {

  });

  it('Navigate to Manage Space screen', async () => {

  });

  it('Test Manage Calender feature', async () => {

  });

  it('Test View Booking History feature', async () => {

  });

  it('Test Edit Space Details feature', async () => {

  });

  it('Test Disable Space feature', async () => {

  });
});
