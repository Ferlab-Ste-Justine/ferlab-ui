import React, { useEffect, useState } from 'react';
import { AnchorContainer } from 'antd/lib/anchor/Anchor';

import AnchorMenu from '../../components/AnchorMenu';
import { IAnchorLink } from '../../components/AnchorMenu';
import Empty from '../../components/Empty';
import ScrollContent from '../../layout/ScrollContent';

import styles from './EntityPage.module.scss';

export interface IEntityPage {
    children: React.ReactNode;
    links: IAnchorLink[];
    loading: boolean;
    pageId: string;
    bounds?: number;
    data?: any;
    emptyText?: string;
    getContainer?: () => AnchorContainer;
}

const EntityPage: React.FC<IEntityPage> = ({
    bounds,
    children,
    data,
    emptyText,
    getContainer,
    links,
    loading,
    pageId,
}) => {
    const [scrollContainerId, setScrollContainerId] = useState<string>('');
    const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');

    useEffect(() => {
        if (simplebarContent.length) {
            const scrollContainerId = pageId;
            setScrollContainerId(scrollContainerId);
            simplebarContent[simplebarContent.length - 1].setAttribute('id', scrollContainerId);
        }
    }, [scrollContainerId, simplebarContent, pageId]);

    if (!data && !loading) {
        return <Empty description={emptyText} imageType="row" size="large" />;
    }

    return (
        <div className={styles.entityPageContainer}>
            <ScrollContent className={styles.scrollContent}>{children}</ScrollContent>
            <AnchorMenu
                bounds={bounds}
                className={styles.anchorMenu}
                getContainer={getContainer}
                links={links}
                scrollContainerId={pageId}
            />
        </div>
    );
};

export default EntityPage;
