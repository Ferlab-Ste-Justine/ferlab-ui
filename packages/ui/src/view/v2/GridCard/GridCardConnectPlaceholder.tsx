import React from 'react';
import { ApiOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, ButtonProps, Space, Typography } from 'antd';

import styles from './GridCardConnectPlaceholder.module.scss';

export type TCardConnectPlaceholderDictionary = {
    description?: string;
    action?: string;
};

interface ICardConnectPlaceholder {
    dictionary?: TCardConnectPlaceholderDictionary;
    btnProps?: ButtonProps;
}

const { Text } = Typography;

const CardConnectPlaceholder = ({ btnProps, dictionary }: ICardConnectPlaceholder): JSX.Element => (
    <Space className={styles.connectPlaceholder} direction="vertical" size={16}>
        <div>
            <div className={styles.iconWrapper}>
                <SafetyOutlined className={styles.safetyIcon} />
            </div>
        </div>
        <Text className={styles.description}>
            {dictionary?.description ??
                'To access controlled study files, connect to our data repository partners using your NIH credentials.'}
        </Text>
        <Button
            icon={btnProps?.icon || <ApiOutlined />}
            size={btnProps?.size || 'small'}
            type={btnProps?.type || 'primary'}
            {...btnProps}
        >
            {dictionary?.action ?? 'Connect'}
        </Button>
    </Space>
);

export default CardConnectPlaceholder;
