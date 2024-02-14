import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, getByText, render, screen } from '@testing-library/react';

import { DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY } from './CavaticaCreateProjectModal';
import CavaticaCreateProjectModal from './CavaticaCreateProjectModal';

const dictionary = DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY;

describe('CavaticaCreateProjectModal', () => {
    test('make sure CavaticaCreateProjectModal render correctly with empty billing groups', () => {
        const props = {
            cavatica: {
                billingGroups: {
                    data: [],
                    loading: false,
                },
                projects: {
                    data: [],
                    loading: false,
                },
            },
            dictionary,
            fetchBillingGroups: jest.fn(),
            fetchProjects: jest.fn(),
            handleCloseModal: jest.fn(),
            handleErrorModalReset: jest.fn(),
            handleSubmit: jest.fn(),
            onCancel: jest.fn(),
            open: true,
        };

        render(
            <BrowserRouter>
                <CavaticaCreateProjectModal {...props} />
            </BrowserRouter>,
        );
        expect(screen.getAllByText(dictionary.title).length).toBe(2);
        expect(screen.getByText(dictionary.billingGroup.label)).toBeTruthy();

        fireEvent.click(screen.getByText(dictionary.cancelText), {});
        expect(props.onCancel).toHaveBeenCalled();
    });

    test('make sure CavaticaCreateProjectModal render correctly with billing groups', () => {
        const props = {
            cavatica: {
                billingGroups: {
                    data: [
                        {
                            href: 'href',
                            id: 'id',
                            name: 'Pilot Funds (mock)',
                        },
                        {
                            href: 'href',
                            id: 'id2',
                            name: 'Pilot Funds 2 (mock)',
                        },
                    ],
                    loading: false,
                },
                projects: {
                    data: [],
                    loading: false,
                },
            },
            dictionary,
            fetchBillingGroups: jest.fn(),
            fetchProjects: jest.fn(),
            handleCloseModal: jest.fn(),
            handleErrorModalReset: jest.fn(),
            handleSubmit: jest.fn(),
            open: true,
        };

        render(
            <BrowserRouter>
                <CavaticaCreateProjectModal {...props} />
            </BrowserRouter>,
        );

        expect(screen.getAllByText(dictionary.title).length).toBe(2);
        expect(screen.getByText(dictionary.billingGroup.label)).toBeTruthy();
    });
});
