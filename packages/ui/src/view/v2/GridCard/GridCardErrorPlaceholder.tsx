import React from 'react';
import { Result, Typography } from 'antd';

import ExternalLink from '../../../components/ExternalLink';

import styles from './GridCardErrorPlaceholder.module.css';

export const DEFAULT_CARD_ERROR_PLACEHOLDER_DICTIONARY = {
    contactSupport: 'contact support',
    subtitle:
        'We are currently unable to connect to this service. Please refresh the page and try again. If the problem persists, please',
    supportEmail: '',
    title: 'Connection error',
};

export type TDictionaryCardErrorPlaceholder = {
    subtitle: string;
    contactSupport: string;
    supportEmail: string;
    title: string;
};

type TCardErrorPlaceholder = {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    dictionary?: TDictionaryCardErrorPlaceholder;
};

const { Text } = Typography;

const CardErrorPlaceholder = ({
    dictionary = DEFAULT_CARD_ERROR_PLACEHOLDER_DICTIONARY,
    subTitle,
    title,
}: TCardErrorPlaceholder): JSX.Element => (
    <Result
        status="error"
        subTitle={
            subTitle || (
                <Text>
                    {dictionary.subtitle}
                    <ExternalLink className={styles.link} href={`mailto:${dictionary.supportEmail}`}>
                        <Text>{dictionary.contactSupport}</Text>
                    </ExternalLink>
                    .
                </Text>
            )
        }
        title={title || dictionary.title}
    />
);

export default CardErrorPlaceholder;
