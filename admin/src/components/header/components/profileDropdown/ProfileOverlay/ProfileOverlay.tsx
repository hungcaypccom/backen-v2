import { DropdownMenu } from '@app/components/header/Header.styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as S from './ProfileOverlay.styles';

export const ProfileOverlay: React.FC = ({ ...props }) => {
    const { t } = useTranslation();

    return (
        <DropdownMenu selectable={false} {...props}>
            <>
                <S.MenuItem key={1}>
                    <S.Text>
                        <Link onClick={() => {}} to="/login">
                            {t('header.logout')}
                        </Link>
                    </S.Text>
                </S.MenuItem>
            </>
        </DropdownMenu>
    );
};
