import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { PASSPORT_AUTHENTIFICATION_STATUS } from './type';
import CavaticaWidget, { CAVATICA_API_ERROR_TYPE, DEFAULT_CAVATICA_WIDGET_DICTIONARY } from '.';

const dictionary = DEFAULT_CAVATICA_WIDGET_DICTIONARY;

describe('CavaticaWidget', () => {
    test('make sure CavaticaWidget render correctly when loading', () => {
        const props = {
            cavatica: {
                authentification: {
                    error: false,
                    loading: true,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: true,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: true,
                },
            },
            cavaticaUrl: 'cavaticaUrl',
            createProjectModalProps: {
                handleSubmit: jest.fn(),
            },
            dictionary,
            handleConnection: jest.fn(),
            handleDisconnection: jest.fn(),
            handleErrorModalReset: jest.fn(),
            id: '1',
        };

        render(
            <BrowserRouter>
                <CavaticaWidget {...props} />
            </BrowserRouter>,
        );
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.findAllByRole('loading')).toBeTruthy();
    });

    test('make sure CavaticaWidget render correctly when disconnected', () => {
        const props = {
            cavatica: {
                authentification: {
                    error: false,
                    loading: false,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.disconnected,
                },
                billingGroups: {
                    data: [],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: false,
                },
            },
            cavaticaUrl: 'cavaticaUrl',
            createProjectModalProps: {
                handleSubmit: jest.fn(),
            },
            dictionary,
            handleConnection: jest.fn(),
            handleDisconnection: jest.fn(),
            handleErrorModalReset: jest.fn(),
            id: '1',
        };

        render(
            <BrowserRouter>
                <CavaticaWidget {...props} />
            </BrowserRouter>,
        );
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.connectCard?.action)).toBeTruthy();
        expect(screen.getByText(dictionary.connectCard?.description)).toBeTruthy();

        expect(props.handleConnection).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(dictionary.connectCard.action), {});
        expect(props.handleConnection).toHaveBeenCalled();
    });

    test('make sure CavaticaWidget render correctly when connected', () => {
        const props = {
            cavatica: {
                authentification: {
                    error: false,
                    loading: false,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.connected,
                },
                billingGroups: {
                    data: [
                        {
                            href: 'https://cavatica-api.sbgenomics.com/v2/billing/groups/mock_id',
                            id: 'mock_id',
                            name: 'Pilot Funds (mock)',
                        },
                    ],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [
                        {
                            category: 'PRIVATE',
                            created_by: 'mock',
                            created_on: '2023-12-20T18:37:08Z',
                            href: 'https://cavatica-api.sbgenomics.com/v2/projects/mock/project1',
                            id: 'mock/project1',
                            memberCount: 4,
                            modified_on: '2023-12-20T18:37:08Z',
                            name: 'project1',
                        },
                        {
                            category: 'PRIVATE',
                            created_by: 'mock',
                            created_on: '2023-12-20T18:37:08Z',
                            href: 'https://cavatica-api.sbgenomics.com/v2/projects/mock/project2',
                            id: 'mock/project2',
                            memberCount: 2,
                            modified_on: '2023-12-20T18:37:08Z',
                            name: 'project2',
                        },
                    ],
                    error: false,
                    loading: false,
                },
            },
            cavaticaUrl: 'cavaticaUrl',
            createProjectModalProps: {
                handleSubmit: jest.fn(),
            },
            dictionary,
            handleConnection: jest.fn(),
            handleDisconnection: jest.fn(),
            handleErrorModalReset: jest.fn(),
            id: '1',
        };

        render(
            <BrowserRouter>
                <CavaticaWidget {...props} />
            </BrowserRouter>,
        );
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.connectedNotice)).toBeTruthy();
        expect(screen.getByText(dictionary.disconnect)).toBeTruthy();
        expect(screen.getByText(dictionary.newProject)).toBeTruthy();

        expect(props.handleDisconnection).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(dictionary.disconnect), {});
        expect(props.handleDisconnection).toHaveBeenCalled();
    });

    test('make sure CavaticaWidget render correctly when connected with an empty list of projects', () => {
        const props = {
            cavatica: {
                authentification: {
                    error: false,
                    loading: false,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.connected,
                },
                billingGroups: {
                    data: [
                        {
                            href: 'https://cavatica-api.sbgenomics.com/v2/billing/groups/mock_id',
                            id: 'mock_id',
                            name: 'Pilot Funds (mock)',
                        },
                    ],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: false,
                },
            },
            cavaticaUrl: 'cavaticaUrl',
            createProjectModalProps: {
                handleSubmit: jest.fn(),
            },
            dictionary,
            handleConnection: jest.fn(),
            handleDisconnection: jest.fn(),
            handleErrorModalReset: jest.fn(),
            id: '1',
        };

        render(
            <BrowserRouter>
                <CavaticaWidget {...props} />
            </BrowserRouter>,
        );
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.connectedNotice)).toBeTruthy();
        expect(screen.getByText(dictionary.disconnect)).toBeTruthy();
        expect(screen.getByText(dictionary.firstProject)).toBeTruthy();
    });

    test('make sure CavaticaWidget render correctly when in error', () => {
        const props = {
            cavatica: {
                authentification: {
                    error: true,
                    loading: false,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.unknown,
                },
                billingGroups: {
                    data: [],
                    error: false,
                    loading: false,
                },
                projects: {
                    data: [],
                    error: CAVATICA_API_ERROR_TYPE.fetch,
                    loading: false,
                },
            },
            cavaticaUrl: 'cavaticaUrl',
            createProjectModalProps: {
                handleSubmit: jest.fn(),
            },
            dictionary,
            handleConnection: jest.fn(),
            handleDisconnection: jest.fn(),
            handleErrorModalReset: jest.fn(),
            id: '1',
        };

        render(
            <BrowserRouter>
                <CavaticaWidget {...props} />
            </BrowserRouter>,
        );
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.error.fetch.title)).toBeTruthy();
    });
});
