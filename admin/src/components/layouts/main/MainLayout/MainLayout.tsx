import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../../header/Header';
import MainContent from '../MainContent/MainContent';
import { MainHeader } from '../MainHeader/MainHeader';
import MainSider from '../sider/MainSider/MainSider';
import * as S from './MainLayout.styles';

const MainLayout: React.FC = () => {
    const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
    const [siderCollapsed, setSiderCollapsed] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (userData.data === null) {
    //         navigate('/login', { replace: true });
    //     }
    // }, [userData.data]);
    const toggleSider = () => setSiderCollapsed(!siderCollapsed);

    return (
        <S.LayoutMaster>
            <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} />
            <S.LayoutMain>
                <MainHeader isTwoColumnsLayout={isTwoColumnsLayout}>
                    <Header
                        toggleSider={toggleSider}
                        isSiderOpened={!siderCollapsed}
                        isTwoColumnsLayout={isTwoColumnsLayout}
                    />
                </MainHeader>
                <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
                    <div>
                        <Outlet />
                    </div>
                    {/* {!isTwoColumnsLayout && <References />} */}
                </MainContent>
            </S.LayoutMain>
        </S.LayoutMaster>
    );
};

export default MainLayout;
