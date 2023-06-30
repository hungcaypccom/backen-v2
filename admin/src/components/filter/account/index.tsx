import { CloseCircleOutlined, FilterOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/Button/Button';
import { Select } from '@app/components/common/Selects/Select/Select';
import { useResponsive } from '@app/hooks/useResponsive';
import { capitalize } from '@app/utils/utils';
import { Col, Form, Input, Row, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AccountFilter: React.FC = (): JSX.Element => {
    const { isTablet, isDesktop } = useResponsive();
    const { t } = useTranslation();
    const [form] = useForm();
    console.log('rendering AccountFilter');

    const handleSubmit = (FormInput: any) => {};
    const handleClearFilter = () => {
        form.resetFields();
    };
    return (
        <Form onFinish={handleSubmit} form={form}>
            <Row gutter={16}>
                <Col span={20}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name={'name'}>
                                <Input placeholder={`${t('table.name')}`} />
                            </Form.Item>
                        </Col>

                        <Col>
                            <Tooltip title={`${t('tooltip.filter')}`}>
                                <Form.Item>
                                    <Button htmlType="submit" icon={<FilterOutlined />} />
                                </Form.Item>
                            </Tooltip>
                        </Col>
                        <Col span={2}>
                            <Tooltip title={`${t('tooltip.clear_filter')}`}>
                                <Form.Item>
                                    <Button onClick={handleClearFilter} icon={<CloseCircleOutlined />} />
                                </Form.Item>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};
