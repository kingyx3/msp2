const firestoreCollections = {
    allspaces,
    allspacesavailability,
    bookings,
    feedback,
    logs,
    spaces: {
        spaceavailability,
        spacebookings,
        spacereviews
    },
    users: {
        userspaces,
        userbookings,
        userreviews
    }
}

const firestoreCollectionFields = {
    allspaces: {
        // [spaceType_AND_0]: {
        [spaceId]: {
            cancellationPolicy: {
                label,
                numberOfHours
            },
            description,
            disabled,
            end,
            id,
            images: [],
            location: {},
            monthsAhead,
            offPeakPrice,
            openingHours: [],
            peakPrice,
            price,
            ratingCount,
            ratingTotal,
            spaceCount,
            title
        },
        [spaceId2]: {
        },
        [spaceId3]: {
        },
        // },
        // [spaceType_AND_1]: {},
        // [spaceType_AND_2]: {},
    },
    allspacesavailability: {
        // [spaceType_AND_Date_Yyyy_Mm_Dd_AND_0]: {
        [hourlyStartTimeInMils]: {
            spaceId: [slotPrice, court1Availability, court2Availability, court3Availability],
            spaceId2,
            spaceId3
        },
        [hourlyStartTimeInMils2]: {
        },
        [hourlyStartTimeInMils3]: {
        }
        // },
        // [spaceType_AND_Date_Yyyy_Mm_Dd_AND_1]: {},
        // [spaceType_AND_Date_Yyyy_Mm_Dd_AND_2]: {}
    },
    bookings: {
        accountId,
        allSpacesDocNum,
        cancellationPolicy: {
            label,
            numberOfHours
        },
        cancelled,
        courtId,
        created,
        end,
        hostId,
        id,
        images: "",
        lastUpdated,
        paidHost,
        price: {
            hostEarnings,
            subtotal,
            total_price
        },
        spaceBookingsDocNum,
        spaceId,
        spaceType,
        start,
        status,
        title,
        userBookingsDocNum,
        userCreated,
        userId
    },
    feedback: {
        category,
        comments,
        email,
        resolved
    },
    logs: {
        createSpace: {
            created,
            images,
            logType,
            message,
            spaceId,
            title,
            userId,
            userLogId
        },
        updateSpace: {
            beforeObj: {},
            created,
            images,
            logType,
            message,
            spaceId,
            title,
            updateObj: {},
            userId,
            userLogId
        },
        disableSpace: {
            created,
            images,
            logType,
            message,
            spaceId,
            title,
            userId,
            userLogId
        },
        enableSpace: {
            created,
            images,
            logType,
            message,
            spaceId,
            title,
            userId,
            userLogId
        },
        createBooking: {
            amount: {
                hostEarnings,
                subtotal,
                total_price
            },
            bookingId,
            courtId,
            created,
            images,
            logType,
            message,
            spaceId,
            status,
            title,
            userId,
            userLogId
        },
        cancelBooking: {
            amount: {
                hostEarnings,
                refundAmount,
                subtotal,
                total_price
            },
            bookingId,
            courtId,
            created,
            images,
            logType,
            message,
            spaceId,
            status,
            title,
            userId,
            userLogId
        },
        topUpWallet: {
            amount: {
                total_price
            },
            created,
            logType,
            message,
            title,
            userId,
            userLogId
        },
    },
    spaces: {
        accountId,
        allSpacesDocNum,
        cancellationPolicy: {
            label,
            numberOfHours
        },
        ccy,
        created,
        description,
        disabled,
        end,
        id,
        images: [],
        lastUpdated,
        location: {},
        monthsAhead,
        offPeakPrice,
        openingHours: [],
        peakPrice,
        price,
        ratingCount,
        ratingTotal,
        reviews: {
            spaceReviewDT: {
                [userId_AND_spaceId]: {
                    id,
                    rating,
                    review,
                    spaceId,
                    timestamp,
                    userId,
                    userName
                },
                [userId_AND_spaceId2]: {},
                [userId_AND_spaceId3]: {}
            },
            spaceReviewRTBtm: {},
            spaceReviewRTTop: {},
        },
        spaceCount,
        spaceType,
        title,
        userCreated,
        userId,
        userSpacesDocNum,
    },
    spaceavailability: {
        // [year]: {
        [hourlyStartTimeInMils]: [slotPrice, court1Availability, court2Availability, court3Availability],
        [hourlyStartTimeInMils2]: [],
        [hourlyStartTimeInMils2]: [],
        // },
        // [year2]: {},
        // [year3]: {}
    },
    spacebookings: {
        // [0]: {
        [bookingId]: {
            courtId,
            created,
            end,
            id,
            lastUpdated,
            price: {
                hostEarnings,
                subtotal,
                total_price
            },
            start,
            status
        },
        [bookingId2]: {},
        [bookingId3]: {}
        // },
        // [1]: {},
        // [2]: {}
    },
    spacereviews: {
        // [0]: {
        [userId_AND_spaceId]: {
            id,
            rating,
            review,
            spaceId,
            timestamp_TO_CHANGE_TO_created,
            userId,
            userName
        },
        [userId_AND_spaceId2]: {},
        [userId_AND_spaceId3]: {}
        // },
        // [1]: {},
        // [2]: {}
    },
    users: {
        accountId,
        avatar,
        bookingLogs: {},
        created,
        email,
        hostingLogs,
        id,
        lastUpdated,
        onboarded,
        wallet: {
            sgd
        }
    },
    userbookings: {
        // [0]: {
        [bookingId]: {
            courtId,
            created,
            end,
            id,
            images: "",
            lastUpdated,
            spaceId,
            spaceType,
            start,
            status,
            title,
        },
        [bookingId2]: {},
        [bookingId3]: {}
        // },
        // [1]: {},
        // [2]: {}
    },
    userspaces: {
        // [0]: {
        [spaceId]: {
            disabled,
            id,
            images: "",
            spaceType,
            title,
        },
        [spaceId2]: {},
        [spaceId3]: {}
        // },
        // [1]: {},
        // [2]: {}
    },
    userreviews: {
        // [0]: {
        [userId_AND_spaceId]: {
            id,
            rating,
            review,
            spaceId,
            created,
            userId
        },
        [userId_AND_spaceId2]: {},
        [userId_AND_spaceId3]: {}
        // },
        // [1]: {},
        // [2]: {}
    },
    userlogs_NEW: {
        // [0]: {
        [logId]: {
            logFields_VARIES
        },
        [logId2]: {},
        [logId3]: {}
        // },
        // [1]: {},
        // [2]: {}
    },
    // LOG TYPES
    // createSpace => ID = spaceId
    // updateSpace => ID = spaceId + "_" + random
    // disableSpace => ID = spaceId + "_" + random
    // enableSpace => ID = spaceId + "_" + random
    // createBooking => ID = bookingId
    // cancelBooking => ID = bookingId + "_cancel"
    // topUpWallet => ID = userId + "_" + random
}

// // Potential Deprecations
// - reviews
// - userreviews
// - spacereviews (alr in space object)
// - logs
// - userbookinglogs (alr in user object)
// - userhostinglogs (alr in user object)

const firebaseFunctions = {
    createSpace,
    updateSpace,
    disableSpace,
    enableSpace,
    createBooking,
    cancelBooking,
    updateBlocked,

    getPublicKey,
    getAccountLink,
    getPaymentSheet,
    widgets,

    createFeedback,
    createReview,
    registerWithEmail,

    propagateAvailability,

    CRON12mnSGT,
}