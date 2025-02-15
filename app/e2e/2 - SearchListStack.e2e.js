// SearchStackModal & ListStackModal
import { navigateToHomeScreen } from "./helpers";

const navigateToListingDetailsScreen = async (type) => {
  await element(by.id('0_' + type)).tap();
  await waitFor(element(by.id('image-carousel'))).toBeVisible().withTimeout(60000);
  await waitFor(element(by.id('confirm-details-button'))).toBeVisible().withTimeout(60000);
};

const navigateToReservationScreen = async () => {
  await element(by.id('confirm-details-button')).tap();
  await waitFor(element(by.id('fee-information'))).toBeVisible().withTimeout(60000);
  await waitFor(element(by.id('book-now-button'))).toBeVisible().withTimeout(60000);
};

const attemptBooking = async () => {
  const reservationCostLabel = (await element(by.id("reservation-cost")).getAttributes()).label;
  const reservationCost = parseFloat(reservationCostLabel.replace(/[^0-9.]/g, ''));
  console.log('reservationCost: ', reservationCost);
  global.excessBalance = global.beginWalletBalance - reservationCost;
  console.log('Ending Balance: ', global.excessBalance);

  await element(by.id('book-now-button')).tap();

  try {
    await waitFor(element(by.text('Requires host confirmation'))).toBeVisible().withTimeout(20000);
    await element(by.text('Proceed')).tap();
  } catch (e) {
    console.log('This space does not require host confirmation. i.e. Immediate approval');
    console.log(e);
  }

  if (global.excessBalance >= 0) {
    console.log('Sufficient Balance');
    await waitFor(element(by.text('Success'))).toBeVisible().withTimeout(60000);
    await element(by.text('Ok')).tap();
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(60000);
  } else {
    console.log('Insufficient Balance');
    await waitFor(element(by.text('Error'))).toBeVisible().withTimeout(60000);
    const errorText = 'Sorry, you do not have sufficient funds in your wallet, please top up at least SGD ' + (Math.round((-1 * global.excessBalance) * 100) / 100).toString() + '.'
    console.log('errorText', errorText)
    await expect(element(by.text(errorText))).toBeVisible();
    await element(by.text('Ok')).tap();
    await waitFor(element(by.id('balance-container'))).toBeVisible().withTimeout(60000);
    await element(by.id("back-button")).atIndex(1).tap();
    await waitFor(element(by.id('fee-information'))).toBeVisible().withTimeout(60000);
  }
};

