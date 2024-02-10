// BookingStackModal
describe('Check AccountStack & ', () => {
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
  });
 
  it('Navigate to Account screen', async () => {

    await element(by.id('btm-nav-account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(10000);
  });

  it('Navigate to Activity screen', async () => {
    await element(by.id('account0')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(10000);
  });

  it('Navigate to BookingDetail screen', async () => {
    // const now = new Date()
    // const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    // await waitFor(element(by.text(timeString))).toBeVisible() 
  });

  it('Navigate back to Activity screen & to hosting (instead of default booking)', async () => {
    // await element(by.id("back-button4")).tap();
    
    // await waitFor(element(by.id('messages-header-component'))).toBeVisible() //.withTimeout(10000);
  })

  it('Navigate to BookingDetail screen', async () => {
    // const now = new Date()
    // const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    // await waitFor(element(by.text(timeString))).toBeVisible() 
  });

  it('Navigate back to Activity screen', async () => {
    // await element(by.id("back-button4")).tap();
    
    // await waitFor(element(by.id('messages-header-component'))).toBeVisible() //.withTimeout(10000);
  })

  it('Navigate back to Account screen', async () => {
    // await element(by.id("back-button4")).tap();
    
    // await waitFor(element(by.id('messages-header-component'))).toBeVisible() //.withTimeout(10000);
  })
});

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
