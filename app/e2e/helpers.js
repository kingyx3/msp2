export const testBookingDetail = async () => {
    const bookingTitleLabel = (await element(by.id("booking-title-price")).getAttributes()).label
    const cancellationPolicyLabel = (await element(by.id("cancellation-policy")).getAttributes()).label
    const hostOrUserLabel = (await element(by.id("host-or-user")).getAttributes()).label
    const bookingDateLabel = (await element(by.id("booking-date")).getAttributes()).label
    const bookingTimeLabel = (await element(by.id("booking-time")).getAttributes()).label

    const host = hostOrUserLabel.includes('Hosted by') ? false : true
    const bookingStartDateTime = extractDateTime(bookingDateLabel.slice(0, -1) + ", " + bookingTimeLabel.split(" to ")[0])
    const bookingEndDateTime = extractDateTime(bookingDateLabel.slice(0, -1) + ", " + bookingTimeLabel.split(" to ")[1])

    const bookingEndPlusTwo = new Date(bookingEndDateTime);
    bookingEndPlusTwo.setDate(bookingEndPlusTwo.getDate() + 2);
    const bookingEndPlusFive = new Date(bookingEndDateTime);
    bookingEndPlusFive.setDate(bookingEndPlusFive.getDate() + 5);

    const bookingPrice = parseFloat(bookingTitleLabel.match(/([0-9]+(\.[0-9]+)?)/));
    const currentDateTime = new Date()
    const cancelByDateTime = extractDateTime(cancellationPolicyLabel)

    console.log('Current time: ', currentDateTime)
    console.log('Cancel by time: ', cancelByDateTime)
    console.log('Booking start: ', bookingStartDateTime)
    console.log('Booking end: ', bookingEndDateTime)
    console.log('Booking end + 2: ', bookingEndPlusTwo)
    console.log('Booking end + 5: ', bookingEndPlusFive)
    console.log('Host?: ', host)
    console.log('Booking Price: ', bookingPrice)

    await element(by.id('booking-detail-scroll-view')).scroll(350, 'down', NaN, 0.85);

    const cancelledLabel = (await element(by.id("cancel-booking")).getAttributes()).label

    if (cancelledLabel == 'Booking Cancelled') {
        // Cannot see contact host/user
        await expect(element(by.id("contact-host-or-user"))).not.toBeVisible()
        // Can see cancel booking (as booking cancelled)
        await expect(element(by.id("cancel-booking"))).toHaveLabel("Booking Cancelled") // Unable to test disabled status of buttons at the moment
        // Cannot see write review
        await expect(element(by.id("write-review"))).not.toBeVisible()
    } else {
        if (host) {
            if (currentDateTime < bookingEndPlusFive) {
                // Booking ended less than 5 days ago

                // Can see contact host/user
                await expect(element(by.id("contact-host-or-user"))).toBeVisible()
                // Can see cancel booking (as cancel booking)
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Cancel Booking")
                // Cannot see write review
                await expect(element(by.id("write-review"))).not.toBeVisible()

                await testCancelBooking(host, currentDateTime, cancelByDateTime, bookingPrice)

                await waitFor(element(by.id("contact-host-or-user"))).toBeVisible()
                await testMessaging()
            } else {
                // Booking ended more than or equal to 5 days ago

                // Cannot see contact host/user
                await expect(element(by.id("contact-host-or-user"))).not.toBeVisible()
                // Can see cancel booking (as booking completed)
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Booking Completed")
                // Cannot see write review
                await expect(element(by.id("write-review"))).not.toBeVisible()

                // expect booking cancellation to fail
            }
        } else {
            if (currentDateTime < bookingStartDateTime) {
                // Booking havent start

                // Can see contact host/user
                await expect(element(by.id("contact-host-or-user"))).toBeVisible()
                // Can see cancel booking (as cancel booking)
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Cancel Booking")
                // Cannot see write review
                await expect(element(by.id("write-review"))).not.toBeVisible()

                await testCancelBooking(host, currentDateTime, cancelByDateTime, bookingPrice)

                await waitFor(element(by.id("contact-host-or-user"))).toBeVisible()
                await testMessaging()
            } else if (currentDateTime < bookingEndDateTime) {
                // Booking started, but havent end

                // Can see contact host/user
                await expect(element(by.id("contact-host-or-user"))).toBeVisible()
                // Can see cancel booking (as cancel booking (disabled))
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Cancel Booking") // Unable to test disabled status of buttons at the moment
                // Cannot see write review
                await expect(element(by.id("write-review"))).not.toBeVisible()

                await testMessaging()
                // expect booking cancellation to fail
            } else if (currentDateTime > bookingEndDateTime && currentDateTime < bookingEndPlusTwo) {
                // Booking ended less than 2 days ago

                // Can see contact host/user
                await expect(element(by.id("contact-host-or-user"))).toBeVisible()
                // Can see cancel booking (as booking completed)
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Booking Completed") // Unable to test disabled status of buttons at the moment
                // Can see write review
                await expect(element(by.id("write-review"))).toBeVisible()

                await testReview()

                await waitFor(element(by.id("contact-host-or-user"))).toBeVisible()
                await testMessaging()
                // expect booking cancellation to fail
            } else if (currentDateTime > bookingEndDateTime && currentDateTime < bookingEndPlusFive) {
                // Booking ended less than 5 days ago

                // Can see contact host/user
                await expect(element(by.id("contact-host-or-user"))).toBeVisible()
                // Can see cancel booking (as booking completed)
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Booking Completed") // Unable to test disabled status of buttons at the moment
                // Can see write review
                await expect(element(by.id("write-review"))).not.toBeVisible()

                await testMessaging()
                // expect booking cancellation to fail
            } else {
                // Booking ended more than or equal to 5 days ago

                // Cannot see contact host/user
                await expect(element(by.id("contact-host-or-user"))).not.toBeVisible()
                // Can see cancel booking (as booking completed)
                await expect(element(by.id("cancel-booking"))).toHaveLabel("Booking Completed") // Unable to test disabled status of buttons at the moment
                // Cannot see write review
                await expect(element(by.id("write-review"))).not.toBeVisible()

                // expect booking cancellation to fail
            }
        }
    }
    await expect(element(by.id("back-button-booking-detail"))).toBeVisible()
    await expect(element(by.id("cancel-booking"))).toBeVisible()
}