describe('Make a booking via picking datetime & ListMap', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('email-input')).replaceText('kingyx3@hotmail.com');
    await element(by.id('welcome-text')).multiTap(3);
    await element(by.id('submit-email-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await navigateToHomeScreen()
  });

  it('Navigate to SpaceTypePicker screen', async () => {
    await element(by.id('search-bar')).tap();
    await waitFor(element(by.text('Badminton Court'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to RangePicker screen', async () => {
    await element(by.text('Badminton Court')).tap();
    await waitFor(element(by.id('open-date-picker'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.id('open-time-picker'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('open-time-picker'))).toBeVisible();
  });

  it('Navigate to Listings screen', async () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = today.getFullYear();

    if (device.getPlatform() === 'android') {
      const datePicker = element(by.type('android.widget.DatePicker'))
      const timePicker = element(by.type('android.widget.TimePicker'))

      // Set Date to January 1, 2030
      await element(by.id('open-date-picker')).tap()
      await waitFor(datePicker).toBeVisible().withTimeout(60000);
      await datePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T12:00:00+08:00`, 'ISO8601');
      await element(by.text('OK')).tap();
      await waitFor(datePicker).not.toBeVisible().withTimeout(60000);
      await waitFor(element(by.id('open-time-picker'))).toBeVisible().withTimeout(60000);

      // Set Time to 10 AM
      await element(by.id('open-time-picker')).tap();
      await waitFor(timePicker).toBeVisible().withTimeout(60000);
      // await element(by.text('11')).tap(); // no valid way to set time in Android yet
      await element(by.text('OK')).tap();
      await waitFor(timePicker).not.toBeVisible().withTimeout(60000);
      await waitFor(element(by.id('duration-picker'))).toBeVisible().withTimeout(60000);

    } else {
      const datePicker = element(by.type('UIDatePicker'));

      // Set Date to January 1, 2030
      await element(by.id('open-date-picker')).tap()
      await waitFor(datePicker).toBeVisible().withTimeout(60000);
      await datePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T00:00:00+08:00`, 'ISO8601');
      await element(by.text('Confirm')).tap();
      await waitFor(datePicker).not.toBeVisible().withTimeout(60000);
      await waitFor(element(by.id('open-time-picker'))).toBeVisible().withTimeout(60000);

      // Set Time to 10 AM
      await element(by.id('open-time-picker')).tap();
      await waitFor(datePicker).toBeVisible().withTimeout(60000);
      await datePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T11:00:00+08:00`, 'ISO8601');
      await element(by.text('Confirm')).tap();
      await waitFor(datePicker).not.toBeVisible().withTimeout(60000);
      await waitFor(element(by.id('duration-picker'))).toBeVisible().withTimeout(60000);
    }

    // Set Duration to 2 hours
    await element(by.id('duration-picker')).tap();
    await waitFor(element(by.id('duration-picker'))).not.toBeVisible().withTimeout(60000);
    await waitFor(element(by.text('2 hr'))).toBeVisible().withTimeout(60000);
    await element(by.text('2 hr')).tap();
    await waitFor(element(by.text('1 hr'))).not.toBeVisible().withTimeout(60000);

    // Submit to search for listings
    await waitFor(element(by.id('search-listings-button'))).toBeVisible().withTimeout(60000);
    await element(by.id('search-listings-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listings-flatlist'))).toBeVisible().withTimeout(60000);
    await waitFor(element(by.id('0_listing'))).toBeVisible(100).withTimeout(60000);
    await expect(element(by.id('0_listing'))).toBeVisible();
  });

  it('Navigate to Listing Details screen', async () => navigateToListingDetailsScreen('listing'));

  it('Navigate to Reservation screen', navigateToReservationScreen);

  it('Attempt Booking (Navigate back to Home screen / Insufficient balance)', attemptBooking)
});


describe('Make a booking via quick search & Listings', () => {
  beforeAll(async () => {
    await device.reloadReactNative()
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', navigateToHomeScreen); // Already authenticated

  it('Navigate to Listings screen (Shortcut)', async () => {
    await element(by.id('0_quick_search')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listings-flatlist'))).toBeVisible();
    await waitFor(element(by.id('listmap-button'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to ListMap screen', async () => {
    await element(by.id('listmap-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listing-card-flatlist'))).toBeVisible();
    await waitFor(element(by.id('0_listmap'))).toBeVisible();
    await waitFor(element(by.id('back-button-x'))).toBeVisible();
  });

  it('Navigate back to Listings screen', async () => {
    await element(by.id('back-button-x')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listings-flatlist'))).toBeVisible();
    await waitFor(element(by.id('listmap-button'))).toBeVisible();
    await waitFor(element(by.id('listing-card-flatlist'))).not.toBeVisible().withTimeout(60000);
  });

  it('Navigate to ListMap screen again', async () => {
    await element(by.id('listmap-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listing-card-flatlist'))).toBeVisible();
    await waitFor(element(by.id('0_listmap'))).toBeVisible(100);
    await waitFor(element(by.id('back-button-x'))).toBeVisible();
  });

  it('Navigate to Listing Details screen', async () => navigateToListingDetailsScreen('listmap'));

  it('Navigate to Reservation screen', navigateToReservationScreen);

  it('Attempt Booking (Navigate back to Home screen / Insufficient balance)', attemptBooking)
});
