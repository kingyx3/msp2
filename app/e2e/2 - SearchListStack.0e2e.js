// SearchStackModal & ListStackModal
describe('Make a booking via picking datetime & ListMap', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    await element(by.id('dev-login-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(20000);
    await expect(element(by.text("Continue with Email"))).not.toBeVisible()
    const walletBalanceLabel = (await element(by.id("wallet-balance")).getAttributes()).label
    // Regular expression to match the numeric value
    const match = walletBalanceLabel.match(/(\d+\.\d+)/);
    // Parsing the string to a float
    global.beginWalletBalance = match ? parseFloat(match[0]) : 0;
  });

  it('Navigate to SpaceTypePicker screen', async () => {
    await element(by.id('search-bar')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Badminton Court'))).toBeVisible().withTimeout(20000);
  });

  it('Navigate to RangePicker screen', async () => {
    await element(by.text('Badminton Court')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('open-date-picker'))).toBeVisible().withTimeout(20000);
    await expect(element(by.id('open-time-picker'))).toBeVisible()
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
      await waitFor(datePicker).toBeVisible().withTimeout(20000);
      await datePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T00:00:00+08:00`, 'ISO8601');
      await element(by.text('OK')).tap();
      await waitFor(datePicker).not.toBeVisible().withTimeout(20000);

      // Set Time to 10 AM
      await element(by.id('open-time-picker')).tap();
      await waitFor(timePicker).toBeVisible().withTimeout(20000);
      try {
        console.log('Trying set column to value for android timepicker')
        // await timePicker.setColumnToValue(0, '10');
        // await timePicker.setColumnToValue(1, '30');
      } catch (e) {
        console.log(`An error occurred: ${e.message}`);
        console.log('Trying tap text to change time for android timepicker')
        // await element(by.text('11')).tap();
      }
      // await timePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T11:00:00+08:00`, 'ISO8601');
      await element(by.text('OK')).tap();
      await waitFor(timePicker).not.toBeVisible().withTimeout(20000);

    } else {
      const datePicker = element(by.type('UIDatePicker'));

      // Set Date to January 1, 2030
      await element(by.id('open-date-picker')).tap()
      await waitFor(datePicker).toBeVisible().withTimeout(20000);
      await datePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T00:00:00+08:00`, 'ISO8601');
      await element(by.text('Confirm')).tap();
      await waitFor(datePicker).not.toBeVisible().withTimeout(20000);

      // Set Time to 10 AM
      await element(by.id('open-time-picker')).tap();
      await waitFor(datePicker).toBeVisible().withTimeout(20000);
      await datePicker.setDatePickerDate(`${+year}-${+month}-${+day + 2}T11:00:00+08:00`, 'ISO8601');
      await element(by.text('Confirm')).tap();
      await waitFor(datePicker).not.toBeVisible().withTimeout(20000);
    }

    // Set Duration to 2 hours
    await element(by.id('duration-picker')).tap();
    await waitFor(element(by.text('2 hr'))).toBeVisible().withTimeout(20000);
    await element(by.label('2 hr')).tap();
    await waitFor(element(by.text('1 hr'))).not.toBeVisible(1).withTimeout(20000);

    // Submit to search for listings
    await waitFor(element(by.id('search-listings-button'))).toBeVisible().withTimeout(30000);
    await element(by.id('search-listings-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listings-flatlist'))).toBeVisible();
  });

  it('Navigate to ListMap screen', async () => {
    await element(by.id('listmap-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listing-card-flatlist'))).toBeVisible();
    await waitFor(element(by.id('0_listmap'))).toBeVisible();
  });

  it('Navigate to Listing Details screen', async () => {
    await element(by.id('0_listmap')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('image-carousel'))).toBeVisible().withTimeout(20000);
  });

  it('Navigate to Reservation screen', async () => {
    await element(by.id('submit-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('fee-information'))).toBeVisible().withTimeout(20000);
  });

  it('Attempt Booking (Navigate back to Home screen / Insufficient balance)', async () => {
    // Test changing of court number before booking
    const reservationCostLabel = (await element(by.id("reservation-cost")).getAttributes()).label
    const reservationCost = parseFloat(reservationCostLabel.replace(/[^0-9.]/g, ''));
    global.excessBalance = global.beginWalletBalance - reservationCost

    await element(by.id('book-now-button')).tap();

    if (global.excessBalance > 0) {
      console.log('Sufficient Balance')
      // Wait for modal to load, perform the visibility checks and navigate to Home
      await waitFor(element(by.text('Success'))).toBeVisible().withTimeout(20000);
      await element(by.text('Ok')).tap();

      // Wait for navigation to complete & perform the visibility checks
      await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(30000);
    } else {
      console.log('Insufficient Balance')
      // Wait for modal to load, perform the visibility checks and navigate to Home
      await waitFor(element(by.text('Insufficient Balance'))).toBeVisible().withTimeout(20000);
      await expect(element(by.text('Sorry, you do not have sufficient funds in your wallet, please top up at least SGD ' + (-excessBalance).toString() + '.'))).toBeVisible();
      await element(by.text('Ok')).tap();

      // Wait for navigation to complete & perform the visibility checks
      await waitFor(element(by.id('balance-container'))).toBeVisible().withTimeout(20000);

      await element(by.id("back-button")).atIndex(1).tap();

      // Wait for navigation to complete & perform the visibility checks
      await waitFor(element(by.id('fee-information'))).toBeVisible().withTimeout(20000);
    }
  })
});


describe('Make a booking via quick search & Listings', () => {
  beforeAll(async () => {
    await device.reloadReactNative()
    // await device.launchApp();
    await device.disableSynchronization(); // Disable synchronization
  });

  it('Navigate to Home screen (Dev Authentication)', async () => {
    // await element(by.id('dev-login-button')).tap(); // Already authenticated

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(20000);
    await expect(element(by.text("Continue with Email"))).not.toBeVisible()
    const walletBalanceLabel = (await element(by.id("wallet-balance")).getAttributes()).label
    // Regular expression to match the numeric value
    const match = walletBalanceLabel.match(/(\d+\.\d+)/);
    // Parsing the string to a float
    global.beginWalletBalance = match ? parseFloat(match[0]) : 0;
  });

  it('Navigate to Listings screen (Shortcut)', async () => {
    await element(by.id('1')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listings-flatlist'))).toBeVisible();
  });

  it('Navigate to ListMap screen', async () => {
    await element(by.id('listmap-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listing-card-flatlist'))).toBeVisible();
    await waitFor(element(by.id('0_listmap'))).toBeVisible();
  });

  it('Navigate back to Listings screen', async () => {
    await element(by.id('back-button-x')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('listings-flatlist'))).toBeVisible();
  });

  it('Navigate to Listing Details screen', async () => {
    await element(by.id('0_listing')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('image-carousel'))).toBeVisible().withTimeout(20000);
  });

  it('Navigate to Reservation screen', async () => {
    await element(by.id('submit-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('fee-information'))).toBeVisible().withTimeout(20000);
  });

  it('Attempt Booking (Navigate back to Home screen / Insufficient balance)', async () => {
    // Test changing of court number before booking
    const reservationCostLabel = (await element(by.id("reservation-cost")).getAttributes()).label
    const reservationCost = parseFloat(reservationCostLabel.replace(/[^0-9.]/g, ''));
    global.excessBalance = global.beginWalletBalance - reservationCost

    await element(by.id('book-now-button')).tap();

    if (global.excessBalance > 0) {
      console.log('Sufficient Balance')
      // Wait for modal to load, perform the visibility checks and navigate to Home
      await waitFor(element(by.text('Success'))).toBeVisible().withTimeout(20000);
      await element(by.text('Ok')).tap();

      // Wait for navigation to complete & perform the visibility checks
      await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(30000);
    } else {
      console.log('Insufficient Balance')
      // Wait for modal to load, perform the visibility checks and navigate to Home
      await waitFor(element(by.text('Insufficient Balance'))).toBeVisible().withTimeout(20000);
      await expect(element(by.text('Sorry, you do not have sufficient funds in your wallet, please top up at least SGD ' + (-excessBalance).toString() + '.'))).toBeVisible();
      await element(by.text('Ok')).tap();

      // Wait for navigation to complete & perform the visibility checks
      await waitFor(element(by.id('balance-container'))).toBeVisible().withTimeout(20000);

      await element(by.id("back-button")).atIndex(1).tap();

      // Wait for navigation to complete & perform the visibility checks
      await waitFor(element(by.id('fee-information'))).toBeVisible().withTimeout(20000);
    }
  })
});