import React, { useState } from 'react';
import { DisconnectOutlined, PlusOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, List, Result, Space, Typography } from 'antd';
import cx from 'classnames';

import GridCard, { GridCardHeader } from '../../../view/v2/GridCard';
import CardConnectPlaceholder, {
    TCardConnectPlaceholderDictionary,
} from '../../../view/v2/GridCard/GridCardConnectPlaceholder';
import Empty from '../../Empty';
import ExternalLink from '../../ExternalLink';
import PopoverContentLink from '../../PopoverContentLink';
import { WIDGET_STATE } from '../constants';

import {
    DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY,
    ICavaticaCreateProjectModal,
    TCavaticaCreateProjectModalDictionary,
} from './CavaticaCreateProjectModal';
import CavaticaCreateProjectModal from './CavaticaCreateProjectModal';
import CavaticaIcon from './CavaticaIcon';
import CavaticaListItem, {
    DEFAULT_CAVATICA_LIST_ITEM_DICTIONARY,
    TCavaticaListItemDictionary,
} from './CavaticaListItem';
import {
    IBillingGroups,
    ICavaticaAuthentification,
    ICavaticaProject,
    ICavaticaProjects,
    PASSPORT_AUTHENTIFICATION_STATUS,
} from './type';

import styles from '../widget.module.css';

const { Text } = Typography;

export enum PASSPORT {
    cavatica = 'cavatica',
}

export enum CAVATICA_API_ERROR_TYPE {
    fetch = 'fetch',
    create = 'create',
}

export const DEFAULT_CAVATICA_WIDGET_DICTIONARY: TCavaticaWidgetDictionary = {
    connectCard: {
        action: 'Connect',
        description: 'To analyze KIDS FIRST data on the cloud, connect to Cavatica.',
    },
    connectedNotice: 'You are connected to the Cavatica cloud environment',
    createProjectModal: DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY,
    disconnect: 'screen.dashboard.cards.cavatica.disconnect',
    error: {
        contactSupport: 'contact support.',
        email: '',
        fetch: {
            disconnect: {
                end: 'your account and try again. If the problem persists, please',
                start: 'We are currently unable to connect to this service. Please refresh the page or',
            },
            title: 'Error',
        },
    },
    firstProject: 'Create your first project',
    list: DEFAULT_CAVATICA_LIST_ITEM_DICTIONARY,
    newProject: 'New project',
    noProject: 'You do not have any Cavatica projects.',
    popover: {
        content:
            'CAVATICA is a cloud-based data analysis platform where data, results, and workflows are shared among the world’s research community.',
        readMore: 'Read more',
        title: 'CAVATICA Compute Cloud Platform',
    },
    title: 'Cavatica Projects',
};

type TCavaticaWidgetDictionary = {
    title: string;
    connectedNotice: string;
    disconnect: string;
    newProject: string;
    firstProject: string;
    noProject: string;
    popover: {
        title: string;
        readMore: string;
        content: string;
    };
    connectCard: TCardConnectPlaceholderDictionary;
    list: TCavaticaListItemDictionary;
    createProjectModal: TCavaticaCreateProjectModalDictionary;
    error: {
        fetch: {
            title: string;
            disconnect: {
                start: string;
                end: string;
            };
        };
        contactSupport: string;
        email: string;
    };
};

interface ICavaticaWidget {
    cavatica: {
        authentification: ICavaticaAuthentification;
        projects: ICavaticaProjects;
        billingGroups: IBillingGroups;
    };
    id: string;
    className?: string;
    cavaticaUrl: string;
    createProjectModalProps: ICavaticaCreateProjectModal;
    handleConnection: () => void;
    handleDisconnection: () => void;
    dictionary?: TCavaticaWidgetDictionary;
}

