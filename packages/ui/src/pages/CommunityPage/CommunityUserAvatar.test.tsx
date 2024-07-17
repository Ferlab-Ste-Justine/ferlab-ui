import React from 'react';
import { render, screen } from '@testing-library/react';

import CommunityUserAvatar from './CommunityUserAvatar';

describe('CommunityUserAvatar', () => {
    test('make sure CommunityUserAvatar render correctly', () => {
        render(<CommunityUserAvatar />);
        expect(screen.getByRole('img')).toBeTruthy();
    });
});
