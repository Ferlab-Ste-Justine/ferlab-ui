import React from 'react';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { render, screen } from '@testing-library/react';

import AuthorizedStudiesWidget, {
    DEFAULT_AUTHORIZED_WIDGET_DICTIONARY,
    FENCE_AUTHENTIFICATION_STATUS,
    IFenceService,
} from '.';

const authorizedStudies = {
    error: false,
    loading: false,
    studies: [
        {
            authorized_controlled_files_count: 9152,
            study_code: 'STUDY_CODE_1',
            study_id: 'STUDY_ID_1',
            title: 'Title 1',
            total_controlled_files_count: 9152,
            total_files_count: 9152,
            total_uncontrolled_files_count: 0,
            user_acl_in_study: ['xxxxx1.x1', 'xxxxx2.x2'],
        },
        {
            authorized_controlled_files_count: 682,
            study_code: 'STUDY_CODE_2',
            study_id: 'STUDY_ID_2',
            title: 'Title 2',
            total_controlled_files_count: 12679,
            total_files_count: 16735,
            total_uncontrolled_files_count: 4056,
            user_acl_in_study: ['xxxxx3.x3'],
        },
    ],
};

const services: IFenceService[] = [
    {
        fence: 'fence1',
        icon: <PlusCircleFilled height={45} width={45} />,
        name: 'Fence 1',
        onConnectToFence: () => jest.fn(),
        onDisconnectFromFence: () => jest.fn(),
    },
    {
        fence: 'fence2',
        icon: <MinusCircleFilled height={45} width={45} />,
        name: 'Fence 2',
        onConnectToFence: () => jest.fn(),
        onDisconnectFromFence: () => jest.fn(),
    },
];

const queryProps = {
    fileIndex: 'file-index',
    participantIndex: 'participant-index',
    queryBuilderId: 'query-build-id',
    to: 'route/',
};

const dictionary = DEFAULT_AUTHORIZED_WIDGET_DICTIONARY;

describe('AuthorizedStudiesWidget', () => {
    test('make sure AuthorizedStudiesWidget can render the spinner if fence status are unknow', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.unknown,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.unknown,
                },
            ],
            id: '1',
            queryProps,
            services,
        };

        render(<AuthorizedStudiesWidget {...props} />);
        expect(screen.findAllByRole('loading')).toBeTruthy();
    });

    test('make sure AuthorizedStudiesWidget can render the connect content if fence status are disconnected', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.disconnected,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.disconnected,
                },
            ],
            id: '1',
            queryProps,
            services,
        };

        render(<AuthorizedStudiesWidget {...props} />);
        expect(screen.getByText(dictionary.authentification.action)).toBeTruthy();
        expect(screen.getByText(dictionary.authentification.description)).toBeTruthy();
    });

    test('make sure AuthorizedStudiesWidget can render a list of authorized studies', () => {
        const props = {
            authorizedStudies,
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.connected,
                },
                {
                    acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.connected,
                },
            ],
            id: '1',
            queryProps,
            services,
        };

        render(<AuthorizedStudiesWidget {...props} />);
        expect(screen.getByText(dictionary.manageConnections)).toBeTruthy();
        expect(screen.getByText(dictionary.connectedNotice)).toBeTruthy();
        expect(screen.queryAllByText(dictionary.list.authorization)).toHaveLength(2);
        expect(screen.queryAllByText(dictionary.list.of)).toHaveLength(2);
        expect(screen.queryAllByText(dictionary.list.files)).toHaveLength(2);
        expect(screen.queryAllByText(dictionary.list.dataGroups)).toHaveLength(2);
    });

    test('make sure AuthorizedStudiesWidget can render an empty list of authorized studies', () => {
        const props = {
            authorizedStudies: {
                error: false,
                loading: false,
                studies: [],
            },
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.connected,
                },
                {
                    acl: ['xxxxx1.x1', 'xxxxx2.x2', 'xxxxx3.x3'],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.connected,
                },
            ],
            id: '1',
            queryProps,
            services,
        };

        render(<AuthorizedStudiesWidget {...props} />);
        expect(screen.getByText(dictionary.manageConnections)).toBeTruthy();
        expect(screen.getByText(dictionary.noAvailableStudies)).toBeTruthy();
    });

    test('make sure AuthorizedStudiesWidget can render an error message', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: true,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.unknown,
                },
                {
                    acl: [],
                    error: true,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUTHENTIFICATION_STATUS.unknown,
                },
            ],
            id: '1',
            queryProps,
            services,
        };

        render(<AuthorizedStudiesWidget {...props} />);
        expect(screen.getByText(dictionary.error.title)).toBeTruthy();
        expect(screen.getByText(dictionary.error.disconnect.start, { exact: false })).toBeTruthy();
        expect(screen.getByText(dictionary.error.disconnect.end, { exact: false })).toBeTruthy();
        expect(screen.getByText(dictionary.error.contactSupport)).toBeTruthy();
    });
});
