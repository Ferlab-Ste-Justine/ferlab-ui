import React from 'react';
import { render, screen } from '@testing-library/react';

import CommunityBanner, { DEFAULT_COMMUNITY_BANNER_DICTIONARY } from './CommunityBanner';

const dictionary = DEFAULT_COMMUNITY_BANNER_DICTIONARY;

describe('CommunityBanner', () => {
    test('make sure CommunityBanner render correctly', () => {
        const props = {
            background: 'background',
            canEditProfile: false,
            dictionary,
            navigate: {
                community: jest.fn(),
                profile: jest.fn(),
            },
        };

        render(<CommunityBanner {...props} />);
        expect(screen.getByText(dictionary.communityButton)).toBeTruthy();
    });

    test('make sure CommunityBanner render correctly in edit profile mode', () => {
        const props = {
            background: 'background',
            canEditProfile: true,
            dictionary,
            navigate: {
                community: jest.fn(),
                profile: jest.fn(),
            },
        };

        render(<CommunityBanner {...props} />);
        expect(screen.getByText(dictionary.communityButton)).toBeTruthy();
        expect(screen.getByText(dictionary.editProfile)).toBeTruthy();
    });
});
