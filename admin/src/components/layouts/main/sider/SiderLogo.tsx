import React from 'react';
import * as S from './MainSider/MainSider.styles';
import { RightOutlined } from '@ant-design/icons';
import { useResponsive } from '@app/hooks/useResponsive';
import { useTranslation } from 'react-i18next';

interface SiderLogoProps {
    isSiderCollapsed: boolean;
    toggleSider: () => void;
}
export const SiderLogo: React.FC<SiderLogoProps> = ({ isSiderCollapsed, toggleSider }) => {
    const { tabletOnly } = useResponsive();
    const { t } = useTranslation();

    return (
        <S.SiderLogoDiv>
            <S.SiderLogoLink to="/">
                <S.BrandSpan>{t('sidebar.logo')}</S.BrandSpan>
            </S.SiderLogoLink>
            {tabletOnly && (
                <S.CollapseButton
                    shape="circle"
                    size="small"
                    $isCollapsed={isSiderCollapsed}
                    icon={<RightOutlined rotate={isSiderCollapsed ? 0 : 180} />}
                    onClick={toggleSider}
                />
            )}
        </S.SiderLogoDiv>
    );
};