const CavaticaWidget = ({
    cavatica,
    cavaticaUrl,
    className,
    createProjectModalProps,
    dictionary = DEFAULT_CAVATICA_WIDGET_DICTIONARY,
    handleConnection,
    handleDisconnection,
    id,
}: ICavaticaWidget): JSX.Element => {
    const { authentification, projects } = cavatica;
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false);

    let state = WIDGET_STATE.loading;

    if (authentification.error || projects.error === CAVATICA_API_ERROR_TYPE.fetch) {
        state = WIDGET_STATE.error;
    } else if (authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected) {
        state = WIDGET_STATE.connected;
    } else if (authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.disconnected) {
        state = WIDGET_STATE.disconnected;
    }

    return (
        <>
            <CavaticaCreateProjectModal
                dictionary={dictionary?.createProjectModal}
                handleCloseModal={() => setIsCreateProjectModalOpen(false)}
                onCancel={() => setIsCreateProjectModalOpen(false)}
                open={isCreateProjectModalOpen}
                {...createProjectModalProps}
            />
            <GridCard
                content={
                    <>
                        {/* Error */}
                        {state === WIDGET_STATE.error && (
                            <div className={cx(styles.content, styles.error)}>
                                <Result
                                    status="error"
                                    subTitle={
                                        <Text>
                                            {dictionary.error.fetch.disconnect.start}
                                            <Button
                                                className={styles.disconnectErrorBtn}
                                                danger
                                                loading={authentification.loading}
                                                onClick={handleDisconnection}
                                                size="small"
                                                type="link"
                                            >
                                                {dictionary.disconnect.toLowerCase()}
                                            </Button>
                                            {dictionary.error.fetch.disconnect.end}
                                            <ExternalLink
                                                className={styles.contactSupport}
                                                href={`mailto:${dictionary.error.email}`}
                                            >
                                                <Text>{dictionary.error.contactSupport}</Text>
                                            </ExternalLink>
                                            .
                                        </Text>
                                    }
                                    title={dictionary.error.fetch.title}
                                />
                            </div>
                        )}

                        {/* Disconnected */}
                        {state === WIDGET_STATE.disconnected && (
                            <div className={styles.content}>
                                <CardConnectPlaceholder
                                    btnProps={{
                                        onClick: handleConnection,
                                    }}
                                    dictionary={dictionary.connectCard}
                                    icon={<CavaticaIcon />}
                                />
                            </div>
                        )}

                        {/* Connected */}
                        {state === WIDGET_STATE.connected && (
                            <div className={styles.listContent}>
                                <Space className={styles.authenticatedHeader} direction="horizontal">
                                    <Space align="start">
                                        <SafetyOutlined className={styles.safetyIcon} />
                                        <Text className={styles.notice}>
                                            {dictionary.connectedNotice}
                                            <Button
                                                className={styles.manageConnections}
                                                danger
                                                icon={<DisconnectOutlined />}
                                                loading={authentification.loading}
                                                onClick={handleDisconnection}
                                                size="small"
                                                type="link"
                                            >
                                                {dictionary.disconnect}
                                            </Button>
                                        </Text>
                                    </Space>
                                </Space>
                                <List<ICavaticaProject>
                                    bordered
                                    className={styles.list}
                                    dataSource={projects.data}
                                    itemLayout="vertical"
                                    loading={projects.loading}
                                    locale={{
                                        emptyText: (
                                            <Empty
                                                action={
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        onClick={() => setIsCreateProjectModalOpen(true)}
                                                        size="small"
                                                        type="primary"
                                                    >
                                                        {dictionary.firstProject}
                                                    </Button>
                                                }
                                                description={dictionary.noProject}
                                                imageType="grid"
                                            />
                                        ),
                                    }}
                                    renderItem={(project) => (
                                        <CavaticaListItem
                                            cavaticaUrl={cavaticaUrl}
                                            dictionary={dictionary.list}
                                            project={project}
                                        />
                                    )}
                                />
                                {projects.data.length > 0 && (
                                    <div className={styles.contentFooter}>
                                        <Button
                                            className={styles.newProjectBtn}
                                            icon={<PlusOutlined />}
                                            onClick={() => setIsCreateProjectModalOpen(true)}
                                            size="small"
                                        >
                                            {dictionary.newProject}
                                        </Button>
                                    </div>
                                )}
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
                                    <Typography.Text>
                                        <Space direction="vertical" size={2}>
                                            <span>{dictionary.popover.content}</span>
                                            <PopoverContentLink
                                                externalHref="https://www.cavatica.org/"
                                                title={dictionary.popover.readMore}
                                            />
                                        </Space>
                                    </Typography.Text>
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

export default CavaticaWidget;
