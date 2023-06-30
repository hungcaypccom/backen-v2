import { BaseForm } from '@app/components/common/Forms/BaseForm/BaseForm';
import { Modal } from '@app/components/common/Modal/Modal';
import { EditForm } from '@app/components/form/formContainer/EditForm';
import * as Form from '@app/components/layouts/edit/EditLayout.styles';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { CommonStore } from '@app/interfaces/common';
import { setFormMode } from '@app/store/slices/generalSlice';
import { FormInstance } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'components/common/Table/Table';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as S from './Tables.styles';

interface Props {
    columns: ColumnsType;
    tableData: any;
    rowKey: string;
}
export const Tables: React.FC<Props> = ({ columns, tableData, rowKey }) => {
    return (
        <>
            <S.TablesWrapper>
                <S.Card id="basic-table" padding="1.25rem 1.25rem 0">
                    <Table rowKey={rowKey} columns={columns} dataSource={tableData} scroll={{ x: 800 }} bordered />
                </S.Card>
            </S.TablesWrapper>
        </>
    );
};
