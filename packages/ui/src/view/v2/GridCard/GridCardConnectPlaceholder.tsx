import React, { ReactNode } from 'react';
import { ApiOutlined } from '@ant-design/icons';
import { Button, ButtonProps, Space, Typography } from 'antd';

import styles from './GridCardConnectPlaceholder.module.css';

export const DEFAULT_CARD_CONNECT_PLACEHOLDER_DICTIONARY: TCardConnectPlaceholderDictionary = {
    action: 'Connect',
    description: 'Connect to our data repository partners using your NIH credentials.',
};

export type TCardConnectPlaceholderDictionary = {
    description: string;
    action: string;
};

interface ICardConnectPlaceholder {
    icon: ReactNode;
    dictionary?: TCardConnectPlaceholderDictionary;
    btnProps?: ButtonProps;
}

const { Text } = Typography;

const CardConnectPlaceholder = ({
    btnProps,
    dictionary = DEFAULT_CARD_CONNECT_PLACEHOLDER_DICTIONARY,
    icon,
}: ICardConnectPlaceholder): JSX.Element => (
    <Space className={styles.connectPlaceholder} direction="vertical" size={16}>
        <div>
            <div className={styles.iconWrapper}>{icon}</div>
        </div>
        <Text className={styles.description}>{dictionary.description}</Text>
        <Button
            icon={btnProps?.icon || <ApiOutlined />}
            size={btnProps?.size || 'small'}
            type={btnProps?.type || 'primary'}
            {...btnProps}
        >
            {dictionary.action}
        </Button>
    </Space>
);

export default CardConnectPlaceholder;
