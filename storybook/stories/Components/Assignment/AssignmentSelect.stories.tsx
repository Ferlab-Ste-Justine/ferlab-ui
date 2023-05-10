import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import AssignementsSelect, { TAssignmentsSelect } from '@ferlab/ui/components/Assignments/AssignmentsSelect';
import { TPractitionnerInfo } from '@ferlab/ui/components/Assignments/types';

export default {
    title: '@ferlab/Components/Assignments/AssignmentsSelect',
    component: AssignementsSelect,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const AssignmentsSelectPropsStory = ({
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
    props: TAssignmentsSelect;
}) => (
    <>
        <h3>{storyTitle}</h3>
       <AssignementsSelect
            handleSelect={handleSelect}
            options={options}
            assignedPractionnerRoles={assignedPractionnerRoles}
            visibleOptions={true}
        />
    </>
);

export const VisibleOption = AssignmentsSelectPropsStory.bind({});
VisibleOption.args = {
    storyTitle: 'Assignment Select',
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
    handleSelect: ([]) => {},
    assignedPractionnerRoles: [],
};
