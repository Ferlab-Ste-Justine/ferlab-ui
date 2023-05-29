import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import AssignmentsFilter, { TAssignmentsFilter } from '@ferlab/ui/components/Assignments/AssignmentsFilter';
import { TPractitionnerInfo } from '@ferlab/ui/components/Assignments/types';

export default {
    title: '@ferlab/Components/Assignments/AssignmentsFilter',
    component: AssignmentsFilter,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const AssignmentsFilterPropsStory = ({
    storyTitle,
    options,
    handleSelect,
    assignedPractionnerRoles,
    ...props
}: {
    storyTitle: string;
    options: TPractitionnerInfo[];
    handleSelect: (practitionerRoles_ids: string[]) => void;
    assignedPractionnerRoles: string[];
    props: TAssignmentsFilter;
}) => (
    <>
        <h3>{storyTitle}</h3>
       <AssignmentsFilter
            options={options}
        />
    </>
);

export const Default = AssignmentsFilterPropsStory.bind({});
Default.args = {
    storyTitle: 'Assignment Filter',
    options: [
        {
            practitionerRoles_Id: 'PR01',
            name: [
                {
                    family: 'Family01',
                    given: ['given01'],
                },
            ],
            email: 'email1@ferlab.bio',
            ldm: 'LDM-01',
        },
        {
            practitionerRoles_Id: 'PR02',
            name: [
                {
                    family: 'Family02',
                    given: ['given02'],
                },
            ],
            email: 'email2@ferlab.bio',
            ldm: 'LDM-01',
        },
        {
            practitionerRoles_Id: 'PR03',
            name: [
                {
                    family: 'Family03',
                    given: ['given03'],
                },
            ],
            email: 'email3@ferlab.bio',
            ldm: 'LDM-03',
        },
    ],
};
