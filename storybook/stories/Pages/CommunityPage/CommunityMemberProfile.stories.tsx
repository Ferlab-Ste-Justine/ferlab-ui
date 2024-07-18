import React from 'react';
import { Meta } from '@storybook/react';
import CommunityMemberProfilePage from '@ferlab/ui/core/pages/CommunityPage/CommunityMemberProfilePage';

export default {
    title: '@ferlab/Pages/Community/Profile',
    component: CommunityMemberProfilePage,
    decorators: [(Story) => <Story />],
} as Meta;

const props = {
    banner: {
        background: 'background',
        canEditProfile: false,
        navigate: {
            community: () => console.log("navigate > community"),
            profile: () => console.log("navigate > profile"),
        },
    },
    loading: false,
    user: {
        accepted_terms: true,
        areas_of_interest: ['bladder exstrophy-epispadias complex', 'congenital diaphragmatic hernia'],
        commercial_use_reason: 'true',
        completed_registration: true,
        config: {},
        creation_date: new Date('2020-05-12T23:50:21.817Z'),
        email: 'john.doe@gmail.com',
        first_name: 'John',
        id: 'id',
        keycloak_id: 'keycloak_id',
        last_name: 'Doe',
        linkedin: 'linked.com',
        roles: ['Research', 'Patient'],
        understand_disclaimer: true,
        updated_date: new Date('2020-05-12T23:50:21.817Z'),
        website: 'website.com',
    },
};

export const CommunityMembersPageStory = () => <CommunityMemberProfilePage {...props} />;

