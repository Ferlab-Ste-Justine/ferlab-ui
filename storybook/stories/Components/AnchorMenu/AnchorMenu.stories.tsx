import React from 'react';
import { Meta } from '@storybook/react';
import AnchorMenu, { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';

export default {
    title: '@ferlab/Components/Menu/AnchorMenu',
    component: AnchorMenu,
    decorators: [(Story) => <Story />],
    argTypes: {
        className: {
            control: 'text',
        },
        scrollContainerId: {
            control: 'text',
        },
        preventUrlHash: {
            control: 'boolean',
        },
        links: {
            control: 'array',
        },
    },
} as Meta;

const scrollContainerId = 'scrollContainerId';
const links: IAnchorLink[] = [
    { href: '#Blank1', title: 'Blank1withVeryVeryVeryVeryVeryVeryVeryVeryLongText' },
    { href: '#Blank2', title: 'Blank2' },
    { href: '#Blank3', title: 'Blank3' },
    { href: '#Blank4', title: 'Blank4' },
    { href: '#Blank5', title: 'Blank5' },
];

const Blank = ({ id, title }: { id: string; title: string }) => (
    <div id={id} style={{ height: 800, width: 600, backgroundColor: 'white', margin: 20, padding: 20 }}>
        {title}
    </div>
);

export const AnchorMenuStory = () => (
    <>
        <h3>Anchor Menu Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div id={scrollContainerId} style={{ overflow: 'auto' }}>
                <div className="simplebar-content-wrapper">
                    {links.map(({ href, title }, index) => (
                        <Blank key={index} id={href.replace('#', '')} title={title} />
                    ))}
                </div>
            </div>
            <AnchorMenu links={links} scrollContainerId={scrollContainerId} />
        </div>
    </>
);

const hiddenLinks: IAnchorLink[] = [
    { href: '#Blank1', title: 'Blank1withVeryVeryVeryVeryVeryVeryVeryVeryLongText' },
    { href: '#Blank2', title: 'Blank2' },
    { href: '#Blank3', title: 'Blank3' },
    { href: '#Blank4', title: 'Blank4', hidden: true },
    { href: '#Blank5', title: 'Blank5', hidden: true },
];

export const AnchorMenuWithHiddenValueStory = () => (
    <>
        <h3>Anchor Menu With link 4 and 5 Hidden Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div id={scrollContainerId} style={{ overflow: 'auto' }}>
                <div className="simplebar-content-wrapper">
                    {hiddenLinks.map(({ href, title }, index) => (
                        <Blank key={index} id={href.replace('#', '')} title={title} />
                    ))}
                </div>
            </div>
            <AnchorMenu links={hiddenLinks} scrollContainerId={scrollContainerId} />
        </div>
    </>
);