const extractDateTime = text => {
    const match = text.match(/(\d{2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4}),\s(\d{1,2})(am|pm)/i);
    if (!match) return null;

    let [, day, month, year, hour, ampm] = match;
    hour = (ampm.toLowerCase() === 'pm' && hour < 12) ? parseInt(hour) + 12 : (ampm.toLowerCase() === 'am' && hour === '12') ? 0 : hour;

    return new Date(`${day} ${month} ${year} ${hour}:00:00`);
};

const testMessaging = async () => {
    console.log('Navigate to MessageDetail screen & send a message to the host')
    await element(by.id("contact-host-or-user")).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('messageInput'))).toBeVisible().withTimeout(60000);
    await element(by.id('messageInput')).tap();
    await element(by.id('messageInput')).typeText('Hey, sorry i need to cancel this booking');
    await element(by.id("send-button")).tap();

    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    await waitFor(element(by.text(timeString))).toBeVisible()

    console.log('Navigate back to BookingDetail screen')
    await element(by.id("back-button4")).tap();

    await waitFor(element(by.id("messageInput"))).not.toBeVisible(1).withTimeout(60000);
    await waitFor(element(by.id("contact-host-or-user"))).toBeVisible(100) //.withTimeout(60000);
    await waitFor(element(by.id("cancel-booking"))).toBeVisible(100) //.withTimeout(60000);
}

const testReview = async () => {
    console.log('Navigate to ReviewInput screen & submit a review about the space')
    await element(by.id("write-review")).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('review-input-scroll-view'))).toBeVisible().withTimeout(60000);
    await element(by.id('review-input')).tap();
    await element(by.id('review-input')).typeText('Nice space, highly recommended!');
    await element(by.id("submit-button")).tap();

    // await waitFor(element(by.text(timeString))).toBeVisible()

    await waitFor(element(by.id("review-input"))).not.toBeVisible(1).withTimeout(60000);
    await waitFor(element(by.id("write-review"))).toBeVisible(100) //.withTimeout(60000);}
    await waitFor(element(by.id("cancel-booking"))).toBeVisible(100) //.withTimeout(60000);
}

const testCancelBooking = async (host, currentDateTime, cancelByDateTime, bookingPrice) => {
    console.log('Cancel a booking and confirm the refund amount is correct')
    let refundAmount
    if (currentDateTime > cancelByDateTime) {
        refundAmount = 0
    } else {
        refundAmount = bookingPrice
    }
    // WARNING: HOSTS & USERS SHOULD SEE DIFF AMTS/TEXTS
    await element(by.id("cancel-booking")).tap();

    const bookingCancellationText = host
        ? ("Do you want to cancel this booking? Your potential earnings will be reduced by $" + refundAmount + " if you cancel now.")
        : ("Do you want to cancel this booking? $" + refundAmount + " will be refunded to your wallet if you cancel now.")

    console.log('bookingCancellationText', "|" + bookingCancellationText + "|")
    await waitFor(element(by.text(bookingCancellationText))).toBeVisible().withTimeout(60000);

    await element(by.text("Cancel")).tap();

    await waitFor(element(by.id("cancel-booking"))).toBeVisible().withTimeout(60000);
}