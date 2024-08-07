import React from 'react';
import { render, screen } from '@testing-library/react';

import CommunityAvatarHeader from './CommunityAvatarHeader';

const dictionary = {};

describe('CommunityAvatarHeader', () => {
    test('make sure CommunityAvatarHeader render correctly', () => {
        const props = {
            dictionary,
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

        render(<CommunityAvatarHeader {...props} />);
        expect(screen.getByText('John Doe')).toBeTruthy();
    });
});
