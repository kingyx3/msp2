// AccountStackModal
import { testBookingDetail, navigateToHomeScreen } from "./helpers";

describe('Check AccountStack & ensure navigation works across bookings & spaces', () => {
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
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen();
  });

  it('Navigate to Account screen', async () => {
    await element(by.id('btm-nav-account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(60000);
  });

  it('Change user name', async () => {
    const randomText = (Math.floor(1000 + Math.random() * 9000)).toString();
    const newUserName = 'newUserName' + randomText + "   "
    const oldUserNameLabel = (await element(by.id('username-input')).getAttributes()).label

    await element(by.id('edit-input')).tap();
    await element(by.id('username-input')).tap();
    await element(by.id('username-input')).clearText();
    await element(by.id('username-input')).typeText(newUserName);
    if (device.getPlatform() === 'android') {
      // Tap to close keyboard on Android to save the username
      await element(by.id('save-input')).tap();
    }
    await element(by.id('save-input')).tap(); // Saves username
    // await element(by.id('cancel-input')).tap();
    await waitFor(element(by.id('save-input'))).not.toBeVisible().withTimeout(30000); // Saves username
    await waitFor(element(by.id('edit-input'))).toBeVisible().withTimeout(30000); // Saves username

    const newUserNameLabel = (await element(by.id('username-input')).getAttributes()).label

    console.log("oldUserNameLabel", "|" + oldUserNameLabel + "|")
    console.log("newUserNameLabel", "|" + newUserNameLabel + "|")
    console.log("newUserName", "|" + newUserName + "|")

    await expect(element(by.id('username-input'))).toHaveLabel(newUserName);
  });

  it('Change user avatar (needs work)', async () => {
    // const randomText = (Math.floor(1000 + Math.random() * 9000)).toString();
    // await element(by.id('edit-input')).tap();


    // // Wait for navigation to complete & perform the visibility checks
    // await waitFor(element(by.id('username-input'))).toHaveLabel('new_username' + randomText);
  });

  it('Navigate to Activity screen (user)', async () => {
    await element(by.id('Your activity_account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.text('Booking activity'))).toBeVisible().withTimeout(60000);
  });

  // it('Attempt user log tap', async () => {
  //   await element(by.id('user-top-tab')).tap(); // Not always necessary
  //   await waitFor(element(by.id('0_user_log'))).toBeVisible().withTimeout(60000);
  //   const userLogLabel = (await element(by.id("0_user_log")).getAttributes()).label
  //   console.log(userLogLabel + "USER_CONSOLE_LOG_OUTPUT")

  //   if (userLogLabel == 'Top up') {
  //     // Top up
  //     null
  //   } else {
  //     // Booking (CD)
  //     await testBookingDetailFromActivity(false)
  //   }
  // });

  it('Navigate to Activity screen (host)', async () => {
    await element(by.id('host-top-tab')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.text('Hosting activity'))).toBeVisible().withTimeout(60000);
  });

  // it('Attempt host log tap (needs work)', async () => {
  //   await element(by.id('host-top-tab')).tap(); // Not always necessary
  //   await waitFor(element(by.id('0_host_log'))).toBeVisible().withTimeout(60000);
  //   const hostLogLabel = (await element(by.id("0_host_log")).getAttributes()).label
  //   console.log(hostLogLabel + "HOST_CONSOLE_LOG_OUTPUT")

  //   const spaceLogTypeArray = ['Space Created', 'Space Updated', 'Space Disabled', 'Space Enabled', 'Price/Availability Updated']

  //   if (spaceLogTypeArray.includes(hostLogLabel)) {
  //     // Space (CUD)
  //     null
  //   } else {
  //     // Booking (CD)
  //     await testBookingDetailFromActivity(true)
  //   }
  // });

  it('Navigate back to Account screen', async () => {
    await element(by.id("back-button-activity")).tap();

    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(60000);
  })
});

// const testBookingDetailFromActivity = async (host) => {
//   // navigate to BookingDetail screen
//   await element(by.id('0_' + (host ? "host" : "user") + '_log')).tap();

//   await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100).withTimeout(60000)
//   await waitFor(element(by.id("booking-title"))).toBeVisible(100).withTimeout(10000)
//   await waitFor(element(by.id("booking-price"))).toBeVisible(100).withTimeout(10000)

//   await testBookingDetail()

//   // navigate back to Activity screen
//   await element(by.id("back-button-booking-detail")).tap();

//   await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(60000);
//   await expect(element(by.text((host ? 'Hosting' : 'Booking') + ' activity'))).toBeVisible();
// }

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
