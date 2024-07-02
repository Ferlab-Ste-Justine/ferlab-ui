import React from 'react';

import AnchorMenu from '../../components/AnchorMenu';
import { IAnchorLink } from '../../components/AnchorMenu';
import Empty from '../../components/Empty';
import ScrollContent from '../../layout/ScrollContent';

import styles from './EntityPage.module.css';

export interface IEntityPage {
    children: React.ReactNode;
    links: IAnchorLink[];
    loading: boolean;
    pageId: string;
    bounds?: number;
    data?: any;
    emptyText?: string;
}

const EntityPage: React.FC<IEntityPage> = ({ bounds, children, data, emptyText, links, loading, pageId }) => {
    if (!data && !loading) {
        return <Empty description={emptyText} imageType="row" size="large" />;
    }

    return (
        <div className={styles.entityPageContainer} id={pageId}>
            <ScrollContent className={styles.scrollContent}>{children}</ScrollContent>
            <AnchorMenu bounds={bounds} className={styles.anchorMenu} links={links} scrollContainerId={pageId} />
        </div>
    );
};

export default EntityPage;
