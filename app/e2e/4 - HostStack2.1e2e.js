// HostingStackModal
describe('Hosting - Manage Space', () => {
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
  });

  it('Navigate to Hosting screen', async () => {
    await element(by.id('btm-nav-hosting')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('hosting-header-component'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to SpaceDetail screen', async () => {
    await element(by.id('hosting-flatlist')).scroll(250, 'down', NaN, 0.95);
    await expect(element(by.id('0_space'))).toBeVisible();
    await element(by.id('0_space')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('space-detail-scroll-view'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Manage Space screen', async () => {
    await expect(element(by.id('manage-space-button'))).toBeVisible();
    await element(by.id('manage-space-button')).tap();

    // Wait for navigation to complete & perform the visibility checks
    await waitFor(element(by.id('manage-space-flatlist'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Manage Calender (SpaceAvailability) screen/feature', async () => {
    await expect(element(by.id('0_manage_space_item'))).toBeVisible();
    await element(by.id('0_manage_space_item')).tap();

    await waitFor(element(by.id('space-calendar-header'))).toBeVisible().withTimeout(60000);;
    await expect(element(by.id('space-calendar-confirm-button'))).toBeVisible();

    // Add more tests

    // await element(by.id('space-calendar-confirm-button')).tap();
    // await waitFor(element(by.text('Updated successfully!'))).toBeVisible().withTimeout(60000);
    // await element(by.text('OK')).tap();

    await element(by.id('manage-calendar-back-button')).tap();
    await waitFor(element(by.id('manage-space-flatlist'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to View Booking History (SpaceBookings) screen/feature', async () => {
    await expect(element(by.id('1_manage_space_item'))).toBeVisible();
    await element(by.id('1_manage_space_item')).tap();

    await waitFor(element(by.id('space-bookings-flatlist'))).toBeVisible().withTimeout(60000);;
    // await waitFor(element(by.id('space-calendar-header'))).toBeVisible().withTimeout(60000);;
    // await expect(element(by.id('space-calendar-confirm-button'))).toBeVisible();

    // Add more tests

    await element(by.id('view-bookings-back-button')).tap();
    await waitFor(element(by.id('manage-space-flatlist'))).toBeVisible().withTimeout(60000);
  });

  it('Navigate to Edit Space Details screen/feature', async () => {
    await expect(element(by.id('2_manage_space_item'))).toBeVisible();
    await element(by.id('2_manage_space_item')).tap();

    await waitFor(element(by.id('hosting-edit2-scroll-view'))).toBeVisible().withTimeout(60000);;
    // await expect(element(by.id('space-calendar-confirm-button'))).toBeVisible();
    // await element(by.id('space-calendar-confirm-button')).tap();

    // Add more tests

    await element(by.id('hosting-edit2-back-button')).tap();
    await waitFor(element(by.id('manage-space-flatlist'))).toBeVisible().withTimeout(60000);
  });

  it('Enable/Disable Space feature', async () => {
    await expect(element(by.id('3_manage_space_item'))).toBeVisible();
    await element(by.id('3_manage_space_item')).tap();

    // Add more tests
    let active
    try {
      // If space is active
      await waitFor(element(by.text('Are you sure you want to disable this space? No new bookings can be made until it is re-enabled. Existing bookings will remain active unless cancelled individually.'))).toBeVisible().withTimeout(30000);
      active = true
    } catch {
      // If space is inactive
      await expect(element(by.text('Are you sure you want to enable this space?'))).toBeVisible();
      active = false
    }

    console.log('Space is ' + (active ? 'active' : 'inactive') + '!')

    // await element(by.text('OK')).tap()
    // console.log('Changing it to ' + (active ? 'inactive' : 'active') + '!')

    await element(by.text('Cancel')).tap()
    console.log('Leaving it as ' + (active ? 'active' : 'inactive') + '!')
    await waitFor(element(by.id('manage-space-flatlist'))).toBeVisible().withTimeout(60000);
    await element(by.id('manage-space-back-button')).tap()

    await waitFor(element(by.id("space-detail-scroll-view"))).toBeVisible().withTimeout(60000);
  });
});
