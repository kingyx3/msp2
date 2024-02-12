// BookingStackModal
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
    await element(by.id('dev-login-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.text('Quick Search'))).toBeVisible().withTimeout(10000);
  });

  it('Navigate to Bookings screen', async () => {

    await element(by.id('btm-nav-bookings')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('bookings-header-component'))).toBeVisible().withTimeout(10000);
  });

  it('Navigate to BookingDetail screen', async () => {
    // await element(by.id('bookings-scroll-view')).scroll(350, 'down');
    // await element(by.id('1_booking_detail')).tap();
    await element(by.id('0_booking_detail')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100) // Not visible for past bookings, visible up to booking start (user), visible up to 2 days after booking end (host)
  });

  it('Cancel the booking & check refund amount)', async () => {
    const extractDateTime = text => {
      const match = text.match(/(\d{2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4}),\s(\d{1,2})(am|pm)/i);
      if (!match) return null;

      let [, day, month, year, hour, ampm] = match;
      hour = (ampm.toLowerCase() === 'pm' && hour < 12) ? parseInt(hour) + 12 : (ampm.toLowerCase() === 'am' && hour === '12') ? 0 : hour;

      return new Date(`${day} ${month} ${year} ${hour}:00:00`);
    };
    const bookingTitleLabel = (await element(by.id("booking-title-price")).getAttributes()).label
    const cancellationPolicyLabel = (await element(by.id("cancellation-policy")).getAttributes()).label
    const hostOrUserLabel = (await element(by.id("host-or-user")).getAttributes()).label
    const bookingDateLabel = (await element(by.id("booking-date")).getAttributes()).label
    const bookingTimeLabel = (await element(by.id("booking-time")).getAttributes()).label

    const host = hostOrUserLabel.includes('Hosted by') ? false : true
    const bookingStartDateTime = extractDateTime(bookingDateLabel.slice(0, -1) + ", " + bookingTimeLabel.slice(0, 4))
    const bookingEndDateTime = extractDateTime(bookingDateLabel.slice(0, -1) + ", " + bookingTimeLabel.slice(8, 12))

    const bookingEndPlusTwo = new Date(bookingEndDateTime);
    bookingEndPlusTwo.setDate(bookingEndPlusTwo.getDate() + 2);
    const bookingEndPlusFive = new Date(bookingEndDateTime);
    bookingEndPlusFive.setDate(bookingEndPlusFive.getDate() + 5);

    const bookingPrice = parseFloat(bookingTitleLabel.match(/([0-9]+(\.[0-9]+)?)/));
    const currentDateTime = new Date()
    const cancelByDateTime = extractDateTime(cancellationPolicyLabel)

    await element(by.id('booking-title-price')).scroll(350, 'down');

    if (host) {
      // if (currentDateTime < bookingStartDateTime) {
      //   // Booking havent start

      //   // Can see contact host/user
      //   // Can see/tap cancel booking
      //   // Cannot see write review

      // } else if (currentDateTime < bookingEndDateTime) {
      //   // Booking started, but havent end

      //   // Can see contact host/user
      //   // Can see/tap cancel booking
      //   // Cannot see write review

      // } else if (currentDateTime > bookingEndDateTime && currentDateTime < bookingEndPlusTwo) {
      //   // Booking ended less than 2 days ago

      //   // Can see contact host/user
      //   // Can see/tap cancel booking
      //   // Cannot see write review

      // } else if (currentDateTime > bookingEndDateTime && currentDateTime < bookingEndPlusFive) {
      //   // Booking ended less than 5 days ago

      //   // Cannot see contact host/user
      //   // Can see/tap cancel booking
      //   // Cannot see write review

      // } else {
      //   // Booking ended more than or equal to 5 days ago

      //   // Cannot see contact host/user
      //   // Can see, cannot tap cancel booking
      //   // Cannot see write review

      // }
    } else {
      if (currentDateTime < bookingStartDateTime) {
        // Booking havent start

        // Can see contact host/user
        await expect(element(by.id("contact-host-or-user"))).toBeVisible()
        // Can see cancel booking
        await expect(element(by.id("cancel-booking"))).toBeVisible() // Comment out because of bugging testing issues not being able to see 100% despite scrolling
        // Cannot see write review
        await expect(element(by.id("write-review"))).not.toBeVisible()

        await testCancelBooking(currentDateTime, cancelByDateTime, bookingPrice)
        await testMessaging()
      } else if (currentDateTime < bookingEndDateTime) {
        // Booking started, but havent end

        // Can see contact host/user
        await expect(element(by.id("contact-host-or-user"))).toBeVisible()
        // Cannot see cancel booking
        await expect(element(by.id("cancel-booking"))).not.toBeVisible()
        // Cannot see write review
        await expect(element(by.id("write-review"))).not.toBeVisible()

        await testMessaging()
      } else if (currentDateTime > bookingEndDateTime && currentDateTime < bookingEndPlusTwo) {
        // Booking ended less than 2 days ago

        // Can see contact host/user
        await expect(element(by.id("contact-host-or-user"))).toBeVisible()
        // Cannot see cancel booking
        await expect(element(by.id("cancel-booking"))).not.toBeVisible()
        // Can see write review
        await expect(element(by.id("write-review"))).toBeVisible()

        await testReview()
        await testMessaging()
      } else {
        // Booking ended more than or equal to 2 days ago

        // Cannot see contact host/user
        await expect(element(by.id("contact-host-or-user"))).not.toBeVisible()
        // Cannot see cancel booking
        await expect(element(by.id("cancel-booking"))).not.toBeVisible()
        // Cannot see write review
        await expect(element(by.id("write-review"))).not.toBeVisible()
      }
    }
  })

  // it('Navigate back to Bookings screen', async () => {
  //   await element(by.id("back-button")).tap()

  //   await waitFor(element(by.id("bookings-header-component"))).toBeVisible().withTimeout(10000);
  // })

  // it('Check Cancelled Bookings', async () => {
  //   await element(by.id('show-all-bookings-switch')).tap();

  //   // // Wait for navigation to complete & perform the visibility checks
  //   // await waitFor(element(by.id('open-date-picker'))).toBeVisible().withTimeout(10000);
  //   // await expect(element(by.id('open-time-picker'))).toBeVisible()
  // });

  // write review for older bookings
});

