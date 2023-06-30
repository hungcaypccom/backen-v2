import { getAccountDataApi, updateAccountApi, deleteAccountApi, createAccountApi } from '@app/services/api';
import { AppParam } from '@app/interfaces/common';

export const getAccountDataProxy = async () => {
    const res = await getAccountDataApi();
    if (res.data.status === 1) {
        return res.data.data;
    }
    return null;
};

export const createAccountProxy = async (input: any) => {
    const res = await createAccountApi(input);
    if (res.data.status === 1) {
        return res.data.data;
    }
    return null;
};

export const deleteAccountProxy = async () => {
    const res = await deleteAccountApi();
    if (res.data.status === 1) {
        return res.data.data;
    }
    return null;
};

export const updateAccountProxy = async (input: any) => {
    const res = await updateAccountApi(input);
    if (res.data.status === 1) {
        return res.data.data;
    }
    return null;
};
