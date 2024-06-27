import React from 'react';
import Anchor, { AnchorProps } from 'antd/lib/anchor';
import { AnchorContainer } from 'antd/lib/anchor/Anchor';

import styles from './index.module.css';

const { Link } = Anchor;

const DEFAULT_BOUND = 50;

export interface IAnchorLink {
    href: string;
    title: string;
    hidden?: boolean;
}

export interface IAnchorMenuProps extends AnchorProps {
    className?: string;
    scrollContainerId: string;
    links: IAnchorLink[];
}

/**
 * Since antd 4.24.11 we can't set active link. We need a little workaround with bounds props
 * we can't cache the scroll container html element, antd need to query it everytime on the scroll event
 * Adding an active link will broke the scroll event
 * TODO rewrite to antd 5.0
 */
const AnchorMenu = ({
    bounds = DEFAULT_BOUND,
    className,
    links = [],
    scrollContainerId,
    ...rest
}: IAnchorMenuProps): JSX.Element => {
    const filteredLinks = links.filter((link) => !link.hidden);

    const _getContainer = () =>
        document.querySelector(`#${scrollContainerId} .simplebar-content-wrapper:last-child`) as AnchorContainer;

    return (
        <Anchor bounds={bounds} className={`${styles.anchorMenu} ${className}`} getContainer={_getContainer} {...rest}>
            {filteredLinks.map(({ href, title }: IAnchorLink, index: number) => (
                <Link href={href} key={index} title={title} />
            ))}
        </Anchor>
    );
};

export default AnchorMenu;
