import React from 'react';
import { Meta } from '@storybook/react';
import CommunityMembersPage from '@ferlab/ui/core/pages/CommunityPage';
import { ISearchParams } from '@ferlab/ui/core/pages/CommunityPage';

export default {
    title: '@ferlab/Pages/Community/List',
    component: CommunityMembersPage,
    decorators: [(Story) => <Story />],
} as Meta;

const props = {
    handleActiveFilter: (searchParams: ISearchParams) => { console.log("searchParams", searchParams) },
    options: {
        roles: [
            {
                value: 'research',
                label: 'Researcher',
            },
            {
                value: 'health',
                label: 'Healthcare Professional',
            },
            {
                value: 'patient',
                label: 'Patient/Family Member',
            },
            {
                value: 'community',
                label: 'Community Member',
            },
        ]
    },
    handlePageChange: (page: number) => { console.log('page', page); },
    activeFilter: {},
    pageSize: 5,
    totalPage: 10,
    loading: false,
    totalMembers: 100,
    renderMember: (activeFilter: any, item: any) => (<div>{item.last_name} {item.last_name}</div>),
    users: [1,2,3,4,5,6,7,8,9,10].map((value) => ({
        accepted_terms: true,
        areas_of_interest: ['bladder exstrophy-epispadias complex', 'congenital diaphragmatic hernia'],
        commercial_use_reason: 'true',
        completed_registration: true,
        config: {},
        creation_date: new Date('2020-05-12T23:50:21.817Z'),
        email: `email_${value}@gmail.com`,
        first_name: `First_name ${value}`,
        id: `${value}`,
        keycloak_id: `keycloak_${value}`,
        last_name: `Last_name ${value}`,
        linkedin: 'linked.com',
        roles: ['Research', 'Patient'],
        understand_disclaimer: true,
        updated_date: new Date('2020-05-12T23:50:21.817Z'),
        website: 'website.com',
    })),
};

export const CommunityMembersPageStory = () => <CommunityMembersPage {...props} />;

