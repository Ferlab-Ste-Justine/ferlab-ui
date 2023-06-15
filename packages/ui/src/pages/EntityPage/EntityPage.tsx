import React, { useEffect, useState } from 'react';

import AnchorMenu from '../../components/AnchorMenu';
import { IAnchorLink } from '../../components/AnchorMenu';
import Empty from '../../components/Empty';
import ScrollContent from '../../layout/ScrollContent';

import styles from './EntityPage.module.scss';

export interface IEntityPage {
    pageId: string;
    links: IAnchorLink[];
    data?: any;
    loading: boolean;
    emptyText?: string;
    children: React.ReactNode;
    preventUrlHash?: boolean;
}

const EntityPage: React.FC<IEntityPage> = ({
    children,
    data,
    emptyText,
    links,
    loading,
    pageId = '',
    preventUrlHash = false,
}) => {
    const [scrollContainerId, setScrollContainerId] = useState<string>(pageId);
    const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');

    useEffect(() => {
        if (pageId && simplebarContent?.length) {
            setScrollContainerId(pageId);
            simplebarContent[simplebarContent.length - 1].setAttribute('id', pageId);
        }
    }, [simplebarContent, pageId]);

    if (!data && !loading) {
        return <Empty description={emptyText} imageType="row" size="large" />;
    }

    return (
        <div className={styles.entityPageContainer}>
            <ScrollContent className={styles.scrollContent}>{children}</ScrollContent>
            <AnchorMenu
                className={styles.anchorMenu}
                links={links}
                preventUrlHash={preventUrlHash}
                scrollContainerId={scrollContainerId}
            />
        </div>
    );
};

export default EntityPage;
