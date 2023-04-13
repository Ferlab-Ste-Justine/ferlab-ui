import ResizableGridLayout, {TSerializedResizableGridLayoutConfig, IResizableGridLayoutConfig} from '@ferlab/ui/layout/ResizableGridLayout';
import GridCard, { GridCardHeader } from '@ferlab/ui/view/v2/GridCard';
import { Meta } from "@storybook/react/types-6-0";
import React from "react";

import styles from './ResizableGridLayout.module.scss';

const GridCardItem = ({ id }: { id: string }) => (
    <GridCard 
        wrapperClassName={styles.wrapper}
        theme="shade" 
        resizable
        title={
                <GridCardHeader
                id={id}
                title={`GridCard Header ${id}`}
                withHandle
                />
        }
        content={<div style={{height: "100%", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{id}</div>} 
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

export default {
    title: "@ferlab/Layout/ResizableGridLayout",
    component: ResizableGridLayout,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const ResizableGridStory = () => (
    <>
        <h3>Resizable Grid Story</h3>
        <div>
            <ResizableGridLayout 
              defaultLayouts={getDefaultLayouts()}
              layouts={getDefaultLayouts()}
              onReset={(layouts: TSerializedResizableGridLayoutConfig[]) => {
                console.log('reset layout');
              }}
              onConfigUpdate={(layouts: TSerializedResizableGridLayoutConfig[]) => {
                console.log('update layouts');
              }}
            />
        </div>
    </>
);


export const ResizableGridWithUserConfigStory = () => (
    <>
        <h3>Resizable Grid Story</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResizableGridLayout 
              defaultLayouts={getDefaultLayouts()}
              layouts={getSerializedLayout()}
              onReset={(layouts: TSerializedResizableGridLayoutConfig[]) => {
                console.log('reset layout');
              }}
              onConfigUpdate={(layouts: TSerializedResizableGridLayoutConfig[]) => {
                console.log('update layouts');
              }}
            />
        </div>
    </>
);