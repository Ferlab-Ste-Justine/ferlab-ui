import React from 'react';
import { render, screen } from '@testing-library/react';

import CommunityMembersPage, { DEFAULT_COMMINUTY_PAGE_DICTIONARY, ISearchParams } from '.';

const dictionary = DEFAULT_COMMINUTY_PAGE_DICTIONARY;

describe('CommunityMembersPage', () => {
    test('make sure CommunityMembersPage render correctly', () => {
        const props = {
            activeFilter: {},
            dictionary,
            handleActiveFilter: jest.fn(),
            handlePageChange: jest.fn(),
            loading: false,
            options: {
                interests: [
                    { label: 'interest1', value: 'interest1' },
                    { label: 'interest2', value: 'interest2' },
                ],
                roles: [
                    { label: 'role1', value: 'role1' },
                    { label: 'role2', value: 'role2' },
                ],
                usages: [
                    { label: 'usage1', value: 'usage1' },
                    { label: 'usage2', value: 'usage2' },
                ],
            },
            pageSize: 0,
            renderMember: jest.fn(),
            totalPage: 0,
            users: [],
        };

        render(<CommunityMembersPage {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
    });
});
