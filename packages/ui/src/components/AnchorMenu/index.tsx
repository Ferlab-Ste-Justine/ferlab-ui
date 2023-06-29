import React from 'react';
import Anchor, { AnchorProps } from 'antd/lib/anchor';
import { AnchorContainer } from 'antd/lib/anchor/Anchor';

import styles from './index.module.scss';

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

const AnchorMenu = ({
    bounds = DEFAULT_BOUND,
    className,
    getContainer,
    links = [],
    scrollContainerId,
    ...rest
}: IAnchorMenuProps): JSX.Element => {
    const scrollContainer = document.getElementById(scrollContainerId);
    const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');

    const filteredLinks = links.filter((link) => !link.hidden);

    const _getContainer = simplebarContent
        ? () => simplebarContent[simplebarContent.length - 1] as AnchorContainer
        : undefined;
    // const _getContainer = scrollContainer ? () => scrollContainer : undefined;

    return (
        <Anchor
            bounds={bounds}
            className={`${styles.anchorMenu} ${className}`}
            getContainer={getContainer || _getContainer}
            {...rest}
        >
            {filteredLinks.map(({ href, title }: IAnchorLink, index: number) => (
                <Link href={href} key={index} title={title} />
            ))}
        </Anchor>
    );
};

export default AnchorMenu;
