import { LicenseStore } from '@app/interfaces';
import { AppParam } from '@app/interfaces/common';
import { createLicenseProxy, deleteLicenseProxy, getLicenseDataProxy, updateLicenseProxy } from '@app/services/proxy';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: LicenseStore = {
    data: [],
    formMode: false,
    filter: {},
    appState: 'all',
};

export const getDataLicense = createAsyncThunk('license/getDataLicense', async (input: AppParam) => {
    const res = await getLicenseDataProxy(input);
    return res;
});

export const createLicense = createAsyncThunk('license/createLicense', async (input: any) => {
    const res = await createLicenseProxy(input);
    return res;
});

export const updateLicense = createAsyncThunk('license/updateLicense', async (input: any) => {
    const res = await updateLicenseProxy(input);
    return res;
});

export const deleteLicense = createAsyncThunk('license/deleteLicense', async () => {
    const res = await deleteLicenseProxy();
    return res;
});

const licenseSlice = createSlice({
    name: 'license',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDataLicense.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default licenseSlice.reducer;
