import React from 'react';
import ReactDom from 'react-dom';

import { Meta, StoryObj } from '@storybook/react';
import AssignmentsFilter, { TAssignmentsFilter } from '@ferlab/ui/core/components/Assignments/AssignmentsFilter';
import { TPractitionnerInfo } from '@ferlab/ui/core/components/Assignments/types';

export default {
    title: '@ferlab/Components/Assignments/AssignmentsFilter',
    component: AssignmentsFilter,
} as Meta<typeof AssignmentsFilter>;


type Story = StoryObj<typeof AssignmentsFilter>;

console.log('>>> REACT VERSION : ', React.version);
console.log('>>> REACT DOM Version : ', ReactDOM.version);


// const AssignmentsFilterPropsStory = ({
//     storyTitle,
//     options,
//     //handleSelect,
//     //assignedPractionnerRoles,
//     ...props
// }: {
//     storyTitle: string;
//     options: TPractitionnerInfo[];
//     handleSelect: (practitionerRoles_ids: string[]) => void;
//     assignedPractionnerRoles: string[];
//     props: TAssignmentsFilter;
// }) => (
//     <>
//         <h3>{storyTitle}</h3>
//        <AssignmentsFilter
//             options={options}
//         />
//     </>
// );

export const Default: Story = {
   // storyTitle: 'Assignment Filter',
    args: {
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
    },
};
