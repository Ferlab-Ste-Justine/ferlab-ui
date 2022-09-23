import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

import { IDictionary, ISavedFilter } from '../../types';

interface DeleteFilterConfirmParams {
    dictionary: IDictionary;
    savedFilter: ISavedFilter;
    onDeleteFilter: ((filterId: string) => void) | undefined;
}

export const deleteFilterConfirm = ({ dictionary, savedFilter, onDeleteFilter }: DeleteFilterConfirmParams) =>
    Modal.confirm({
        title: dictionary.queryBuilderHeader?.popupConfirm?.delete.title || 'Permanently delete this filter?',
        icon: <ExclamationCircleOutlined />,
        content:
            dictionary.queryBuilderHeader?.popupConfirm?.delete.content ||
            'You are about to permanently delete this filter and all of its queries.',
        okText: dictionary.queryBuilderHeader?.popupConfirm?.delete.okText || 'Delete filter',
        cancelText: dictionary.queryBuilderHeader?.popupConfirm?.delete.cancelText || 'Cancel',
        okButtonProps: { danger: true },
        onOk: () => {
            if (onDeleteFilter) {
                onDeleteFilter(savedFilter!.id);
            }
        },
    });
