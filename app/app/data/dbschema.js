export const bookings = [
  {
    booking_id: 1,
    user_id: 122,
    venue_id: 3, //for the location
    venue_type_id: 4, //for diff types of spaces in the same location
    venue_type_max: 5, //total number of similar spaces in the same location
    booking_number: 'IUSHDJBASKJD',
    start_dt: "20210828080000000",
    end_dt: "20211028050000000",
    created_dt: "20210628030000000",
    is_rule: true,
  },]

export const timeslots = [
  {
    timeslot_id: 1,
    timeslot_value: 20210630170000, // 30 Jun 2021 5PM
    booked_space: [{
      space_id: 1,
      space_type: 'futsal_field'
    }, {
      space_id: 2,
      space_type: 'futsal_field'
    }, {
      space_id: 6,
      space_type: 'badminton_court'
    }],
  },
  {
    timeslot_id: 2,
    timeslot_value: 20210630180000, // 30 Jun 2021 5PM
    space_ids: [1, 3, 6, 8, 10,]
  }
]

export const locations = [
  {
    location_id: 1,
    title: "Tampines SAFRA",
    owner_name: 'Tampines SAFRA',
    rating: 4.8,
    reviews: 95,
    coordinate: { latitude: 1.352632, longitude: 103.707391 },
    space_type: {
      futsal_field: {
        name: 'Futsal Field',
        price: 120,
        peak_rate: 0.3,
        peakDateTime: ['24/8/2021 6PM',], //can change to start/end-1hr datetime tuples to save space
        discount_rate: -0.3,
        discountDateTime: ['24/8/2021 7PM',],
        images: [
          "https://a0.muscache.com/im/pictures/6a4518bf-30b5-423a-bce9-ca37ef8684f2.jpg",
          "https://a0.muscache.com/im/pictures/4c01023f-0bf0-4be9-9b9a-7fca7f2e0f39.jpg",],
        total_spaces: 4,
        spaces: [{ space_id: 1, },
        { space_id: 2, },
        { space_id: 3, },
        { space_id: 4, },],
      },
      badminton_court: {
        name: 'Badminton Court',
        price: 10,
        peak_rate: 0.3,
        peakDateTime: ['24/8/2021 6PM',], //can change to start/end-1hr datetime tuples to save space
        discount_rate: -0.3,
        discountDateTime: ['24/8/2021 7PM',],
        images: [
          "https://a0.muscache.com/im/pictures/6a4518bf-30b5-423a-bce9-ca37ef8684f2.jpg",
          "https://a0.muscache.com/im/pictures/4c01023f-0bf0-4be9-9b9a-7fca7f2e0f39.jpg",],
        total_spaces: 6,
        spaces: [{ space_id: 5, },
        { space_id: 6, },
        { space_id: 7, },
        { space_id: 8, },
        { space_id: 9, },
        { space_id: 10, },],
      },
    },
  },]