import React from 'react';
import Anchor, { AnchorProps } from 'antd/lib/anchor';
import { AnchorContainer } from 'antd/lib/anchor/Anchor';

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
    bounds,
    className,
    getContainer,
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

    const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');

    const filteredLinks = links.filter((link) => !link.hidden);

    /** by default use first href link */
    const _getCurrentAnchor = (activeLink: string) => activeLink || (filteredLinks[0] && filteredLinks[0].href);
    const _getContainer = simplebarContent
        ? () => simplebarContent[simplebarContent.length - 1] as AnchorContainer
        : undefined;

    /** all props are overridable by new props */
    return (
        <Anchor
            affix={affix}
            bounds={50}
            className={`${styles.anchorMenu} ${className}`}
            getContainer={getContainer || _getContainer}
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
