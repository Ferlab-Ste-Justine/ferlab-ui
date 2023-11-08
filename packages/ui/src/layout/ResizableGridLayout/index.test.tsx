/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import GridCard, { GridCardHeader } from '../../view/v2/GridCard';

import {
    deserialize,
    hasLayout,
    isLayoutConfigEqual,
    isPrisitine,
    serialize,
    serializeConfigToLayouts,
    serializeLayoutsToConfig,
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

describe('ResizableGridLayout', () => {
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

    test('isPristine can compare two IResizableGridLayoutConfig', () => {
        const defaultConfigs = [
            {
                base: {
                    h: 3,
                    minh: 3,
                    minw: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 4,
                    w: 6,
                    x: 6,
                },
                title: 'card 1',
            },
        ];

        const configs = [
            {
                base: {
                    h: 3,
                    minh: 3,
                    minw: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 4,
                    moved: false, // default value added by RCL
                    static: false, // default value added by RCL
                    w: 6,
                    x: 6,
                },
                title: 'card 1',
            },
        ];

        const configs2 = [
            {
                base: {
                    h: 3,
                    minh: 3,
                    minw: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 5, // changed
                    w: 6,
                    x: 10, // changed
                },
                title: 'card 1',
            },
        ];

        expect(isPrisitine(defaultConfigs, configs)).toBeTruthy();
        expect(isPrisitine(defaultConfigs, configs2)).toBeFalsy();
    });

    test('isLayoutConfigEqual can compare configs to allLayouts object', () => {
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
                    isBounded: undefined,
                    isDraggable: undefined,
                    isResizable: undefined,
                    maxH: undefined,
                    maxW: undefined,
                    minH: 3,
                    minW: 3,
                    moved: false,
                    resizeHandles: undefined,
                    static: false,
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

        const config1 = [
            {
                base: {
                    h: 3,
                    minh: 3,
                    minw: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 10,
                    moved: false, // default value added by RCL
                    static: false, // default value added by RCL
                    w: 10,
                    x: 10,
                    y: 0,
                },
                title: 'card 1',
            },
        ];

        const config2 = [
            {
                base: {
                    h: 3,
                    minh: 3,
                    minw: 3,
                    w: 6,
                    x: 0,
                    y: 0,
                },
                component: <GridCardItem id="card_1" />,
                id: 'card_1',
                md: {
                    h: 4,
                    moved: false, // default value added by RCL
                    static: false, // default value added by RCL
                    w: 6,
                    x: 6,
                },
                title: 'card 1',
            },
        ];

        expect(isLayoutConfigEqual(layouts, config1)).toBeTruthy();
        expect(isLayoutConfigEqual(layouts, config2)).toBeFalsy();
    });
});
