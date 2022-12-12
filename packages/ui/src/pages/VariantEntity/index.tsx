import React, { useEffect, useState } from 'react';
import { Tag, Typography } from 'antd';

import AnchorMenu, { IAnchorLink } from '../../components/AnchorMenu';
import LineStyleIcon from '../../components/Icons/LineStyleIcon';
import ScrollContent from '../../layout/ScrollContent';

import Consequences from './Consequences';
import Frequencies from './Frequencies';
import Pathogenicity from './Pathogenicity';
import Summary from './Summary';
import { IParticipantQueryParams, IVariantEntity, IVariantEntityDictionary } from './types';

import styles from '@ferlab/style/pages/variantEntity/VariantEntity.module.scss';

const { Title } = Typography;

export type IVariantEntityProps = {
    variant?: IVariantEntity;
    loading: boolean;
    participantQueryParams: IParticipantQueryParams;
    dictionary: IVariantEntityDictionary;
    containerClassName?: string;
};

const VariantEntity: React.FC<IVariantEntityProps> = ({
    containerClassName,
    dictionary,
    loading,
    participantQueryParams,
    variant,
}) => {
    const { consequences, frequencies, pathogenicity, summary } = dictionary;

    const links: IAnchorLink[] = [
        { href: '#summary', title: summary.summary },
        { href: '#consequences', title: consequences.consequence },
        { href: '#frequencies', title: frequencies.frequency },
        { href: '#pathogenicity', title: pathogenicity.pathogenicity },
    ];

    const [scrollContainerId, setScrollContainerId] = useState<string>('');

    useEffect(() => {
        const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');

        if (simplebarContent.length) {
            const scrollContainerId = 'variant-entity-scroll-wrapper';
            setScrollContainerId(scrollContainerId);
            simplebarContent[simplebarContent.length - 1].setAttribute('id', scrollContainerId);
        }
    }, [scrollContainerId]);

    return (
        <div className={`${styles.variantEntityContainer} ${containerClassName}`}>
            <ScrollContent className={styles.scrollContent}>
                {variant && (
                    <div className={styles.titleHeader}>
                        <LineStyleIcon />
                        <Title className={styles.title} level={4}>{`${variant?.hgvsg}`}</Title>
                        <Tag className={styles.variantTag}>Germline</Tag>
                    </div>
                )}
                <Summary dictionary={summary} id={'summary'} loading={loading} variant={variant} />
                <Consequences dictionary={consequences} id={'consequences'} loading={loading} variant={variant} />
                <Frequencies
                    dictionary={frequencies}
                    id={'frequencies'}
                    loading={loading}
                    participantQueryParams={participantQueryParams}
                    variant={variant}
                />
                <Pathogenicity dictionary={pathogenicity} id={'pathogenicity'} loading={loading} variant={variant} />
            </ScrollContent>
            <AnchorMenu className={styles.anchorMenu} links={links} scrollContainerId={scrollContainerId} />
        </div>
    );
};

export default VariantEntity;
