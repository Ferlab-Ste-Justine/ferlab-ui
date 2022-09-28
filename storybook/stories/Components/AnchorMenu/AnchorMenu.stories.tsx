import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import AnchorMenu, { IAnchorMenuProps } from '@ferlab/ui/components/AnchorMenu';

const Blank = ({ id }: { id: string }) => {
    return (
        <div id={id} style={{ height: 500, width: 500, backgroundColor: 'white', margin: 10, padding: 10 }}>
            {id}
        </div>
    );
};

export default {
    title: "@ferlab/Components/Menu/AnchorMenu",
    component: AnchorMenu,
    decorators: [(Story) => <Story/>],
    argTypes: {
        className: {
            control: 'text'
        },
        scrollContainerId: {
            control: 'text'
        },
        preventUrlHash: {
            control: 'boolean'
        },
        children: {
            control: 'any'
        },
    },
  } as Meta;

  const AnchorMenuStory = ({title, ...props} : {title: string, props: IAnchorMenuProps}) => (
    <>
        <h3>{title}</h3>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <div id={'scrollContainerId'}>
                <Blank id="Blank1"  />
                <Blank id="Blank2"   />
                <Blank id="Blank3"   />
                <Blank id="Blank4"  />
                <Blank id="Blank5"  />
            </div>
            <AnchorMenu {...props} />
        </div>
    </>
);

/* Basic */
export const AnchorMenuBasic = AnchorMenuStory.bind({});

AnchorMenuBasic.args = {
    title: 'Anchor Menu Basic',
    scrollContainerId: 'scrollContainerId',
    preventUrlHash: true,
    storyBookMockContent: true,
};

