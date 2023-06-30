import { CloseCircleOutlined, FilterOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/Button/Button';
import { Select } from '@app/components/common/Selects/Select/Select';
import { capitalize } from '@app/utils/utils';
import { Col, Form, Input, Row, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
export const LicenseFilter: React.FC = () => {
    const { t } = useTranslation();
    const [form] = useForm();
    const handleSubmit = (FormInput: any) => {};
    const handleClearFilter = () => {
        form.resetFields();
    };
    console.log('renderFilter');

    return (
        <Form onFinish={handleSubmit} form={form}>
            <Row gutter={16}>
                <Col span={20}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name={'creator'}>
                                <Input placeholder={`${t('table.creator')}`} />
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
