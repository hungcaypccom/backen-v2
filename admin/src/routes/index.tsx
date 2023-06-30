import DataTablesPage from '@app/pages/account';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// no lazy loading for auth pages to avoid flickering

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import LicensePage from '@app/pages/license';
import LoginPage from '@app/pages/login';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainLayout />}>
                    <Route index path="account" element={<DataTablesPage />} />
                    <Route path="data" element={<LicensePage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};
