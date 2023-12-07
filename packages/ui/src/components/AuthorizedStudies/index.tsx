import React, { useState } from 'react';
import { ApiOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, List, Result, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import cx from 'classnames';

import GridCard, { GridCardHeader } from '../../view/v2/GridCard';
import CardConnectPlaceholder, {
    TCardConnectPlaceholderDictionary,
} from '../../view/v2/GridCard/GridCardConnectPlaceholder';
import Empty from '../Empty';
import ExternalLink from '../ExternalLink';
import PopoverContentLink from '../PopoverContentLink';

import AuthorizedStudiesListItem, {
    IAuthorizedStudyQueryProps,
    TAuthorizedStudiesListItemDictionary,
} from './AuthorizedStudiesListItem';
import FencesAuthentificationModal, { TFencesAuthentificationModalDictionary } from './FencesAuthentificationModal';

import styles from './index.module.scss';

enum WIDGET_STATE {
    error = 'error',
    connected = 'connected',
    disconnected = 'disconnected',
}

export enum FENCE_AUHTENTIFICATION_STATUS {
    connected = 'connected',
    disconnected = 'disconnected',
    unknown = 'unknown',
}

export interface IAuthorizedStudy {
    user_acl_in_study: string[];
    title: string;
    total_uncontrolled_files_count: number;
    total_controlled_files_count: number;
    total_files_count: number;
    study_id: string;
}

export interface IAuthorizedStudies {
    studies: IAuthorizedStudy[];
    error: boolean;
    loading: boolean;
}

export interface IFence {
    id: string;
    status: FENCE_AUHTENTIFICATION_STATUS;
    loading: boolean;
    acl: string[];
    error: boolean;
}

export interface IFenceService {
    fence: string;
    name: React.ReactNode | string;
    icon: React.ReactNode;
    onConnectToFence: () => void;
    onDisconnectFromFence: () => void;
}

interface IAuthorizedStudiesWidget {
    id: string;
    className?: string;
    fences: IFence[];
    services: IFenceService[];
    authorizedStudies?: IAuthorizedStudies;
    queryProps: IAuthorizedStudyQueryProps;
    dictionary?: {
        title?: string;
        connectedNotice?: string;
        disconnectedNotice?: string;
        manageConnections?: string;
        noAvailableStudies?: string;
        authentification?: TCardConnectPlaceholderDictionary;
        list?: TAuthorizedStudiesListItemDictionary;
        error?: {
            title?: string;
            subtitle?: string;
            contactSupport?: string;
            email?: string;
        };
        popover?: {
            title?: string;
            applyingForDataAccess?: string;
            content?: string;
        };
        modal?: TFencesAuthentificationModalDictionary;
    };
}

const AuthorizedStudiesWidget = ({
    authorizedStudies,
    className = '',
    dictionary,
    fences,
    id,
    queryProps,
    services,
}: IAuthorizedStudiesWidget): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let state = WIDGET_STATE.disconnected;

    // check if has one fence connected
    if (fences.some((fence) => fence.status === FENCE_AUHTENTIFICATION_STATUS.connected)) {
        state = WIDGET_STATE.connected;
    }

    if (fences.some((fence) => fence.error)) {
        state = WIDGET_STATE.error;
    }

    return (
        <>
            <FencesAuthentificationModal
                dictionary={dictionary?.modal}
                fences={fences}
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}
                services={services}
            />
            <GridCard
                content={
                    <>
                        {/* Error */}
                        {state === WIDGET_STATE.error && (
                            <div className={styles.content}>
                                <Result
                                    status="error"
                                    subTitle={
                                        <Text>
                                            {dictionary?.error?.subtitle}
                                            <ExternalLink href={`mailto:${dictionary?.error?.email}`}>
                                                <Text>{dictionary?.error?.contactSupport}</Text>
                                            </ExternalLink>
                                            .
                                        </Text>
                                    }
                                    title={dictionary?.error?.title}
                                />
                            </div>
                        )}

                        {/* Connect Card  */}
                        {state === WIDGET_STATE.disconnected && (
                            <div className={styles.content}>
                                <CardConnectPlaceholder
                                    btnProps={{
                                        onClick: () => setIsModalOpen(true),
                                    }}
                                    dictionary={dictionary?.authentification}
                                />
                            </div>
                        )}

                        {/* List of Authorized Studies */}
                        {state === WIDGET_STATE.connected && (
                            <div className={styles.connected}>
                                <div className={styles.authenticatedHeader}>
                                    <Space align="start">
                                        <SafetyOutlined className={styles.safetyIcon} />
                                        <Text className={styles.notice}>
                                            {dictionary?.connectedNotice ??
                                                'You have access to the following controlled data. '}
                                            <Button
                                                className={styles.disconnectBtn}
                                                danger
                                                icon={<ApiOutlined />}
                                                loading={authorizedStudies?.loading}
                                                onClick={() => setIsModalOpen(true)}
                                                size="small"
                                                type="link"
                                            >
                                                {dictionary?.manageConnections ?? 'Manage your connections'}
                                            </Button>
                                        </Text>
                                    </Space>
                                </div>
                                <List<IAuthorizedStudy>
                                    bordered
                                    className={styles.list}
                                    dataSource={authorizedStudies?.studies ?? []}
                                    itemLayout="vertical"
                                    loading={authorizedStudies?.loading}
                                    locale={{
                                        emptyText: (
                                            <Empty
                                                description={dictionary?.noAvailableStudies ?? 'No available studies'}
                                                imageType="grid"
                                            />
                                        ),
                                    }}
                                    renderItem={(item) => (
                                        <AuthorizedStudiesListItem
                                            data={item}
                                            dictionary={dictionary?.list}
                                            key={item.study_id}
                                            queryProps={queryProps}
                                        />
                                    )}
                                />
                            </div>
                        )}
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
                                    <Text>
                                        {dictionary?.popover?.content ??
                                            'Users requesting access to controlled data are required to have an eRA Commons account. Read more on'}
                                        <PopoverContentLink
                                            className={styles.popoverExternalLink}
                                            externalHref="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?login=&page=login"
                                            title={
                                                dictionary?.popover?.applyingForDataAccess || 'applying for data access'
                                            }
                                        />
                                        .
                                    </Text>
                                </Space>
                            ),
                            iconClassName: styles.infoIcon,
                            title: dictionary?.popover?.title ?? 'Accessing Data',
                        }}
                        title={dictionary?.title ?? 'Authorized Studies'}
                        withHandle
                    />
                }
                wrapperClassName={cx(styles.wrapper, className)}
            />
        </>
    );
};

export default AuthorizedStudiesWidget;
