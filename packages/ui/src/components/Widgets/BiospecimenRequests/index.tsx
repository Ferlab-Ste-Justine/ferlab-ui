import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { List, Modal, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import cx from 'classnames';
import { formatDistance } from 'date-fns';

import GridCard, { GridCardHeader } from '../../../view/v2/GridCard';
import CardErrorPlaceholder, {
    DEFAULT_CARD_ERROR_PLACEHOLDER_DICTIONARY,
    TDictionaryCardErrorPlaceholder,
} from '../../../view/v2/GridCard/GridCardErrorPlaceholder';
import { IUserSetOutput } from '../../BiospecimenRequest/requestBiospecimen.utils';
import Empty from '../../Empty';
import ListItemWithActions from '../../List/ListItemWithActions';

import EditBiospecimenRequestModal, {
    DEFAULT_EDIT_BIOSPECIMENT_REQUEST_MODAL,
    TEditBiospecimenRequestModalDictionary,
} from './EditBiospecimenRequestModal';

import styles from '../widget.module.scss';

export const DEFAULT_BIOSPECIMEN_REQUESTS_WIDGET_DICTIONARY: TBiospecimenRequestsWidgetDictionary = {
    error: DEFAULT_CARD_ERROR_PLACEHOLDER_DICTIONARY,
    lastSaved: (date: string) => formatDistance(new Date(), new Date(date)),
    modal: {
        delete: {
            cancelText: 'Cancel',
            content: 'You are about to delete this request from your history.',
            okText: 'Delete',
            title: 'Permanently delete this biospecimen request?',
        },
        edit: DEFAULT_EDIT_BIOSPECIMENT_REQUEST_MODAL,
        share: {
            cancelText: 'Cancel',
            content:
                'Note that anyone with this link will have access to: The biospecimen request title The list of biospecimens in the request',
            okText: 'Copy Link',
            title: 'Share link to biospecimen request?',
        },
    },
    noBiospecimenRequests:
        'A history of your biospecimen requests will be listed here. You can make your first request from Data Exploration.',
    popover: {
        content:
            'This card holds the history of your biospecimen requests. You can reload them in the Data Exploration or share the link.',
        title: 'Your Request History',
    },
    title: 'Biospecimen Requests',
};

type TBiospecimenRequestsWidgetDictionary = {
    title: string;
    lastSaved: (date: string) => string;
    noBiospecimenRequests: string;
    error: TDictionaryCardErrorPlaceholder;
    popover: {
        title: string;
        content: string;
    };
    modal: {
        edit: TEditBiospecimenRequestModalDictionary;
        delete: {
            title: string;
            okText: string;
            content: string;
            cancelText: string;
        };
        share: {
            title: string;
            okText: string;
            content: string;
            cancelText: string;
        };
    };
};

interface IBiospecimenRequestsWidget {
    id: string;
    className?: string;
    dictionary?: TBiospecimenRequestsWidgetDictionary;
    data: IUserSetOutput[];
    loading: boolean;
    hasError?: boolean;
    handleListItemEdit: (id: string, name: string, callback: () => void) => void;
    handleListItemClick: (id: string) => void;
    handleListItemShare: (id: string) => Promise<void>;
    handleListItemDelete: (id: string) => void;
}

const BiospecimenRequestsWidget = ({
    className = '',
    data,
    dictionary = DEFAULT_BIOSPECIMEN_REQUESTS_WIDGET_DICTIONARY,
    handleListItemClick,
    handleListItemDelete,
    handleListItemEdit,
    handleListItemShare,
    hasError,
    id,
    loading,
}: IBiospecimenRequestsWidget): JSX.Element => {
    const [editedBiospecimenRequest, setEditedBiospecimenRequest] = useState<IUserSetOutput>();

    return (
        <>
            <EditBiospecimenRequestModal
                biospecimenRequest={editedBiospecimenRequest}
                dictionary={dictionary.modal.edit}
                handleClose={() => setEditedBiospecimenRequest(undefined)}
                handleSubmit={handleListItemEdit}
                open={editedBiospecimenRequest !== undefined}
                savedSets={data}
            />
            <GridCard
                content={
                    <>
                        <div className={styles.listContent}>
                            <List
                                bordered
                                className={styles.list}
                                dataSource={hasError ? [] : data}
                                itemLayout="horizontal"
                                loading={loading}
                                locale={{
                                    emptyText: hasError ? (
                                        <CardErrorPlaceholder {...dictionary.error} />
                                    ) : (
                                        <Empty description={dictionary.noBiospecimenRequests} imageType="grid" />
                                    ),
                                }}
                                renderItem={(item) => (
                                    <ListItemWithActions
                                        description={
                                            item.updated_date ? dictionary.lastSaved(item.updated_date) : undefined
                                        }
                                        onClick={() => handleListItemClick(item.id)}
                                        onDelete={() => {
                                            Modal.confirm({
                                                ...dictionary.modal.delete,
                                                icon: <ExclamationCircleOutlined />,
                                                okButtonProps: { danger: true },
                                                onOk: () => handleListItemDelete(item.id),
                                            });
                                        }}
                                        onEdit={() => setEditedBiospecimenRequest(item)}
                                        onShare={() => {
                                            Modal.confirm({
                                                ...dictionary.modal.share,
                                                onOk: handleListItemShare,
                                                width: 440,
                                            });
                                        }}
                                        title={item.tag}
                                        titleClassName={styles.listItemTitle}
                                    />
                                )}
                            />
                        </div>
                    </>
                }
                theme="shade"
                title={
                    <GridCardHeader
                        className={styles.cardHeader}
                        handleClassName={styles.dragHandle}
                        id={id}
                        infoPopover={{
                            className: styles.infoPopover,
                            content: (
                                <Space className={styles.infoPopoverContent} direction="vertical" size={0}>
                                    <Text>{dictionary.popover.content}</Text>
                                </Space>
                            ),
                            iconClassName: styles.infoIcon,
                            title: dictionary.popover.title,
                        }}
                        title={dictionary.title}
                        withHandle
                    />
                }
                wrapperClassName={cx(styles.widget, className)}
            />
        </>
    );
};

export default BiospecimenRequestsWidget;
