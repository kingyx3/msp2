// BookingStackModal
import { testBookingDetail, navigateToHomeScreen  } from "./helpers";

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
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen()
  });

  it('Navigate to Bookings screen', async () => {

    await element(by.id('btm-nav-bookings')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('bookings-header-component'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.id('bookings-scroll-view'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to BookingDetail screen', async () => {
    // await element(by.id('bookings-scroll-view')).scroll(150, 'down');
    await waitFor(element(by.id('0_booking_detail'))).toBeVisible(100).withTimeout(60000);
    // await element(by.id('1_booking_detail')).tap();
    let x = true
    while (x) {
      try {
        await element(by.id('0_booking_detail')).tap();
        // Wait for navigation to complete & perform the visibility checks
        // await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible().withTimeout(10000);
        await waitFor(element(by.id("booking-title"))).toBeVisible().withTimeout(10000);
        await waitFor(element(by.id("booking-price"))).toBeVisible().withTimeout(10000);
        x = false
      } catch (e) {
        console.log('Looping in while loop4. ' + e)
      }
    }
    console.log('BookingDetail - Exited while loop4')
  });

  it('Cancel the booking & check refund amount', async () => {
    await testBookingDetail()
  })

  it('Navigate back to Bookings screen', async () => {
    await element(by.id("back-button-booking-detail")).tap()

    await waitFor(element(by.id("bookings-header-component"))).toBeVisible().withTimeout(60000);
  })

  // it('Check Bookings toggle', async () => {
  //   await element(by.id('show-all-bookings-switch')).tap();

  //   // Wait for toggle action to complete & perform the visibility checks
  //   await waitFor(element(by.id('bookings-header-component'))).toBeVisible().withTimeout(60000);
  //   await waitFor(element(by.id('bookings-scroll-view'))).toBeVisible().withTimeout(60000);
  // });

  // it('Navigate to BookingDetail screen (toggled)', async () => {
  //   await element(by.id('bookings-scroll-view')).scroll(150, 'down');
  //   await waitFor(element(by.id('0_booking_detail'))).toBeVisible(100).withTimeout(60000);
  //   // await element(by.id('1_booking_detail')).tap();
  //   let x = true
  //   while (x) {
  //     try {
  //       await element(by.id('0_booking_detail')).tap();
  //       // Wait for navigation to complete & perform the visibility checks
  //       await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100).withTimeout(60000);
  //       await waitFor(element(by.id("booking-title"))).toBeVisible(100).withTimeout(60000);
  //       await waitFor(element(by.id("booking-price"))).toBeVisible(100).withTimeout(60000);
  //       x = false
  //     } catch (e) {
  //       console.log('Looping in while loop5. ' + e)
  //     }
  //   }
  //   console.log('BookingDetail - Exited while loop5')
  // });

  // it('Cancel the booking & check refund amount (toggled)', async () => {
  //   await testBookingDetail()
  // })

  // it('Navigate back to Bookings screen (toggled)', async () => {
  //   await element(by.id("back-button-booking-detail")).tap()

  //   await waitFor(element(by.id("bookings-header-component"))).toBeVisible().withTimeout(60000);
  // })
});

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
