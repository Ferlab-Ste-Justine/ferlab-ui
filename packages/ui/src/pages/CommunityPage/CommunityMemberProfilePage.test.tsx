import React from 'react';
import { render, screen } from '@testing-library/react';

import CommunityMemberProfilePage, {
    DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY,
} from './CommunityMemberProfilePage';

const dictionary = DEFAULT_COMMUNITY_MEMBER_PROFILE_PAGE_DICTIONARY;

describe('CommunityMemberProfilePage', () => {
    test('make sure CommunityMemberProfilePage render correctly', () => {
        const props = {
            banner: {
                background: 'background',
                canEditProfile: false,
                dictionary: dictionary.banner,
                navigate: {
                    community: jest.fn(),
                    profile: jest.fn(),
                },
            },
            dictionary,
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

        render(<CommunityMemberProfilePage {...props} />);
        expect(screen.getByText(dictionary.banner.communityButton)).toBeTruthy();
        expect(screen.getByText(dictionary.profile.roles.title)).toBeTruthy();
    });
});
