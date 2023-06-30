import { LAYOUT } from '@app/styles/themes/constants';
import { media } from '@app/styles/themes/constants';
import { Layout } from 'antd';
import styled, { css } from 'styled-components';

interface Header {
    $isTwoColumnsLayoutHeader: boolean;
}

export const Header = styled(Layout.Header)<Header>`
    line-height: 1.5;
    background: var(--layout-header-bg-color) !important;

    @media only screen and ${media.md} {
        padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
        height: ${LAYOUT.desktop.headerHeight};
    }

    @media only screen and ${media.md} {
        ${(props) =>
            props?.$isTwoColumnsLayoutHeader &&
            css`
                padding: 0;
            `}
    }
`;
