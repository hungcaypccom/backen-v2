import { BaseForm } from '@app/components/common/Forms/BaseForm/BaseForm';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Status } from '@app/components/common/Status/Status';
import { LicenseFilter } from '@app/components/filter/license';
import { LicenseForm } from '@app/components/form/formLicense';
import { Tables } from '@app/components/tables/Tables/Tables';
import { License } from '@app/interfaces/license';
import { Col, Row, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Button } from 'components/common/Button/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LicensePage: React.FC = () => {
    const { t } = useTranslation();
    const [form] = BaseForm.useForm();
    console.log('rendering license state');

    const columns: ColumnsType<any> = [
        {
            title: t('table.creator'),
            dataIndex: 'creator',
            align: 'center',
            render: (text: string, record: License) => <span>{record.creator}</span>,
        },
        {
            title: t('table.quoteid'),
            dataIndex: 'quoteid',
            align: 'center',
            render: (text: string, record: License) => <span>{record.quote_id}</span>,
        },
        {
            title: t('table.reason'),
            dataIndex: 'reason',
            align: 'center',
            render: (text: string, record: License) => <span>{record.reason}</span>,
        },
        {
            title: t('table.expire'),
            dataIndex: 'expire',
            align: 'center',
            render: (text: string, record: License) => {
                const date = new Date(record.expired_day);

                return <span>{date.toISOString().slice(0, 10) + ' ' + date.toISOString().slice(11, 19)}</span>;
            },
        },
        {
            title: t('table.packages'),
            dataIndex: 'packages',
            align: 'center',

            render: (text: string, record: License) => (
                <Row gutter={[10, 10]}>
                    {Array.isArray(record.packages) &&
                        record.packages.map((tag: string) => {
                            return (
                                <Col key={tag}>
                                    <Status color={'var(--info-color)'} text={tag} />
                                </Col>
                            );
                        })}
                </Row>
            ),
        },
        {
            title: t('table.actions'),
            dataIndex: 'actions',
            align: 'center',
            width: '15%',
            render: (text: string, record: License) => {
                return (
                    <Space>
                        <Button type="default" onClick={() => {}}>
                            {t('table.edit')}
                        </Button>
                        <Popconfirm
                            placement="topLeft"
                            title={t('action.delete_license')}
                            okText={t('table.yes')}
                            cancelText={t('table.no')}
                        >
                            <Button type="default" danger>
                                {t('table.delete')}
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    return (
        <>
            <Tables columns={columns} tableData={[]} rowKey={'quote_id'} />
        </>
    );
};

export default LicensePage;
