import StudySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/StudySpotIcon';
import EntityTitleLogo, { IEntityTitleLogo } from '@ferlab/ui/core/pages/EntityPage/EntityTitleLogo';
import { Meta } from '@storybook/react';
import React from 'react';

export default {
    title: '@ferlab/Pages/EntityPage/EntityTitleLogo',
    component: EntityTitleLogo,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityTitleLogoStory = ({ storyTitle, ...props }: { storyTitle: string; props: IEntityTitleLogo }) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityTitleLogo {...props} />
    </>
);

export const BasicEntityTitleLogo = EntityTitleLogoStory.bind({});
BasicEntityTitleLogo.args = {
    id: 'ID',
    title: 'Text',
    logo: <StudySpotIcon />,
    loading: false,
};
