/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, screen } from '@testing-library/react';

import GridCard, { GridCardHeader } from '../../view/v2/GridCard';

import ResizableGridLayout, {
    deserialize,
    hasLayout,
    IResizableGridLayoutConfig,
    serialize,
    serializeConfigToLayouts,
    serializeLayoutsToConfig,
    TSerializedResizableGridLayoutConfig,
    updateConfig,
} from '.';

const GridCardItem = ({ id }: { id: string }) => (
    <GridCard
        content={
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                {id}
            </div>
        }
        resizable
        theme="shade"
        title={<GridCardHeader id={id} title={`GridCard Header ${id}`} withHandle />}
    />
);

const getDefaultLayouts = (): IResizableGridLayoutConfig[] => [
    {
        base: {
            h: 3,
            minH: 3,
            minW: 3,
            w: 6,
            x: 0,
            y: 0,
        },
        component: <GridCardItem id="card_1" />,
        id: 'card_1',
        title: 'Card 1',
    },
    {
        base: {
            h: 3,
            minH: 3,
            minW: 3,
            w: 5,
            x: 6,
            y: 0,
        },
        component: <GridCardItem id="card_2" />,
        id: 'card_2',
        title: 'Card 2',
    },
    {
        base: {
            h: 4,
            minH: 3,
            minW: 3,
            w: 6,
            x: 0,
            y: 3,
        },
        component: <GridCardItem id="card_3" />,
        id: 'card_3',
        title: 'Card 3',
    },
    {
        base: {
            h: 4,
            minH: 3,
            minW: 3,
            w: 5,
            x: 7,
            y: 3,
        },
        component: <GridCardItem id="card_4" />,
        id: 'card_4',
        title: 'Card 4',
    },
];

// card_3, card_4 are hidden
const getSerializedLayout = (): TSerializedResizableGridLayoutConfig[] => [
    {
        base: {
            h: 4,
            minH: 4,
            minW: 4,
            w: 4,
            x: 4,
            y: 0,
        },
        id: 'card_1',
        md: {
            h: 4,
            minH: 4,
            minW: 4,
            w: 4,
            x: 0,
            y: 0,
        },
        title: 'Card 1',
    },
    {
        base: {
            h: 4,
            minH: 4,
            minW: 4,
            w: 8,
            x: 8,
            y: 0,
        },
        id: 'card_2',
        title: 'Card 2',
    },
    {
        base: {
            h: 4,
            minH: 3,
            minW: 3,
            w: 6,
            x: 0,
            y: 4,
        },
        hidden: true,
        id: 'card_3',
        title: 'Card 3',
    },
    {
        base: {
            h: 4,
            minH: 3,
            minW: 3,
            w: 5,
            x: 6,
            y: 4,
        },
        hidden: true,
        id: 'card_4',
        title: 'Card 4',
    },
];

describe('ResizableGridLayout', () => {
    test('make sure resizable grid layout is rendered correctly', () => {
        const props = {
            defaultLayouts: getDefaultLayouts(),
            layouts: getDefaultLayouts(),
            onConfigUpdate: (_layouts: TSerializedResizableGridLayoutConfig[]) => {},
            onReset: (_layouts: TSerializedResizableGridLayoutConfig[]) => {},
        };
        render(<ResizableGridLayout {...props} />);

        expect(screen.getByText('card_1')).toBeTruthy();
        expect(screen.getByText('card_2')).toBeTruthy();
        expect(screen.getByText('card_3')).toBeTruthy();
        expect(screen.getByText('card_4')).toBeTruthy();
    });

    test('make sure resizable grid layout is rendered correctly with serialized data', () => {
        const props = {
            defaultLayouts: getDefaultLayouts(),
            layouts: getSerializedLayout(),
            onConfigUpdate: (_layouts: TSerializedResizableGridLayoutConfig[]) => {},
            onReset: (_layouts: TSerializedResizableGridLayoutConfig[]) => {},
        };
        render(<ResizableGridLayout {...props} />);
        expect(screen.getByText('card_1')).toBeTruthy();
        expect(screen.getByText('card_2')).toBeTruthy();
        expect(screen.queryByText('card_3')).toBeNull();
        expect(screen.queryByText('card_4')).toBeNull();
    });

    test('make sure serialize function return TSerializedResizableGridLayoutConfig[]', () => {
        const config = [
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                title: 'Card 1',
            },
        ];
        expect(serialize(config)).toEqual([
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                id: 'card_1',
                title: 'Card 1',
            },
        ]);
    });

    test('make sure deserialize function return a IResizableGridLayoutConfig[]', () => {
        const config = [
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                title: 'Card 1',
            },
        ];

        const serializedConfig = [
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                id: 'card_1',
                title: 'Card 1',
            },
        ];
        expect(deserialize(config, serializedConfig)).toEqual([
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                title: 'Card 1',
            },
        ]);
    });

    test('make sure serializeConfigToLayouts return a Layouts', () => {
        const config = [
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 10,
                    w: 10,
                    x: 10,
                },
                sm: {
                    h: 10,
                    w: 10,
                    x: 10,
                },
                title: 'Card 1',
            },
        ];
        expect(serializeConfigToLayouts(config)).toEqual({
            lg: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
            md: [
                {
                    h: 10,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
            ],
            sm: [
                {
                    h: 10,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
            ],
            xs: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
            xxs: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
        });
    });

    test('make sure serializeLayoutsToConfig return IResizableGridLayoutConfig[]', () => {
        const layouts = {
            lg: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
            md: [
                {
                    h: 10,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
            ],
            sm: [
                {
                    h: 10,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
            ],
            xs: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
            xxs: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
        };
        const configs = [
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 10,
                    w: 10,
                    x: 10,
                },
                sm: {
                    h: 10,
                    w: 10,
                    x: 10,
                },
                title: 'Card 1',
            },
        ];

        expect(serializeLayoutsToConfig(layouts, configs)).toEqual([
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                id: 'card_1',
                lg: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                md: {
                    h: 10,
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
                sm: {
                    h: 10,
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
                title: 'Card 1',
                xs: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                xxs: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            },
        ]);
    });

    test('make sure hasLayout can search through a layouts object', () => {
        const layouts = {
            lg: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
            md: [
                {
                    h: 10,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
            ],
            sm: [
                {
                    h: 10,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 10,
                    x: 10,
                    y: 0,
                },
            ],
            xs: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
            xxs: [
                {
                    h: 3,
                    i: 'card_1',
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
            ],
        };

        expect(hasLayout(layouts, 'card_1')).toBeTruthy();
        expect(hasLayout(layouts, 'unknow')).toBeFalsy();
    });

    test('make sure updateConfig change the correct field of IResizableGridLayoutConfig[] with the correct value', () => {
        const configs = [
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                title: 'Card 1',
            },
        ];

        expect(updateConfig(configs, 'card_1', 'hidden', true)).toEqual([
            {
                base: {
                    h: 3,
                    minH: 3,
                    minW: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                hidden: true,
                id: 'card_1',
                title: 'Card 1',
            },
        ]);
    });
});
