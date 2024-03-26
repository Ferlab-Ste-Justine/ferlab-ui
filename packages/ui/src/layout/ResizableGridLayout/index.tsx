// Check for futur fix for the mouse input lag
// TODO: https://github.com/react-grid-layout/react-grid-layout/issues/2003
import React, { createContext, memo, useState } from 'react';
import { Layout, Layouts, Responsive as ResponsiveGridLayout, ResponsiveProps } from 'react-grid-layout';
import { Space, Spin } from 'antd';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import isEqual from 'lodash/isEqual';

import useElementSize from '../../hooks/useElementSize';

import ResizableItemSelector from './ResizableItemSelector';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './index.module.scss';

type TResizableGridLayoutContext = {
    [key: string]: {
        onCardRemoveConfigUpdate: (targetId: string) => void;
    };
};

export const ResizableGridLayoutContext = createContext<TResizableGridLayoutContext>({});

type TOptionalBaseType = {
    static?: boolean;
    isResizable?: boolean;
};

interface ILayoutItemConfig extends Omit<Layout, 'i' | 'minH' | 'minW'> {
    minH?: number;
    minW?: number;
}

type IBaseLayoutItemConfig = Omit<Layout, 'i'>;

export interface IResizableGridLayoutConfig {
    component: React.ReactNode;
    id: string;
    title: string;
    hidden?: boolean;
    base: IBaseLayoutItemConfig;
    lg?: ILayoutItemConfig;
    md?: ILayoutItemConfig;
    sm?: ILayoutItemConfig;
    xs?: ILayoutItemConfig;
    xxs?: ILayoutItemConfig;
}

export type TSerializedResizableGridLayoutConfig = Omit<IResizableGridLayoutConfig, 'component'>;

interface IResizableGridLayout extends Omit<ResponsiveProps, 'layouts'> {
    uid: string;
    onConfigUpdate?: (layouts: TSerializedResizableGridLayoutConfig[]) => void;
    defaultLayouts: IResizableGridLayoutConfig[];
    layouts?: TSerializedResizableGridLayoutConfig[];
    onReset?: (layouts: TSerializedResizableGridLayoutConfig[]) => void;
    displayGridSettings?: boolean;
    dictionary?: {
        columnSelector?: {
            reset?: string;
            tooltip?: string;
        };
    };
}

const BASE_FLAG = 'base';
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

/**
 * Compare and merge defaultConfig and the current saved config
 * Non user data from base are override by config.base
 * title is override by config.title to handle translation
 * @param configs
 * @param serializedConfigs
 * @returns
 */
