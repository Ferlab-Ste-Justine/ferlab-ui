import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { List, Space, Typography } from 'antd';
import cx from 'classnames';

import ExternalLink from '../../ExternalLink';

import { ICavaticaProject } from './type';

import styles from './CavaticaListItem.module.css';

export const DEFAULT_CAVATICA_LIST_ITEM_DICTIONARY: TCavaticaListItemDictionary = {
    membersCount: (count: number) => `${count} members`,
};

export type TCavaticaListItemDictionary = {
    membersCount: (count: number) => string;
};

interface ICavaticaListItem {
    cavaticaUrl: string;
    project: ICavaticaProject;
    dictionary?: TCavaticaListItemDictionary;
}

const { Text } = Typography;

const CavaticaListItem = ({
    cavaticaUrl,
    dictionary = DEFAULT_CAVATICA_LIST_ITEM_DICTIONARY,
    project,
}: ICavaticaListItem): JSX.Element => (
    <List.Item className={cx('wrapped', styles.CavaticaListItem)} key={project.id}>
        <List.Item.Meta
            className={styles.itemMeta}
            title={
                <ExternalLink className={styles.projectLink} hasIcon href={`${cavaticaUrl}${project.id}`}>
                    {project.name}
                </ExternalLink>
            }
        />
        <Space className={styles.members}>
            <TeamOutlined className={styles.teamIcon} />
            <Text type="secondary">{dictionary.membersCount(project.memberCount ?? 0)}</Text>
        </Space>
    </List.Item>
);

export default CavaticaListItem;
