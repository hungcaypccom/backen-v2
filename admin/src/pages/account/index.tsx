import { PageLayout } from '@app/components/layouts/page/page';
import { Form } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AccountTable } from './table';

const DataTablesPage: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    return <PageLayout TopElement={AccountTable} Table={AccountTable} />;
};

export default DataTablesPage;
