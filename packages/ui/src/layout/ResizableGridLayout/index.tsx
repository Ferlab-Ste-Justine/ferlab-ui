import React, { useState } from 'react';
import { Layout, Layouts, Responsive, ResponsiveProps, WidthProvider } from 'react-grid-layout';
import { Space } from 'antd';

import ResizableItemSelector from './ResizableItemSelector';

const ResponsiveGridLayout = WidthProvider(Responsive);

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './index.module.scss';

interface ILayoutItemConfig extends Omit<Layout, 'i' | 'y' | 'minH'> {
    y?: number;
    minH?: number;
    minX?: number;
}

export interface IResizableGridLayoutConfig {
    component: React.ReactNode;
    id: string;
    title: string;
    hidden?: boolean;
    base: ILayoutItemConfig;
    lg?: ILayoutItemConfig;
    md?: ILayoutItemConfig;
    sm?: ILayoutItemConfig;
    xs?: ILayoutItemConfig;
    xss?: ILayoutItemConfig;
}

export type TSerializedResizableGridLayoutConfig = Omit<IResizableGridLayoutConfig, 'component'>;

interface IResizableGridLayout extends Omit<ResponsiveProps, 'layouts'> {
    onConfigUpdate: (layouts: TSerializedResizableGridLayoutConfig[]) => void;
    defaultLayouts: IResizableGridLayoutConfig[];
    layouts?: TSerializedResizableGridLayoutConfig[];
    onReset: (layouts: TSerializedResizableGridLayoutConfig[]) => void;
}

const BREAKPOINTS = { lg: 1748, md: 1308, sm: 1088, xs: 648, xxs: 0 };

/**
 * Component/Class can't be serialized inside a react state
 * They are removed when serialized for the state
 * @param config
 * @returns TSerializedResizableGridLayoutConfig
 */
export const serialize = (config: IResizableGridLayoutConfig[]): TSerializedResizableGridLayoutConfig[] =>
    config.map((item) => {
        const itemToSave = { ...item };
        delete itemToSave.component;
        return itemToSave;
    });

export const deserialize = (
    configs: IResizableGridLayoutConfig[],
    serializedConfigs?: TSerializedResizableGridLayoutConfig[],
): IResizableGridLayoutConfig[] =>
    configs.map((config) => {
        const serializedConfig = (serializedConfigs ?? []).find((item) => item.id == config.id);
        return {
            ...config,
            ...serializedConfig,
        };
    }) as IResizableGridLayoutConfig[];

/**
 * Convert a config to react-grid layout
 * @param configs config
 * @returns responsiveLayouts - a converted readable config to react-grid layouts
 */
export const serializeConfigToLayouts = (configs: IResizableGridLayoutConfig[]): Layouts => {
    const responsiveLayouts: { [p: string]: any } = {};
    for (const breakpoint in BREAKPOINTS) {
        responsiveLayouts[breakpoint] = configs.map((layout) => ({
            ...layout.base,
            ...(layout[breakpoint as keyof IResizableGridLayoutConfig] as ILayoutItemConfig),
            i: layout.id,
        }));
    }

    return responsiveLayouts;
};

/**
 * Convert react-grid layout to our custom serialized config
 * @param layouts react-grid layout
 * @param configs
 * @returns IResizableGridLayoutConfig[]
 */
export const serializeLayoutsToConfig = (
    layouts: Layouts,
    configs: IResizableGridLayoutConfig[],
): TSerializedResizableGridLayoutConfig[] => {
    const configObj: { [p: string]: any } = {};

    for (const config of configs) {
        configObj[config.id] = { ...config };
        for (const breakpoint in BREAKPOINTS) {
            for (const layout of layouts[breakpoint]) {
                if (layout.i == config.id) {
                    configObj[config.id][breakpoint] = {
                        ...layout,
                    };
                    delete configObj[config.id][breakpoint].i;
                }
            }
        }
    }

    return serialize(
        Object.keys(configObj).map((key) => ({
            ...configObj[key],
        })),
    );
};

/**
 * Iterate over all react-grid layouts to return a specific
 * layout or undefined if the layout doesn't exist
 * @param layouts layouts used by react-grid-layout
 * @param id layout id
 * @returns layout or undefined
 */
export const hasLayout = (layouts: Layouts, id: string): boolean => {
    for (const key in layouts) {
        for (const layout of layouts[key]) {
            if (layout.i == id) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Update a field of config
 * @param configs
 * @param targetId
 * @param field
 * @param value
 * @returns IResizableGridLayoutConfig[]
 */
export const updateConfig = (
    configs: IResizableGridLayoutConfig[],
    targetId: string,
    field: string,
    value: any,
): IResizableGridLayoutConfig[] =>
    configs.map((config) => {
        if (config.id === targetId) {
            return {
                ...config,
                [field]: value,
            };
        }
        return config;
    });

const ResizableGridLayout = ({
    defaultLayouts,
    layouts,
    onConfigUpdate,
    onReset,
    ...props
}: IResizableGridLayout): JSX.Element => {
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
    const configs = deserialize(defaultLayouts, layouts);
    const responsiveDefaultLayouts = serializeConfigToLayouts(configs);
    const resizableItemsList = configs.map(({ hidden, id, title }) => ({
        id,
        label: title,
        value: hidden === undefined ? true : !hidden,
    }));

    return (
        <Space className={styles.wrapper} direction="vertical">
            <div className={styles.graphSelector}>
                <ResizableItemSelector
                    items={resizableItemsList}
                    onChange={(targetId, checked) => {
                        onConfigUpdate(serialize(updateConfig(configs, targetId, 'hidden', !checked)));
                    }}
                    onReset={() => onReset(serialize(defaultLayouts))}
                />
            </div>

            <ResponsiveGridLayout
                breakpoints={BREAKPOINTS}
                className="layout"
                cols={{ lg: 16, md: 12, sm: 10, xs: 6, xxs: 4 }}
                compactType="horizontal"
                layouts={responsiveDefaultLayouts}
                margin={[12, 12]}
                maxRows={10}
                onBreakpointChange={(newBreakpoint: string, newCols: number) => {
                    setCurrentBreakpoint(newBreakpoint);
                }}
                onLayoutChange={(currentLayout, allLayouts) => {
                    onConfigUpdate(serializeLayoutsToConfig(allLayouts, configs));
                }}
                rowHeight={98}
                verticalCompact
                {...props}
            >
                {configs.map((layout) => {
                    if (layout.hidden) {
                        return;
                    }
                    return (
                        <div data-grid={layout[currentBreakpoint as keyof IResizableGridLayoutConfig]} key={layout.id}>
                            {layout.component}
                        </div>
                    );
                })}
            </ResponsiveGridLayout>
        </Space>
    );
};

export default ResizableGridLayout;
