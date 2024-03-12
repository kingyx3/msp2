// MessageStackModal
describe('Check MessageStack & send a message', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        // location: 'always', // inuse||never||unset
        photos: 'YES',
        // medialibrary: 'YES',
      }
    });
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('email-input')).replaceText('kingyx3@hotmail.com');
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Messages screen', async () => {

    await element(by.id('btm-nav-messages')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('messages-header-component'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to MessageDetail screen', async () => {
    await element(by.id('message0')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('messageInput'))).toBeVisible().withTimeout(60000);
  });

  it('Send a message to the other party (or yourself)', async () => {
    await element(by.id('messageInput')).tap();
    await element(by.id('messageInput')).typeText('Hey, good day to you sir/mdm');
    await element(by.id("send-button")).tap();

    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    await waitFor(element(by.text(timeString))).toBeVisible()
  });

  it('Navigate back to Messages screen', async () => {
    await element(by.id("back-button4")).tap();

    await waitFor(element(by.id('messages-header-component'))).toBeVisible() //.withTimeout(60000);
  })
});

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
