import React, { useState } from 'react';
import { ApiOutlined, DisconnectOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, List, Result, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import cx from 'classnames';

import GridCard, { GridCardHeader } from '../../../view/v2/GridCard';
import CardConnectPlaceholder, {
    DEFAULT_CARD_CONNECT_PLACEHOLDER_DICTIONARY,
    TCardConnectPlaceholderDictionary,
} from '../../../view/v2/GridCard/GridCardConnectPlaceholder';
import Empty from '../../Empty';
import ExternalLink from '../../ExternalLink';
import PopoverContentLink from '../../PopoverContentLink';
import { WIDGET_STATE } from '../constants';

import AuthorizedStudiesListItem, {
    DEFAULT_AUTHORIZED_STUDIES_LIST_ITEM_DICTIONARY,
    IAuthorizedStudyQueryProps,
    TAuthorizedStudiesListItemDictionary,
} from './AuthorizedStudiesListItem';
import FencesAuthentificationModal, {
    DEFAULT_FENCES_AUTHENTIFICATION_MODAL_DICTIONARY,
    TFencesAuthentificationModalDictionary,
} from './FencesAuthentificationModal';

import styles from '../widget.module.scss';

export enum FENCE_AUTHENTIFICATION_STATUS {
    connected = 'connected',
    disconnected = 'disconnected',
    unknown = 'unknown',
}

export const DEFAULT_AUTHORIZED_WIDGET_DICTIONARY = {
    authentification: DEFAULT_CARD_CONNECT_PLACEHOLDER_DICTIONARY,
    connectedNotice: 'You have access to the following controlled data.',
    disconnect: 'Disconnect',
    error: {
        contactSupport: 'contact support',
        disconnect: {
            end: 'your account and try again. If the problem persists, please',
            start: 'We are currently unable to connect to this service. Please refresh the page or',
        },
        email: '',
        title: 'Error',
    },
    list: DEFAULT_AUTHORIZED_STUDIES_LIST_ITEM_DICTIONARY,
    manageConnections: 'Manage your connections',
    modal: DEFAULT_FENCES_AUTHENTIFICATION_MODAL_DICTIONARY,
    noAvailableStudies: 'No available studies',
    popover: {
        applyingForDataAccess: 'applying for data access',
        content: 'Users requesting access to controlled data are required to have an eRA Commons account. Read more on',
        title: 'Accessing Data',
    },
    title: 'Authorized Studies',
};

export interface IAuthorizedStudy {
    user_acl_in_study: string[];
    title: string;
    authorized_controlled_files_count: number;
    total_uncontrolled_files_count: number;
    total_controlled_files_count: number;
    total_files_count: number;
    study_id: string;
    study_code: string;
}

export interface IAuthorizedStudies {
    studies: IAuthorizedStudy[];
    error: boolean;
    loading: boolean;
}

export interface IFence {
    id: string;
    status: FENCE_AUTHENTIFICATION_STATUS;
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

type TAuthorizedStudiesWidgetDictionary = {
    title: string;
    connectedNotice: string;
    manageConnections: string;
    noAvailableStudies: string;
    authentification: TCardConnectPlaceholderDictionary;
    list: TAuthorizedStudiesListItemDictionary;
    disconnect: string;
    error: {
        title: string;
        disconnect: {
            start: string;
            end: string;
        };
        contactSupport: string;
        email: string;
    };
    popover: {
        title: string;
        applyingForDataAccess: string;
        content: string;
    };
    modal?: TFencesAuthentificationModalDictionary;
};

interface IAuthorizedStudiesWidget {
    id: string;
    className?: string;
    fences: IFence[];
    services: IFenceService[];
    authorizedStudies?: IAuthorizedStudies;
    queryProps: IAuthorizedStudyQueryProps;
    dictionary?: TAuthorizedStudiesWidgetDictionary;
}

const AuthorizedStudiesWidget = ({
    authorizedStudies,
    className = '',
    dictionary = DEFAULT_AUTHORIZED_WIDGET_DICTIONARY,
    fences,
    id,
    queryProps,
    services,
}: IAuthorizedStudiesWidget): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    let state = WIDGET_STATE.loading;
    const hasMultipleServices = services.length > 1;

    // check if has one fence connected
    if (fences.some((fence) => fence.status === FENCE_AUTHENTIFICATION_STATUS.connected)) {
        state = WIDGET_STATE.connected;
    } else if (fences.every((fence) => fence.status === FENCE_AUTHENTIFICATION_STATUS.disconnected)) {
        state = WIDGET_STATE.disconnected;
    } else if (fences.some((fence) => fence.error)) {
        state = WIDGET_STATE.error;
    }

    return (
        <>
            {hasMultipleServices && (
                <FencesAuthentificationModal
                    dictionary={dictionary?.modal}
                    fences={fences}
                    onCancel={() => setIsModalOpen(false)}
                    open={isModalOpen}
                    services={services}
                />
            )}
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
                                            {dictionary.error.disconnect.start}
                                            <Button
                                                className={styles.disconnectErrorBtn}
                                                danger
                                                onClick={() => {
                                                    if (hasMultipleServices) {
                                                        setIsModalOpen(true);
                                                        return;
                                                    }
                                                    services[0].onDisconnectFromFence();
                                                }}
                                                size="small"
                                                type="link"
                                            >
                                                {dictionary.disconnect.toLowerCase()}
                                            </Button>
                                            {dictionary.error.disconnect.end}
                                            <ExternalLink
                                                className={styles.contactSupport}
                                                href={`mailto:${dictionary.error.email}`}
                                            >
                                                <Text>{dictionary.error.contactSupport}</Text>
                                            </ExternalLink>
                                            .
                                        </Text>
                                    }
                                    title={dictionary.error.title}
                                />
                            </div>
                        )}

                        {/* Connect Card  */}
                        {state === WIDGET_STATE.disconnected && (
                            <div className={styles.content}>
                                <CardConnectPlaceholder
                                    btnProps={{
                                        onClick: () => {
                                            if (hasMultipleServices) {
                                                setIsModalOpen(true);
                                                return;
                                            }
                                            services[0].onConnectToFence();
                                        },
                                    }}
                                    dictionary={dictionary.authentification}
                                    icon={<SafetyOutlined />}
                                />
                            </div>
                        )}

                        {/* List of Authorized Studies */}
                        {state === WIDGET_STATE.connected && (
                            <div className={styles.listContent}>
                                <div className={styles.authenticatedHeader}>
                                    <Space align="start">
                                        <SafetyOutlined className={styles.safetyIcon} />
                                        <Text className={styles.notice}>
                                            {dictionary.connectedNotice}
                                            <Button
                                                className={
                                                    hasMultipleServices
                                                        ? styles.manageConnections
                                                        : styles.disconnectBtn
                                                }
                                                icon={<ApiOutlined />}
                                                loading={authorizedStudies?.loading}
                                                onClick={() => {
                                                    if (hasMultipleServices) {
                                                        setIsModalOpen(true);
                                                        return;
                                                    }
                                                    services[0].onDisconnectFromFence();
                                                }}
                                                size="small"
                                                type="link"
                                            >
                                                {dictionary.manageConnections}
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
                                            <Empty description={dictionary.noAvailableStudies} imageType="grid" />
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
                loading={state === WIDGET_STATE.loading}
                loadingType="spinner"
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
                                        {dictionary.popover.content}
                                        <PopoverContentLink
                                            className={styles.popoverExternalLink}
                                            externalHref="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?login=&page=login"
                                            title={dictionary.popover.applyingForDataAccess}
                                        />
                                        .
                                    </Text>
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

export default AuthorizedStudiesWidget;