export const deserialize = (
    configs: IResizableGridLayoutConfig[],
    serializedConfigs?: TSerializedResizableGridLayoutConfig[],
): IResizableGridLayoutConfig[] =>
    configs.map((config) => {
        const serializedConfig = (serializedConfigs ?? []).find((item) => item.id == config.id);
        const optionalBaseValues = generateOptionalBaseConfig(config.base);
        return {
            ...config,
            ...serializedConfig,
            base: {
                ...config.base,
                ...optionalBaseValues,
            },
            title: config.title,
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
        responsiveLayouts[breakpoint] = configs.map((layout) => {
            const optionalBaseValues = generateOptionalBaseConfig(layout.base);

            return {
                ...layout.base,
                ...(layout[breakpoint as keyof IResizableGridLayoutConfig] as ILayoutItemConfig),
                i: layout.id,
                minH: layout.base.minH,
                minW: layout.base.minW,
                ...optionalBaseValues,
            };
        });
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
    layouts: Layout[],
    configs: IResizableGridLayoutConfig[],
    currentBreakpoint: Breakpoint,
): TSerializedResizableGridLayoutConfig[] => {
    const configObj: { [p: string]: any } = {};

    for (const config of configs) {
        configObj[config.id] = { ...config };
        for (const layout of layouts) {
            if (layout.i == config.id) {
                configObj[config.id][currentBreakpoint] = {
                    ...layout,
                };
                delete configObj[config.id][currentBreakpoint].i;
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

/**
 * flatten breakpoint config to be compared in pristine
 * @param layoutConfig
 * @returns
 */
export const flattenBreakpoint = (layoutConfig: IResizableGridLayoutConfig): IResizableGridLayoutConfig => {
    const configWithBreakpoints: { [p: string]: any } = {};
    for (const breakpoint in BREAKPOINTS) {
        configWithBreakpoints[breakpoint] = {
            ...layoutConfig.base,
            ...(layoutConfig[breakpoint as keyof IResizableGridLayoutConfig] as ILayoutItemConfig),
            i: layoutConfig.id,
        };

        delete configWithBreakpoints[breakpoint].static;
        delete configWithBreakpoints[breakpoint].moved;
    }

    return configWithBreakpoints as IResizableGridLayoutConfig;
};

/**
 * Compare default and user config
 *
 * Warning: When resizing the browser, stay the same but on layout changed is still triggered.
 * Use the breakpoint to print the difference in the breakpoint
 * if (!isEqual(defaultBreakpointConfig, breakpointConfig))
 *  console.log('breakpoint', breakpoint); //TODO: to remove
 *  console.log('defaultBreakpointConfig', defaultBreakpointConfig); //TODO: to remove
 *  console.log('breakpointConfig', breakpointConfig); //TODO: to remove
 * @param defaultConfigs
 * @param configs
 * @returns
 */
export const isPrisitine = (
    defaultConfigs: IResizableGridLayoutConfig[],
    configs: IResizableGridLayoutConfig[],
): boolean => {
    const serializeDefaultConfigs = serialize(
        defaultConfigs.map((config) => ({ ...config, ...flattenBreakpoint(config) })),
    );
    const serializeConfigs = serialize(configs.map((config) => ({ ...config, ...flattenBreakpoint(config) })));

    for (const index in serializeDefaultConfigs) {
        const defaultConfig = serializeDefaultConfigs[index];
        const config = serializeConfigs[index];

        if (!defaultConfig.hidden && config.hidden) {
            return false;
        }

        for (const breakpoint in defaultConfig) {
            if (breakpoint === BASE_FLAG) {
                continue;
            }
            const defaultBreakpointConfig = defaultConfig[breakpoint as keyof TSerializedResizableGridLayoutConfig];
            const breakpointConfig = config[breakpoint as keyof TSerializedResizableGridLayoutConfig];
            if (!isEqual(defaultBreakpointConfig, breakpointConfig)) {
                return false;
            }
        }
    }

    return true;
};

/**
 * Manage optional base params
 * @param base
 * @returns
 */
export const generateOptionalBaseConfig = (base: ILayoutItemConfig): TOptionalBaseType => {
    const optionalBaseValues: TOptionalBaseType = {};

    if (base.isResizable !== undefined) {
        optionalBaseValues['isResizable'] = base.isResizable;
    }

    if (base.static !== undefined) {
        optionalBaseValues['static'] = base.static;
    }

    return optionalBaseValues;
};

const ResizableGridLayout = ({
    defaultLayouts,
    dictionary,
    displayGridSettings = true,
    layouts,
    onConfigUpdate,
    onReset,
    uid,
    ...props
}: IResizableGridLayout): JSX.Element => {
    const size = useElementSize('resizable-grid-container');
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string | undefined>(undefined);
    const configs = deserialize(defaultLayouts, layouts);
    const responsiveDefaultLayouts = serializeConfigToLayouts(configs);
    const resizableItemsList = configs.map(({ hidden, id, title }) => ({
        id,
        label: title,
        value: hidden === undefined ? true : !hidden,
    }));
    const handleUpdate = (layouts: Layout[]) => {
        if (onConfigUpdate) {
            const serializedLayouts = serializeLayoutsToConfig(layouts, configs, currentBreakpoint as Breakpoint);
            onConfigUpdate(serializedLayouts);
        }
    };

    return (
        <Space className={styles.wrapper} direction="vertical" id="resizable-grid-container">
            {displayGridSettings && (
                <div className={styles.graphSelector}>
                    <ResizableItemSelector
                        dictionary={dictionary}
                        isPristine={isPrisitine(defaultLayouts, configs)}
                        items={resizableItemsList}
                        onChange={(targetId, checked) => {
                            if (onConfigUpdate) {
                                onConfigUpdate(serialize(updateConfig(configs, targetId, 'hidden', !checked)));
                            }
                        }}
                        onReset={() => {
                            if (onReset) {
                                onReset(serialize(defaultLayouts));
                            }
                        }}
                    />
                </div>
            )}

            <ResizableGridLayoutContext.Provider
                value={{
                    [uid]: {
                        onCardRemoveConfigUpdate: (targetId: string) => {
                            if (onConfigUpdate) {
                                onConfigUpdate(serialize(updateConfig(configs, targetId, 'hidden', true)));
                            }
                        },
                    },
                }}
            >
                <ResponsiveGridLayout
                    breakpoints={BREAKPOINTS}
                    className="layout"
                    cols={{ lg: 16, md: 12, sm: 10, xs: 6, xxs: 4 }}
                    containerPadding={[0, 0]}
                    draggableHandle=".rgl-drag-zone"
                    layouts={responsiveDefaultLayouts}
                    margin={[12, 12]}
                    maxRows={10}
                    onBreakpointChange={(newBreakpoint: string, newCols: number) => {
                        if (newBreakpoint === currentBreakpoint) {
                            return;
                        }
                        setCurrentBreakpoint(newBreakpoint);
                    }}
                    onDragStop={handleUpdate}
                    onResizeStop={handleUpdate}
                    rowHeight={98}
                    width={size.x && size.x !== null ? size.x : 1280}
                    {...props}
                >
                    {currentBreakpoint ? (
                        configs.map((layout) => {
                            if (layout.hidden) {
                                return;
                            }
                            const grid = layout[
                                currentBreakpoint as keyof IResizableGridLayoutConfig
                            ] as ILayoutItemConfig;

                            return (
                                <div data-grid={{ ...layout.base, ...grid }} id={layout.id} key={layout.id}>
                                    {layout.component}
                                </div>
                            );
                        })
                    ) : (
                        <Spin spinning />
                    )}
                </ResponsiveGridLayout>
            </ResizableGridLayoutContext.Provider>
        </Space>
    );
};

export default ResizableGridLayout;
