// BookingStackModal
import { testBookingDetail } from "./helpers";

describe('Check a booking detail & send message to the host', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always', // inuse||never||unset
        photos: 'YES',
        medialibrary: 'YES',
      }
    });
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('email-input')).replaceText('kingyx3@hotmail.com');
    await element(by.id('email-input')).tapReturnKey()
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Bookings screen', async () => {

    await element(by.id('btm-nav-bookings')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('bookings-header-component'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.id('0_booking_detail'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to BookingDetail screen', async () => {
    // await element(by.id('bookings-scroll-view')).scroll(350, 'down');
    // await element(by.id('1_booking_detail')).tap();
    await element(by.id('0_booking_detail')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100) // Not visible for past bookings, visible up to booking start (user), visible up to 2 days after booking end (host)
    await waitFor(element(by.id("booking-title-price"))).toBeVisible(100) // Not visible for past bookings, visible up to booking start (user), visible up to 2 days after booking end (host)
  });

  it('Cancel the booking & check refund amount)', async () => {
    await testBookingDetail()
  })

  it('Navigate back to Bookings screen', async () => {
    await element(by.id("back-button-booking-detail")).tap()

    await waitFor(element(by.id("bookings-header-component"))).toBeVisible().withTimeout(60000);
  })

  it('Check Bookings toggle (needs work)', async () => {
    // await element(by.id('show-all-bookings-switch')).tap();

    // // Wait for navigation to complete & perform the visibility checks
    // await waitFor(element(by.id('open-date-picker'))).toBeVisible().withTimeout(60000);
    // await expect(element(by.id('open-time-picker'))).toBeVisible()
  });
});

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
