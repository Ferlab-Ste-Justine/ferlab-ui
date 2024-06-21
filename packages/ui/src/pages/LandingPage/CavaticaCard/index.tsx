import React, { ReactNode } from 'react';
import { Button } from 'antd';

import ExternalLinkIcon from '../../../components/ExternalLink/ExternalLinkIcon';

import styles from './index.module.css';

export type TCavaticaDictionary = {
    description: string;
    learnMore: string;
    login: string;
};

export type TCavaticaCardProps = {
    dictionary: TCavaticaDictionary;
    logo: ReactNode;
};

const CavaticaCard = ({ dictionary, logo }: TCavaticaCardProps) => (
    <div className={styles.container}>
        {logo}
        <div className={styles.description}>{dictionary.description}</div>
        <div className={styles.buttonContainer}>
            <Button
                className={styles.learnMoreButton}
                href="https://www.cavatica.org/"
                size="large"
                target="_blank"
                type="primary"
            >
                {dictionary.learnMore}
                <ExternalLinkIcon />
            </Button>
            <Button ghost href="https://cavatica.sbgenomics.com/" size="large" target="_blank">
                {dictionary.login}
                <ExternalLinkIcon />
            </Button>
        </div>
    </div>
);

export default CavaticaCard;
