import React from 'react';
import { render, screen } from '@testing-library/react';

import { CommunityMemberProfile, DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY } from './CommunityMemberProfile';

const dictionary = DEFAULT_COMMUNITY_MEMBER_PROFILE_DICTIONARY;

describe('CommunityMemberProfile', () => {
    test('make sure CommunityMemberProfile render correctly', () => {
        const props = {
            dictionary,
            options: {
                interests: [
                    {
                        label: 'Adolescent Idiopathic Scoliosis',
                        value: 'adolescent idiopathic scoliosis',
                    },
                    {
                        label: 'Bladder Exstrophy-Epispadias Complex',
                        value: 'bladder exstrophy-epispadias complex',
                    },
                    {
                        label: 'Congenital Diaphragmatic Hernia',
                        value: 'congenital diaphragmatic hernia',
                    },
                ],
                roles: [
                    {
                        label: 'Researcher',
                        value: 'research',
                    },
                    {
                        label: 'Healthcare Professional',
                        value: 'health',
                    },
                    {
                        label: 'Patient/Family Member',
                        value: 'patient',
                    },
                    {
                        label: 'Community Member',
                        value: 'community',
                    },
                ],
            },
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
                roles: ['research', 'patient'],
                understand_disclaimer: true,
                updated_date: new Date('2020-05-12T23:50:21.817Z'),
                website: 'website.com',
            },
        };

        render(<CommunityMemberProfile {...props} />);
        expect(screen.getByText(props.options.roles[0].label)).toBeTruthy();
        expect(screen.getByText(props.options.roles[2].label)).toBeTruthy();
        expect(screen.getByText(props.options.interests[1].label)).toBeTruthy();
        expect(screen.getByText(props.options.interests[2].label)).toBeTruthy();
        expect(screen.getByText(dictionary.linkedin)).toBeTruthy();
        expect(screen.getByText(dictionary.website)).toBeTruthy();
    });
});
