import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CavaticaAnalyse, { DEFAULT_CAVATICA_ANALYSE_DICTIONARY } from './CavaticaAnalyse';
import { CAVATICA_ANALYSE_STATUS, PASSPORT_AUTHENTIFICATION_STATUS } from './type';

const dictionary = DEFAULT_CAVATICA_ANALYSE_DICTIONARY;

describe('Cavatica Analyse', () => {
    test('make sure Cavatica Analyse render correctly', () => {
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
                bulkImportData: {
                    authorizedFiles: [],
                    files: [],
                    loading: false,
                    status: CAVATICA_ANALYSE_STATUS.analyzed,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: true,
                },
            },
            createProjectModalProps: {
                cavatica: {
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
                fetchBillingGroups: jest.fn(),
                fetchProjects: jest.fn(),
                handleCloseModal: jest.fn(),
                handleErrorModalReset: jest.fn(),
                handleSubmit: jest.fn(),
                onCancel: jest.fn(),
            },
            dictionary,
            handleBeginAnalyse: jest.fn(),
            handleConnection: jest.fn(),
            handleFilesAndFolders: jest.fn(),
            handleImportBulkData: jest.fn(),
            handleResetErrors: jest.fn(),
            setCavaticaBulkImportDataStatus: jest.fn(),
        };

        render(<CavaticaAnalyse {...props} />);
        const button = screen.getByRole('button', { name: dictionary.buttonText });
        expect(button).toBeTruthy();
    });

    test('make sure Cavatica Analyse works with a disconnect user', () => {
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
                bulkImportData: {
                    authorizedFiles: [],
                    files: [],
                    loading: false,
                    status: CAVATICA_ANALYSE_STATUS.analyzed,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: true,
                },
            },
            createProjectModalProps: {
                cavatica: {
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
                fetchBillingGroups: jest.fn(),
                fetchProjects: jest.fn(),
                handleCloseModal: jest.fn(),
                handleErrorModalReset: jest.fn(),
                handleSubmit: jest.fn(),
                onCancel: jest.fn(),
            },
            dictionary,
            handleBeginAnalyse: jest.fn(),
            handleConnection: jest.fn(),
            handleFilesAndFolders: jest.fn(),
            handleImportBulkData: jest.fn(),
            handleResetErrors: jest.fn(),
            setCavaticaBulkImportDataStatus: jest.fn(),
        };

        render(<CavaticaAnalyse {...props} />);

        const button = screen.getByRole('button', { name: dictionary.buttonText });
        expect(button).toBeTruthy();

        fireEvent.click(button, {});
        expect(props.setCavaticaBulkImportDataStatus).toHaveBeenCalled();
    });

    test('make sure Cavatica Analyse works with a connected user', () => {
        const props = {
            cavatica: {
                authentification: {
                    error: false,
                    loading: true,
                    status: PASSPORT_AUTHENTIFICATION_STATUS.connected,
                },
                billingGroups: {
                    data: [],
                    error: true,
                    loading: false,
                },
                bulkImportData: {
                    authorizedFiles: [],
                    files: [],
                    loading: false,
                    status: CAVATICA_ANALYSE_STATUS.analyzed,
                },
                projects: {
                    data: [],
                    error: false,
                    loading: true,
                },
            },
            createProjectModalProps: {
                cavatica: {
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
                fetchBillingGroups: jest.fn(),
                fetchProjects: jest.fn(),
                handleCloseModal: jest.fn(),
                handleErrorModalReset: jest.fn(),
                handleSubmit: jest.fn(),
                onCancel: jest.fn(),
            },
            dictionary,
            handleBeginAnalyse: jest.fn(),
            handleConnection: jest.fn(),
            handleFilesAndFolders: jest.fn(),
            handleImportBulkData: jest.fn(),
            handleResetErrors: jest.fn(),
            setCavaticaBulkImportDataStatus: jest.fn(),
        };

        render(<CavaticaAnalyse {...props} />);

        const button = screen.getByRole('button', { name: dictionary.buttonText });
        expect(button).toBeTruthy();

        fireEvent.click(button, {});
        expect(props.handleBeginAnalyse).toHaveBeenCalled();
    });
});
