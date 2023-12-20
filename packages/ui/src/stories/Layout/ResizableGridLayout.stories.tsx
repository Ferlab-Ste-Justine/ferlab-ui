import React from "react";
import ResizableGridLayout, {TSerializedResizableGridLayoutConfig, IResizableGridLayoutConfig} from '@ferlab/ui/layout/ResizableGridLayout';
import { Meta } from "@storybook/react";
import ResizableGridCard from '@ferlab/ui/layout/ResizableGridLayout/ResizableGridCard';
import BarChart from "@ferlab/ui/components/Charts/Bar";
import PieChart from "@ferlab/ui/components/Charts/Pie";
import { aggregationToChartData } from '@ferlab/ui/layout/ResizableGridLayout/utils';


const GridCardItem = ({ type }: { type: string }) => {
    var buckets = [];
    var total =  Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < total; i++) {
        buckets.push({
            key: `random id_${i}`,
            doc_count: Math.floor(Math.random() * 100)+ 1
        })
    }

    const data = aggregationToChartData(buckets, total);

    return (
        <ResizableGridCard
            gridUID="storybook"
            theme="shade"
            loading={false}
            loadingType="spinner"
            headerTitle={"header title"}
            tsvSettings={{
                data: [data],
            }}
            modalContent={
                <>
                    {type == 'bar'? (
                        <BarChart
                        data={data}
                        axisLeft={{
                            legend: 'Data Types',
                            legendPosition: 'middle',
                            legendOffset: -128,
                        }}
                        tooltipLabel={(node: any) => node.data.id}
                        axisBottom={{
                            legend: '# of participants',
                            legendPosition: 'middle',
                            legendOffset: 35,
                        }}
                        margin={{
                            bottom: 45,
                            left: 140,
                            right: 12,
                            top: 12,
                        }}
                        layout="horizontal"
                        />
                    ): (
                        <PieChart
                            data={data}
                        />
                    )}
                </>
            }
            content={
                <div style={{height: '100%', 'width': '100%'}}>
                        <>
                            {type == 'bar'? (
                                <BarChart
                                data={data}
                                axisLeft={{
                                    legend: 'Data Types',
                                    legendPosition: 'middle',
                                    legendOffset: -128,
                                }}
                                tooltipLabel={(node: any) => node.data.id}
                                axisBottom={{
                                    legend: '# of participants',
                                    legendPosition: 'middle',
                                    legendOffset: 35,
                                }}
                                margin={{
                                    bottom: 45,
                                    left: 140,
                                    right: 12,
                                    top: 12,
                                }}
                                layout="horizontal"
                                />
                            ): (
                                <PieChart
                                    data={data}
                                />
                            )}
                        </>
                </div>
            }
        />
    );

}

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
        component: <GridCardItem type="bar" />,
        id: 'card_1',
        title: 'Card 1 to be truncable when activated by card resize',
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
        component: <GridCardItem type="pie" />,
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
        component: <GridCardItem type="bar" />,
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
        component: <GridCardItem type="pie" />,
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
              uid="ResizableGridStory"
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
              uid="ResizableGridWithUserConfigStory"
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