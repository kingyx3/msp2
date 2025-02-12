import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    referrerId: null,
    shortlink: null,
};

const appsFlyerSlice = createSlice({
    name: 'appsFlyer',
    initialState,
    reducers: {
        setAppsFlyerData: (state, action) => {
            state.referrerId = action.payload.referrerId;
            state.shortlink = action.payload.shortlink;
        },
    },
});

export const { setAppsFlyerData } = appsFlyerSlice.actions;
export default appsFlyerSlice.reducer;