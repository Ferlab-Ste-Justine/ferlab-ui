import React from 'react';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { render, screen } from '@testing-library/react';

import FencesAuthentificationModal from './FencesAuthentificationModal';
import { FENCE_AUHTENTIFICATION_STATUS, IFenceService } from '.';

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

const dictionary = {
    close: 'close',
    description: 'description',
    error: 'error',
    title: 'title',
};

describe('FencesAuthentificationModal', () => {
    test('make sure FencesAuthentificationModal render correctly when closed', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.connected,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.disconnected,
                },
            ],
            onCancel: jest.fn(),
            open: false,
            services,
        };

        render(<FencesAuthentificationModal {...props} />);
        expect(screen.queryAllByText(dictionary.title)).toHaveLength(0);
        expect(screen.queryAllByText(dictionary.description)).toHaveLength(0);
        expect(screen.queryAllByText(dictionary.close)).toHaveLength(0);
    });

    test('make sure FencesAuthentificationModal render correctly with connected fences', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.connected,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.connected,
                },
            ],
            onCancel: jest.fn(),
            open: true,
            services,
        };

        render(<FencesAuthentificationModal {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.description)).toBeTruthy();
        expect(screen.getByText(dictionary.close)).toBeTruthy();

        expect(screen.queryAllByRole('switch', { checked: true })).toHaveLength(2);
        expect(screen.queryAllByRole('switch', { checked: false })).toHaveLength(0);
    });
    test('make sure FencesAuthentificationModal render correctly with disconnected fences', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.disconnected,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.disconnected,
                },
            ],
            onCancel: jest.fn(),
            open: true,
            services,
        };

        render(<FencesAuthentificationModal {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.description)).toBeTruthy();
        expect(screen.getByText(dictionary.close)).toBeTruthy();

        expect(screen.queryAllByRole('switch', { checked: true })).toHaveLength(0);
        expect(screen.queryAllByRole('switch', { checked: false })).toHaveLength(2);
    });

    test('make sure FencesAuthentificationModal render correctly with connected and disconnected fences', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: false,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.connected,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.disconnected,
                },
            ],
            onCancel: jest.fn(),
            open: true,
            services,
        };

        render(<FencesAuthentificationModal {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.description)).toBeTruthy();
        expect(screen.getByText(dictionary.close)).toBeTruthy();

        expect(screen.queryAllByRole('switch', { checked: true })).toHaveLength(1);
        expect(screen.queryAllByRole('switch', { checked: false })).toHaveLength(1);
    });

    test('make sure FencesAuthentificationModal render correctly with errors in fences', () => {
        const props = {
            dictionary,
            fences: [
                {
                    acl: [],
                    error: true,
                    id: 'fence1',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.unknown,
                },
                {
                    acl: [],
                    error: false,
                    id: 'fence2',
                    loading: false,
                    status: FENCE_AUHTENTIFICATION_STATUS.disconnected,
                },
            ],
            onCancel: jest.fn(),
            open: true,
            services,
        };

        render(<FencesAuthentificationModal {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(dictionary.description)).toBeTruthy();
        expect(screen.getByText(dictionary.close)).toBeTruthy();
        expect(screen.getByText(dictionary.error)).toBeTruthy();

        expect(screen.queryAllByRole('switch', { checked: true })).toHaveLength(0);
        expect(screen.queryAllByRole('switch', { checked: false })).toHaveLength(2);
    });
});
