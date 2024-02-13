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
    await waitFor(element(by.id('search-bar'))).toBeVisible().withTimeout(60000);
    await expect(element(by.text("Continue with Email"))).not.toBeVisible()
  });

  it('Navigate to Account screen', async () => {
    await element(by.id('btm-nav-account')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(60000);
  });

  it('Change user name', async () => {
    const randomText = (Math.floor(1000 + Math.random() * 9000)).toString();
    const newUserName = 'newUserName' + randomText
    const oldUserNameLabel = (await element(by.id('username-input')).getAttributes()).label

    await element(by.id('edit-input')).tap();
    await element(by.id('username-input')).clearText();
    await element(by.id('username-input')).typeText(newUserName);
    await element(by.id('save-input')).tap(); // Closes keyboard
    await element(by.id('save-input')).tap(); // Saves username
    // await element(by.id('cancel-input')).tap();
    await waitFor(element(by.id('save-input'))).not.toBeVisible().withTimeout(60000); // Saves username
    await waitFor(element(by.id('edit-input'))).toBeVisible().withTimeout(60000); // Saves username

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

  it('Attempt user log tap', async () => {
    await element(by.id('user-top-tab')).tap(); // Not always necessary
    await waitFor(element(by.id('0_user_log'))).toBeVisible().withTimeout(60000);
    const userLogLabel = (await element(by.id("0_user_log")).getAttributes()).label
    console.log(userLogLabel + "USER_CONSOLE_LOG_OUTPUT")

    if (userLogLabel == 'Top up') {
      // Top up
      null
    } else {
      // Booking (CD)
      await testBookingDetailFromActivity(false)
    }
  });

  it('Attempt host log tap (needs work)', async () => {
    await element(by.id('host-top-tab')).tap(); // Not always necessary
    await waitFor(element(by.id('0_host_log'))).toBeVisible().withTimeout(60000);
    const hostLogLabel = (await element(by.id("0_host_log")).getAttributes()).label
    console.log(hostLogLabel + "HOST_CONSOLE_LOG_OUTPUT")

    const spaceLogTypeArray = ['Create Space', 'Update Space', 'Delete Space']

    if (spaceLogTypeArray.includes(hostLogLabel)) {
      // Space (CUD)
      null
    } else {
      // Booking (CD)
      await testBookingDetailFromActivity(true)
    }
  });

  it('Navigate back to Account screen', async () => {
    await element(by.id("back-button-activity")).tap();

    await waitFor(element(by.id('account-header-component'))).toBeVisible().withTimeout(60000);
  })
});

const testBookingDetailFromActivity = async (host) => {
  // navigate to BookingDetail screen
  await element(by.id('0_' + (host ? "host" : "user") + '_log')).tap();

  await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100).withTimeout(60000)
  await waitFor(element(by.id("booking-title-price"))).toBeVisible(100).withTimeout(60000)

  await testBookingDetail()

  // navigate back to Activity screen
  await element(by.id("back-button-booking-detail")).tap();

  await waitFor(element(by.id('activity-header-component'))).toBeVisible().withTimeout(60000);
  await waitFor(element(by.text((host ? 'Hosting' : 'Booking') + ' activity'))).toBeVisible().withTimeout(60000);
}

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal