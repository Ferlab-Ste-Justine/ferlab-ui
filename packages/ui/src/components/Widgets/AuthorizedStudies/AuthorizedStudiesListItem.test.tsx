import React from 'react';
import { render, screen } from '@testing-library/react';

import { numberWithCommas } from '../../../utils/numberUtils';

import AuthorizedStudiesListItem from './AuthorizedStudiesListItem';

const data = {
    authorized_controlled_files_count: 9152,
    study_code: 'STUDY_CODE_1',
    study_id: 'STUDY_ID_1',
    title: 'Title 1',
    total_authorized_files_count: 9152,
    total_files_count: 9152,
    user_acl_in_study: ['xxxxx1.x1', 'xxxxx2.x2'],
};

const dictionary = {
    authorization: 'authorization',
    dataGroups: 'dataGroups',
    files: 'files',
    of: 'of',
};

const queryProps = {
    fileIndex: 'file-index',
    participantIndex: 'participant-index',
    queryBuilderId: 'query-build-id',
    to: 'route/',
};

describe('AuthorizedStudiesListItem', () => {
    test('make sure AuthorizedStudiesListItem render correctly', () => {
        const props = {
            data,
            dictionary,
            queryProps,
        };

        render(<AuthorizedStudiesListItem {...props} />);

        // text
        expect(screen.getByText(dictionary.authorization)).toBeTruthy();
        expect(screen.getByText(dictionary.of)).toBeTruthy();
        expect(screen.getByText(dictionary.dataGroups)).toBeTruthy();
        expect(screen.getByText(dictionary.files)).toBeTruthy();

        // computed values
        expect(screen.queryAllByText(numberWithCommas(data.total_authorized_files_count))).toHaveLength(2);
        expect(screen.queryAllByText(numberWithCommas(data.total_files_count))).toHaveLength(2);
        expect(screen.getByText(data.user_acl_in_study.join(', '))).toBeTruthy();
    });
});
