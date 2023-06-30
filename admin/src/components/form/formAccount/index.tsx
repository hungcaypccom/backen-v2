import { BaseForm } from '@app/components/common/Forms/BaseForm/BaseForm';
import * as Form from '@app/components/layouts/edit/EditLayout.styles';
import { createAccountProxy, updateAccountProxy } from '@app/services/proxy';
import { useMutation } from '@tanstack/react-query';
import { FormInstance } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
    form: FormInstance<any>;
}

export const AccountForm: React.FC<Props> = ({ form }) => {
    const { t } = useTranslation();
    const createMutation = useMutation({
        mutationFn: (data) => {
            return createAccountProxy(data);
        },
    });
    const updateMutation = useMutation({
        mutationFn: (data) => {
            return updateAccountProxy(data);
        },
    });
    const handleSubmit = () => {};
    return (
        <BaseForm layout="vertical" onFinish={() => handleSubmit()} requiredMark="optional" form={form}>
            <Form.FormItem
                rules={[{ required: true, message: `${t('form.name')}` }]}
                name={'name'}
                label={t('common.name')}
            >
                <Form.FormInput placeholder="Name" />
            </Form.FormItem>
            <Form.FormItem
                rules={[{ required: true, message: `${t('form.email')}` }]}
                name={'email'}
                label={t('common.email')}
            >
                <Form.FormInput placeholder="Email" />
            </Form.FormItem>
            <Form.FormItem
                rules={[{ required: true, message: `${t('form.institution')}` }]}
                name={'institution'}
                label={t('table.institution')}
            >
                <Form.FormInput placeholder="Name" />
            </Form.FormItem>
        </BaseForm>
    );
};
