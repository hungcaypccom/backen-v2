import accountReducer from '@app/store/slices/accountSlice';
import licenseReducer from '@app/store/slices/licenseSlice';
import generalReducer from './generalSlice';

export default {
    account: accountReducer,
    license: licenseReducer,
    general: generalReducer,
};
