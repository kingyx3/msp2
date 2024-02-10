const image = [
  {
    image:
      "https://a0.muscache.com/im/pictures/ee9ca48b-c862-4c3a-8413-68d76be8319f.jpg",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/0bfc60ea-7ac7-469a-936e-d5f1218371cd.jpg",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/3b8148b2-791d-44e7-92cc-11e4b2ee53f2.jpg",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/6d33901b-97cd-4fa9-94ee-5360d13cdfa6.jpg",
  },
  {
    image:
      "https://a0.muscache.com/im/pictures/3cd9232d-09e1-4768-b6a6-366c4241e187.jpg",
  },
];

export const activities = [
  { label: 'Badminton Court', },
  { label: 'Futsal Court', },
  { label: 'Dance Studio', },
  { label: 'Tennis Court', },
  { label: 'Bowling Lane', },
];

export const duration = [
  { label: '1 hr', },
  { label: '2 hr', },
  { label: '3 hr', },
  { label: '4 hr', },
  { label: '6 hr', },
  { label: '8 hr', },
  { label: '10 hr', },
  { label: '12 hr', },
  { label: '16 hr', },
  { label: '20 hr', },
  { label: '24 hr', },];

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
  },
  {
    booking_id: 2,
    user_id: 12,
    venue_id: 3,
    booking_number: 'IUSHDJBASKJD',
    start_dt: "2021-06-28T03:00:00.000Z",
    end_dt: "2021-08-28T05:00:00.000Z",
    created_dt: "2021-06-28T03:00:00.000Z",
  },
  {
    booking_id: 3,
    user_id: 122,
    venue_id: 2,
    booking_number: 'IUSHDJBASKJD',
    start_dt: "20210828030000000",
    end_dt: "20211028050000000",
    created_dt: "2021-06-28T03:00:00.000Z",
  },
]

