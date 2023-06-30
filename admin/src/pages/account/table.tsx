import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Tables } from '@app/components/tables/Tables/Tables';
import { UserData } from '@app/interfaces';
import { getAccountDataProxy } from '@app/services/proxy';
import { useQuery } from '@tanstack/react-query';
import { Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Button } from 'components/common/Button/Button';

export const AccountTable = () => {
    const query = useQuery({ queryKey: ['account'], queryFn: () => getAccountDataProxy() });

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            align: 'center',
            render: (text: string, record: UserData) => <span>{record?.name}</span>,
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            align: 'center',

            render: (text: string, record: UserData) => <span>{record?.birthday}</span>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            align: 'center',
            render: (text: string, record: UserData) => <span>{record?.phone}</span>,
        },
        {
            title: 'Created at',
            dataIndex: 'created_date',
            align: 'center',
            render: (text: string, record: UserData) => {
                const timestamp = parseInt(record?.createTime);
                const dateConvert = new Date(timestamp);
                return <span>{dateConvert.toLocaleTimeString() + ' ' + dateConvert.toLocaleDateString()}</span>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'delete',
            align: 'center',
            render: (text: string, record: UserData) => {
                return (
                    <Space>
                        <Tooltip title={'Download'}>
                            <Button
                                disabled={!(record?.status && record?.downloadable)}
                                type="default"
                                style={{ marginRight: '10px' }}
                                icon={<EditFilled />}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="top"
                            title="Do you want to delete this record"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {}}
                        >
                            <Tooltip title={'Delete'}>
                                <Button
                                    disabled={!(record?.status && record?.downloadable)}
                                    type="default"
                                    danger
                                    icon={<DeleteOutlined />}
                                />
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return <Tables columns={columns} tableData={query.isSuccess ? query.data : []} rowKey={'email'} />;
};
