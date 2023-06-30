import { AppParam } from '@app/interfaces/common';
import { createAccountProxy, deleteAccountProxy, getAccountDataProxy, updateAccountProxy } from '@app/services/proxy';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    formMode: false,
    filter: {},
    appState: 'all',
};

export const createAccount = createAsyncThunk('account/createAccount', async (input: any) => {
    const res = await createAccountProxy(input);
    return res;
});

export const updateAccount = createAsyncThunk('account/updateAccount', async (input: any) => {
    const res = await updateAccountProxy(input);
    return res;
});

export const deleteAccount = createAsyncThunk('account/deleteAccount', async () => {
    const res = await deleteAccountProxy();
    return res;
});

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default accountSlice.reducer;
