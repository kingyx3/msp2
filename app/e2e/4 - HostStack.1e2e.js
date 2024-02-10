// BookingStackModal
describe('Check a booking detail & send message to the host', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions : {
        location: 'always', // inuse||never||unset
        photos: 'YES',
        medialibrary: 'YES',
      }
    });
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('dev-login-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(10000);
    const attributes = await element(by.text('Quick Search')).getAttributes()
    console.log(attributes)
    console.log(attributes.text)
  });
   // set up stripe (if not setup yet)
   // list now
   // manage my spaces (calendar, booking history, edit space, disable/enable space)
});
