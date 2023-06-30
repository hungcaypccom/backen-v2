import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { Menu } from 'antd';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useDispatch } from 'react-redux';
interface SiderContentProps {
    setCollapsed: (isCollapsed: boolean) => void;
}

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const dispatch = useDispatch();
    const [sidebarData, setSidebarData] = useState<SidebarNavigationItem[] | null>(sidebarNavigation);
    const currentMenuItem = sidebarNavigation.find(({ url }) => url === location.pathname);
    const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

    return (
        <S.Menu mode="inline" defaultSelectedKeys={defaultSelectedKeys} onClick={() => setCollapsed(true)}>
            {sidebarData?.map((nav) => (
                <Menu.Item key={nav.key} title="" icon={nav.icon}>
                    <Link to={nav.url || ''}>{t(nav.title)}</Link>
                </Menu.Item>
            ))}
        </S.Menu>
    );
};

export default SiderMenu;
