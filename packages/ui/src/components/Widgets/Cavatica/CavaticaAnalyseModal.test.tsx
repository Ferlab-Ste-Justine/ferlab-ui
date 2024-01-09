import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import CavaticaAnalyseModal, { DEFAULT_CAVATICA_ANALYSE_MODAL_DICTIONARY } from './CavaticaAnalyzeModal';

const dictionary = DEFAULT_CAVATICA_ANALYSE_MODAL_DICTIONARY;

const file = {
    access_urls: 'access_urls',
    acl: [],
    controlled_access: 'Registered',
    data_category: 'data_category',
    data_type: 'data_type',
    external_id: 'external_id',
    fhir_document_reference: 'fhir_document_reference',
    fhir_id: 'fhir_id',
    file_format: 'file_format',
    file_id: 'file_id',
    file_name: 'file_name',
    id: 'id',
    index: null,
    key: 'id',
    nb_biospecimens: 1,
    nb_participants: 1,
    repository: 'gen3',
    sequencing_experiment: {
        hits: {
            edges: [
                {
                    node: {
                        experiment_strategy: 'WXS',
                        platform: 'Illumina',
                    },
                },
            ],
        },
    },
    size: 122552,
    study: {
        study_code: 'study_code',
        study_id: 'study_id',
        study_name: 'Pediatric Brain Tumor Atlas: PNOC',
    },
};

describe('CavaticaAnalyseModal', () => {
    test('make sure CavaticaAnalyseModal render correctly', () => {
        const props = {
            bulkImportData: {
                authorizedFiles: [file],
                files: [file],
                loading: false,
            },
            dictionary,
            handleCreateProjectClick: jest.fn(),
            handleFilesAndFolders: jest.fn(),
            open: true,
            projects: {
                data: [],
                error: false,
                loading: false,
            },
        };

        render(
            <BrowserRouter>
                <CavaticaAnalyseModal {...props} />
            </BrowserRouter>,
        );
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.files.replace('{files}', `${1}`))).toBeTruthy();
    });
});