const testMessaging = async () => {
  console.log('Navigate to MessageDetail screen & send a message to the host')
  await element(by.id("contact-host-or-user")).tap();

  // Wait for navigation to complete & perform the visibility checks
  await waitFor(element(by.id('messageInput'))).toBeVisible().withTimeout(10000);
  await element(by.id('messageInput')).tap();
  await element(by.id('messageInput')).typeText('Hey, sorry i need to cancel this booking');
  await element(by.id("send-button")).tap();

  const now = new Date()
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  await waitFor(element(by.text(timeString))).toBeVisible()

  console.log('Navigate back to BookingDetail screen')
  await element(by.id("back-button4")).tap();

  await waitFor(element(by.id("messageInput"))).not.toBeVisible(1) //.withTimeout(10000);
}

const testReview = async () => {
  console.log('Navigate to ReviewInput screen & submit a review about the space')
  await element(by.id("write-review")).tap();

  // Wait for navigation to complete & perform the visibility checks
  await waitFor(element(by.id('review-input-scroll-view'))).toBeVisible().withTimeout(10000);
  await element(by.id('review-input')).tap();
  await element(by.id('review-input')).typeText('Nice space, highly recommended!');
  await element(by.id("submit-button")).tap();

  // await waitFor(element(by.text(timeString))).toBeVisible()

  await waitFor(element(by.id("review-input"))).not.toBeVisible(1) //.withTimeout(10000);
  await waitFor(element(by.id("booking-detail-scroll-view"))).toBeVisible(100) //.withTimeout(10000);
}

const testCancelBooking = async (currentDateTime, cancelByDateTime, bookingPrice) => {
  console.log('Cancel a booking and confirm the refund amount is correct')
  let refundAmount
  if (currentDateTime > cancelByDateTime) {
    refundAmount = 0
  } else {
    refundAmount = bookingPrice
  }
  // WARNING: HOSTS & USERS SHOULD SEE DIFF AMTS/TEXTS
  await element(by.id("cancel-booking")).tap();

  await waitFor(element(by.text("Do you want to cancel this booking? $" + refundAmount + " will be refunded to your wallet if you cancel now."))).toBeVisible().withTimeout(10000);
  await element(by.text("Cancel")).tap();

  await waitFor(element(by.id("cancel-booking"))).toBeVisible().withTimeout(10000);
}

// // Dont need specific testing
// RootStack
// HomeTab
// AuthStack

// HostStackModal
// MessageStackModal
// AccountStackModal
