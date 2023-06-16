import React from 'react';
import { Anchor, AnchorProps } from 'antd';

import styles from './index.module.scss';

const { Link } = Anchor;

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

const AnchorMenu = ({
    affix,
    getContainer,
    bounds,
    className,
    getCurrentAnchor,
    links = [],
    offsetTop,
    onChange,
    prefixCls,
    scrollContainerId,
    showInkInFixed,
    targetOffset,
}: IAnchorMenuProps) => {
    const scrollContainer = document.getElementById(scrollContainerId);

    const filteredLinks = links.filter((link) => !link.hidden);

    /** by default use first href link */
    const _getCurrentAnchor = (activeLink: string) => activeLink || (filteredLinks[0] && filteredLinks[0].href);
    const _getContainer = scrollContainer ? () => scrollContainer : undefined;

    /** all props are overridable by new props */
    return (
        <Anchor
            affix={affix}
            bounds={bounds}
            className={`${styles.anchorMenu} ${className}`}
            getContainer={getContainer || _getContainer}
            getCurrentAnchor={getCurrentAnchor || _getCurrentAnchor}
            offsetTop={offsetTop}
            onChange={onChange}
            prefixCls={prefixCls}
            showInkInFixed={showInkInFixed}
            targetOffset={targetOffset}
        >
            {filteredLinks.map(({ href, title }: IAnchorLink, index: number) => (
                <Link href={href} key={index} title={title} />
            ))}
        </Anchor>
    );
};

export default AnchorMenu;