export const rooms = [
  {
    id: 1,
    title:
      "Tampines Stadium",
    property_type: "Whole house",
    max_capacity: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    rating: 4.8,
    reviews: 95,
    price: 80,
    discount_rate: 0.3,
    features: ["one", "two", "three"],
    is_wishlist: false,
    coordinate: { latitude: 1.352632, longitude: 103.707391 },
    characteristics: true,
    tag: true,
    activity: {
      Futsal: {
        numVenue: 2,
        unavailableDateTime: {
          openingHours: ['T08:00:00.000Z', 'T17:00:00.000Z'],
          bookings: [["2021-06-28T03:00:00.000Z", "2021-10-28T05:00:00.000Z"], ["2021-11-28T03:00:00.000Z", "2021-12-28T05:00:00.000Z"]],
        }, //can change to start/end-1hr datetime tuples to save space
        price: 120,
        peakDateTime: ['24/8/2021 7PM',], //can change to start/end-1hr datetime tuples to save space
        peakPrice: 150,
        images: [
          "https://a0.muscache.com/im/pictures/6a4518bf-30b5-423a-bce9-ca37ef8684f2.jpg",
          "https://a0.muscache.com/im/pictures/4c01023f-0bf0-4be9-9b9a-7fca7f2e0f39.jpg",
        ],
      },
      Badminton: {
        numVenue: 4,
        unavailableDateTime: ['26/8/2021 5PM',],
        price: 12,
        peakDateTime: ['29/8/2021 7PM',],
        peakPrice: 15,
        images: [
          "https://a0.muscache.com/im/pictures/d9cb5d9c-180b-47e4-a4da-a0ef60183e6c.jpg",
          "https://a0.muscache.com/im/pictures/694715b0-d81f-42d8-b7a3-219c13f7e3e9.jpg",
        ],
      }
    },
  },
  {
    id: 2,
    title: "Toa Payoh Stadium",
    property_type: "Whole house",
    max_capacity: 4,
    bedrooms: 1,
    beds: 3,
    baths: 1,
    rating: 4.94,
    reviews: 49,
    price: 120,
    discount_rate: 0,
    features: ["one", "two", "three"],
    is_wishlist: true,
    coordinate: { latitude: 1.336791, longitude: 103.7836817 },
    characteristics: true,
    tag: false,
    activity: {
      'Futsal': {
        numVenue: 2,
        unavailableDateTime: ['24/8/2021 5PM',],
        price: 110,
        peakDateTime: ['24/8/2021 7PM',],
        peakPrice: 150,
        images: [
          "https://a0.muscache.com/im/pictures/24c13157-5820-4ac5-89de-c61ff56d0b7d.jpg",
          "https://a0.muscache.com/im/pictures/f21352bf-128d-4577-9298-51db1e7bb8f7.jpg",
          "https://a0.muscache.com/im/pictures/64c80957-ae15-40ed-b80f-c236b5fa0a82.jpg",
        ],
      },
      'Tennis': {
        numVenue: 4,
        unavailableDateTime: ['26/8/2021 5PM',],
        price: 10.5,
        peakDateTime: ['29/8/2021 7PM',],
        peakPrice: 15,
        images: [
          "https://a0.muscache.com/im/pictures/23ca984d-f0f6-45dc-aae4-c1b72c0f6b40.jpg",
          "https://a0.muscache.com/im/pictures/1e25d179-e2c5-463c-a311-5ae5b46a05b4.jpg",
        ],
      }
    },
  },
  {
    id: 3,
    title: "Jurong Stadium",
    property_type: "Whole House",
    max_capacity: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    rating: 4.96,
    reviews: 22,
    price: 150,
    discount_rate: 0,
    features: ["one", "two", "three"],
    is_wishlist: false,
    coordinate: { latitude: 1.2743664, longitude: 103.843554 },
    characteristics: true,
    tag: true,
    activity: {
      '11-a-side': {
        numVenue: 2,
        unavailableDateTime: ['24/8/2021 5PM',],
        price: 125,
        peakDateTime: ['24/8/2021 7PM',],
        peakPrice: 150,
        images: [
          "https://a0.muscache.com/im/pictures/a8b4b91d-cf9f-4f63-8c0f-c38bceb2a48a.jpg",
          "https://a0.muscache.com/im/pictures/0cc1951c-754a-4a12-9460-47261669bbbf.jpg",
          "https://a0.muscache.com/im/pictures/01117608-aba3-4321-9ed0-66661b499229.jpg",
        ],
      },
      'Badminton': {
        numVenue: 4,
        unavailableDateTime: ['26/8/2021 5PM',],
        price: 10,
        peakDateTime: ['29/8/2021 7PM',],
        peakPrice: 15,
        images: [
          "https://a0.muscache.com/im/pictures/7d429894-8f1c-49e5-b60d-4b9d698313ab.jpg",
          "https://a0.muscache.com/im/pictures/d2b76f30-e8c9-4f3c-ad36-0dd62f15f91c.jpg",
        ],
      }
    },
  },
  {
    id: 4,
    title: "Hougang Stadium",
    property_type: "Whole house",
    max_capacity: 2,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    rating: 4.89,
    reviews: 190,
    price: 120,
    discount_rate: 0,
    features: ["one", "two", "three"],
    is_wishlist: true,
    coordinate: { latitude: 1.3179857, longitude: 103.8553938 },
    characteristics: true,
    tag: false,
    activity: {
      'Futsal': {
        numVenue: 2,
        unavailableDateTime: ['24/8/2021 5PM',],
        price: 80,
        peakDateTime: ['24/8/2021 7PM',],
        peakPrice: 150,
        images: [
          "https://a0.muscache.com/im/pictures/a3be415c-5568-41d9-989a-965fb3362d4b.jpg",
          "https://a0.muscache.com/im/pictures/3342dbc0-1e67-440c-b319-34bb8c33f52e.jpg",
        ],
      },
      'Golf': {
        numVenue: 4,
        unavailableDateTime: ['26/8/2021 5PM',],
        price: 220,
        peakDateTime: ['29/8/2021 7PM',],
        peakPrice: 250,
        images: [
          "https://a0.muscache.com/im/pictures/7613de94-5e37-446e-953d-5219e180bebb.jpg",
          "https://a0.muscache.com/im/pictures/03df0e22-990b-439d-80ff-8f4f14c1d6a9.jpg",
          "https://a0.muscache.com/im/pictures/83796db8-65a4-4d6e-a9df-31d4f482c4fe.jpg",
        ],
      }
    },
  },
  {
    id: 5,
    title: "Carpenter Playground",
    property_type: "Whole house",
    max_capacity: 4,
    bedrooms: 1,
    beds: 4,
    baths: 1,
    rating: 4.87,
    reviews: 98,
    price: 125,
    discount_rate: 0,
    features: ["one", "two", "three"],
    is_wishlist: false,
    coordinate: { latitude: 1.4276499, longitude: 103.8383331 },
    characteristics: true,
    tag: true,
    activity: {
      '11-a-side': {
        numVenue: 2,
        unavailableDateTime: ['24/8/2021 5PM',],
        price: 120,
        peakDateTime: ['24/8/2021 7PM',],
        peakPrice: 150,
        images: [
          "https://a0.muscache.com/im/pictures/d9cb5d9c-180b-47e4-a4da-a0ef60183e6c.jpg",
          "https://a0.muscache.com/im/pictures/694715b0-d81f-42d8-b7a3-219c13f7e3e9.jpg",
        ],
      },
      'Golf': {
        numVenue: 4,
        unavailableDateTime: ['26/8/2021 5PM',],
        price: 180,
        peakDateTime: ['29/8/2021 7PM',],
        peakPrice: 220,
        images: [
          "https://a0.muscache.com/im/pictures/dea004da-ce7c-4b96-8ded-788ef3168349.jpg",
          "https://a0.muscache.com/im/pictures/6a4518bf-30b5-423a-bce9-ca37ef8684f2.jpg",
          "https://a0.muscache.com/im/pictures/4c01023f-0bf0-4be9-9b9a-7fca7f2e0f39.jpg",
        ],
      }
    },
  },
];