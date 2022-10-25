import React from 'react';
import { Anchor, AnchorProps } from 'antd';

import styles from '@ferlab/style/components/anchorMenu/AnchorMenu.module.scss';

const { Link } = Anchor;

export interface IAnchorLink {
    href: string;
    title: string;
}

export interface IAnchorMenuProps extends AnchorProps {
    className?: string;
    scrollContainerId: string;
    preventUrlHash?: boolean;
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
    preventUrlHash = true,
    scrollContainerId,
    showInkInFixed,
    targetOffset,
}: IAnchorMenuProps) => {
    const scrollContainer = document.getElementById(scrollContainerId);

    const handlePreventUrlHash = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
    };

    /** by default use first href link */
    const _getCurrentAnchor = (activeLink: string) => activeLink || (links[0] && links[0].href);
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
            onClick={preventUrlHash ? handlePreventUrlHash : undefined}
            prefixCls={prefixCls}
            showInkInFixed={showInkInFixed}
            targetOffset={targetOffset}
        >
            {links.map(({ href, title }: IAnchorLink, index: number) => (
                <Link href={href} key={index} title={title} />
            ))}
        </Anchor>
    );
};

export default AnchorMenu;
