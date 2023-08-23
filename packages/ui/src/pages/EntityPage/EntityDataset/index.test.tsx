import React from 'react';
import { render, screen } from '@testing-library/react';

import EntityDataset from './index';

describe('EntityDataset Component', () => {
    const mockDescriptions = [
        { label: 'Label 1', value: 'Value 1' },
        { label: 'Label 2', value: 'Value 2' },
    ];

    const mockDictionnary = {
        files: 'Files',
        participants: 'Participants',
    };

    const mockProps = {
        descriptions: mockDescriptions,
        dictionnary: mockDictionnary,
        file_count: 10,
        header: 'Header',
        id: 'entity-dataset',
        loading: false,
        participant_count: 5,
        title: 'Entity Dataset Title',
    };

    it('renders without errors', () => {
        render(<EntityDataset {...mockProps} />);
    });

    it('renders the title when provided', () => {
        render(<EntityDataset {...mockProps} />);
        expect(screen.getByText('Entity Dataset Title')).toBeTruthy();
    });

    it('renders descriptions with labels and values', () => {
        render(<EntityDataset {...mockProps} />);
        mockDescriptions.forEach((description) => {
            expect(screen.getByText(description.label)).toBeTruthy();
            expect(screen.getByText(description.value)).toBeTruthy();
        });
    });

    it('renders file and participant counts', () => {
        render(<EntityDataset {...mockProps} />);
        expect(screen.getByText('10')).toBeTruthy();
        expect(screen.getByText('5')).toBeTruthy();
    });

    it('renders dictionnary labels for file and participant counts', () => {
        render(<EntityDataset {...mockProps} />);
        expect(screen.getByText('Participants')).toBeTruthy();
        expect(screen.getByText('Files')).toBeTruthy();
    });
});
