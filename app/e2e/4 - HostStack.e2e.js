// HostingStackModal
import { createSpaceTestSuite, navigateToHomeScreen } from "./helpers";

describe('Hosting - Setup payments & Create a new Space', () => {
  let create

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
    await element(by.id('email-input')).replaceText('kingyx3@hotmail.com');
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen();
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
      create = true
    } else {
      // "Setup Payments"
    }

  });

  // console.log('create: ', create)
  // if (create) {
  describe('Create Space', () => {
    createSpaceTestSuite()
  })
  // } else {
  //   console.log('Setup Payments (Stripe)')
  // }
});
