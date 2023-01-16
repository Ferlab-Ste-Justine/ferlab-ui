import React, { useEffect, useState } from 'react';

import AnchorMenu from '../../components/AnchorMenu';
import { IAnchorLink } from '../../components/AnchorMenu';
import Empty from '../../components/Empty';
import ScrollContent from '../../layout/ScrollContent';

import styles from '@ferlab/style/pages/EntityPage/EntityPage.module.scss';

export interface IEntityPage {
    pageId: string;
    links: IAnchorLink[];
    data?: any;
    loading: boolean;
    emptyText?: string;
    children: JSX.Element | JSX.Element[];
}

const EntityPage: React.FC<IEntityPage> = ({ children, data, emptyText, links, loading, pageId }) => {
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
            <AnchorMenu className={styles.anchorMenu} links={links} scrollContainerId={scrollContainerId} />
        </div>
    );
};

export default EntityPage;
