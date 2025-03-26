import PageHeader, { IPageHeader } from '@ferlab/ui/core/layout/PageHeader';
import { Meta } from '@storybook/react';
import React from 'react';
import { FileSearchOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default {
    title: '@ferlab/Layout/PageHeader',
    component: PageHeader,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const PageHeaderStory = ({ storyTitle, ...props }: { storyTitle: string; props: IPageHeader }) => (
    <>
        <h3>{storyTitle}</h3>
        <PageHeader {...props} />
    </>
);

export const BasicPageHeader = PageHeaderStory.bind({});
BasicPageHeader.args = {
    title: 'Title',
};

export const BackButtonPageHeader = PageHeaderStory.bind({});
BackButtonPageHeader.args = {
    title: 'Title',
    onBackButton: () => alert('Back button clicked'),
};

export const IconPageHeader = PageHeaderStory.bind({});
IconPageHeader.args = {
    title: 'Title',
    icon: <FileSearchOutlined />,
};

export const SubtitlePageHeader = PageHeaderStory.bind({});
SubtitlePageHeader.args = {
    title: 'Title',
    subtitle: 'Subtitle',
};

export const AllPropsPageHeader = PageHeaderStory.bind({});
AllPropsPageHeader.args = {
    title: (
        <>
            Title <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px' }} />
        </>
    ),
    icon: <FileSearchOutlined />,
    onBackButton: () => alert('Back button clicked'),
    subtitle: 'Subtitle',
};
