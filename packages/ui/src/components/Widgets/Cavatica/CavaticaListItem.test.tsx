import React from 'react';
import { render, screen } from '@testing-library/react';

import CavaticaListItem from './CavaticaListItem';

const dictionary = {
    membersCount: (count: number) => `${count} members`,
};

describe('CavaticaListItem', () => {
    test('make sure CavaticaListItem render correctly', () => {
        const props = {
            cavaticaUrl: 'cavaticaUrl',
            dictionary,
            project: {
                category: 'PRIVATE',
                created_by: 'mock',
                created_on: '2023-12-20T18:37:08Z',
                href: 'https://cavatica-api.sbgenomics.com/v2/projects/mock/project1',
                id: 'mock/project1',
                memberCount: 4,
                modified_on: '2023-12-20T18:37:08Z',
                name: 'project1',
            },
        };

        render(<CavaticaListItem {...props} />);
        expect(screen.getByText(props.project.name)).toBeTruthy();
        expect(screen.getByText(dictionary.membersCount(props.project.memberCount))).toBeTruthy();
    });
});
