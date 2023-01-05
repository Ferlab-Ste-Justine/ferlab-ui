import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import Title from 'antd/lib/typography/Title';

import AnchorMenu from '../../components/AnchorMenu';
import ScrollContent from '../../layout/ScrollContent';

import { IEntityPageWrapper } from './type';

import styles from '@ferlab/style/pages/EntityPageWrapper/EntityPageWrapper.module.scss';

const EntityPageWrapper: React.FC<IEntityPageWrapper> = ({ children, links, pageId, title }) => {
    const [scrollContainerId, setScrollContainerId] = useState<string>('');

    useEffect(() => {
        const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');

        if (simplebarContent.length) {
            const scrollContainerId = pageId;
            setScrollContainerId(scrollContainerId);
            simplebarContent[simplebarContent.length - 1].setAttribute('id', scrollContainerId);
        }
    }, [scrollContainerId]);

    return (
        <div className={styles.entityPageWrapperContainer}>
            <ScrollContent className={styles.scrollContent}>
                <div className={styles.titleHeader}>
                    {title.icon}
                    <Title className={styles.title} level={4}>
                        {title.text}
                    </Title>
                    {title.tag && <Tag className={styles.tag}>{title.tag}</Tag>}
                </div>
                {children}
            </ScrollContent>
            <AnchorMenu className={styles.anchorMenu} links={links} scrollContainerId={scrollContainerId} />
        </div>
    );
};

export default EntityPageWrapper;
