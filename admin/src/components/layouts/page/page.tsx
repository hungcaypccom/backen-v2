import { BreadcrumbComponent } from '@app/components/breacrumb/breadcrumb';
import { Modal } from '@app/components/common/Modal/Modal';
import { ExtraComponent } from '@app/components/extra/common';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BreadcrumbData, CommonStore } from '@app/interfaces/common';
import { Card, FormInstance, Layout } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'components/common/Table/Table';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as S from './page.styles';
import { Content } from 'antd/es/layout/layout';

interface Props {
    TopElement: any;
    Table: any;
}
export const PageLayout: React.FC<Props> = ({ TopElement, Table }) => {
    const { t } = useTranslation();
    const generalState: CommonStore = useAppSelector((state) => state.general);
    const dispatch = useDispatch();
    // const [appState, setAppState] = useState('All');
    const componentRef = useRef<any>();

    return (
        <Card>
            <Layout>
                {/* <Content>{TopElement}</Content> */}
                <Content>{Table}</Content>
            </Layout>
        </Card>
    );
};
