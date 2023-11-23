import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { IDictionary, ISavedFilter } from '../../types';

interface DeleteFilterConfirmParams {
    dictionary: IDictionary;
    savedFilter: ISavedFilter;
    onDeleteFilter: ((filterId: string) => void) | undefined;
}

export const deleteFilterConfirm = ({ dictionary, onDeleteFilter, savedFilter }: DeleteFilterConfirmParams) =>
    Modal.confirm({
        cancelText: dictionary.queryBuilderHeader?.popupConfirm?.delete.cancelText || 'Cancel',
        content:
            dictionary.queryBuilderHeader?.popupConfirm?.delete.content ||
            'You are about to permanently delete this filter and all of its queries.',
        icon: <ExclamationCircleOutlined />,
        okButtonProps: { danger: true },
        okText: dictionary.queryBuilderHeader?.popupConfirm?.delete.okText || 'Delete filter',
        onOk: () => {
            if (onDeleteFilter) {
                onDeleteFilter(savedFilter!.id);
            }
        },
        title: dictionary.queryBuilderHeader?.popupConfirm?.delete.title || 'Permanently delete this filter?',
    });
