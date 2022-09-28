import React from 'react';
import { Anchor } from 'antd';

import styles from '@ferlab/style/components/anchorMenu/AnchorMenu.module.scss';

const { Link } = Anchor;

export interface IAnchorMenuProps {
    className?: string;
    scrollContainerId: string;
    preventUrlHash?: boolean;
    children: any;
    storyBookMockContent?: boolean;
}

const AnchorMenu = ({
    children,
    className,
    preventUrlHash = true,
    scrollContainerId,
    storyBookMockContent = false,
}: IAnchorMenuProps) => {
    const scrollContainer: HTMLElement | null = document.getElementById(scrollContainerId);
    const targetOffset = window.innerHeight / 2;

    const handlePreventUrlHash = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
    };

    return (
        <Anchor
            className={`${styles.anchorMenu} ${className}`}
            getContainer={scrollContainer ? () => scrollContainer : undefined}
            onClick={preventUrlHash ? handlePreventUrlHash : undefined}
            targetOffset={targetOffset}
        >
            {children}
            {storyBookMockContent && (
                <>
                    <Link href="#Blank1" title="Blank1withLongText" />
                    <Link href="#Blank2" title="Blank2" />
                    <Link href="#Blank3" title="Blank3" />
                    <Link href="#Blank4" title="Blank4" />
                    <Link href="#Blank5" title="Blank5" />
                </>
            )}
        </Anchor>
    );
};

export default AnchorMenu;
