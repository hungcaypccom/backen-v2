import { BarChartOutlined, UserOutlined, ProfileOutlined, AuditOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';

export interface SidebarNavigationItem {
    title: string;
    key: string;

    url?: string;
    icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
    {
        title: 'sidebar.account',
        key: 'account',
        icon: <UserOutlined />,
        url: '/account',
    },
    {
        title: 'sidebar.license',
        key: 'license',
        icon: <ProfileOutlined />,
        url: '/data',
    },
];
