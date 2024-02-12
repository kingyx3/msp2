// AccountStackModal
import { testBookingDetail } from "./helpers";

describe('Check AccountStack & ensure navigation works across bookings & spaces', () => {
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
    await waitFor(element(by.id('search-bar'))).toBeVisible().withTimeout(20000);
    await expect(element(by.text("Continue with Email"))).not.toBeVisible()
  });

  it('Navigate to Account screen', async () => {
    await element(by.id('btm-nav-account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(10000);
  });

  it('Change user name, avatar', async () => {
    // await element(by.id('btm-nav-account')).tap();

    // // Wait for navigation to complete & perform the visibility checks
    // await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(10000);
  });

  it('Navigate to Activity screen (user)', async () => {
    await element(by.id('Your activity_account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(10000);
    await waitFor(element(by.text('Booking activity'))).toBeVisible().withTimeout(10000);
  });

  it('Attempt user log tap', async () => {
    await element(by.id('user-top-tab')).tap(); // Not always necessary
    const userLogLabel = (await element(by.id("0_user_log")).getAttributes()).label
    console.log(userLogLabel + "CONSOLE_LOG_OUTPUT")

    if (userLogLabel == 'Top up') {
      null
    } else {
      // navigate to BookingDetail screen
      await element(by.id('0_user_log')).tap();

      await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible() // Not visible for past bookings, visible up to booking start (user), visible up to 2 days after booking end (host)
      await waitFor(element(by.id("booking-title-price"))).toBeVisible() // Not visible for past bookings, visible up to booking start (user), visible up to 2 days after booking end (host)

      await testBookingDetail()

      // navigate back to Activity screen (user)
      await element(by.id("back-button")).tap();
    }

    await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(10000);
    await waitFor(element(by.text('Booking activity'))).toBeVisible().withTimeout(10000);
  });

  it('Attempt host log tap', async () => {
    await element(by.id('host-top-tab')).tap(); // Not always necessary
    const hostLogLabel = (await element(by.id("0_host_log")).getAttributes()).label
    console.log(hostLogLabel + "CONSOLE_LOG_OUTPUT")

    const spaceLogTypeArray = ['Create Space', 'Update Space', 'Delete Space']

    if (spaceLogTypeArray.includes(hostLogLabel)) {
      // Space (CUD)
      null
    } else {
      // Booking (CD)

      // navigate to BookingDetail screen
      await element(by.id('0_host_log')).tap();

      await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100) // Not visible for past bookings, visible up to booking start (host), visible up to 2 days after booking end (host)
      await waitFor(element(by.id("booking-title-price"))).toBeVisible(100) // Not visible for past bookings, visible up to booking start (host), visible up to 2 days after booking end (host)

      await testBookingDetail()

      // navigate back to Activity screen (host)
      await element(by.id("back-button")).tap();
    }

    await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(10000);
    await waitFor(element(by.text('Hosting activity'))).toBeVisible().withTimeout(10000);
  });

  it('Navigate back to Account screen', async () => {
    await element(by.id("back-button")).tap();

    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(10000);
  })
});

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
