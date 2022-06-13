import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Popover, Space, Tooltip } from 'antd';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableColumnItem from './SortableColumnItem';
import { useEffect, useState } from 'react';
import { IProTableDictionary, ProColumnType, TColumnStates } from '../types';
import { generateColumnState } from '..';
import { isEqual } from 'lodash';

import styles from '@ferlab/style/components/protable/ColumnSelector.module.scss';

interface OwnProps<T = any> {
    className?: string;
    columns: ProColumnType<T>[];
    columnStates: TColumnStates;
    onChange: (newColumnState: TColumnStates) => void;
    dictionary?: IProTableDictionary;
}

const ColumnSelector = ({ className = '', columns, columnStates, onChange, dictionary = {} }: OwnProps) => {
    const [localColumnState, setLocalColumnState] = useState(columnStates);
    const [localColumns, setLocalColumns] = useState<{
        saveIndex: number;
        state: TColumnStates;
    }>({
        saveIndex: -1,
        state: [...columnStates].sort((a, b) => a.index - b.index),
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        setLocalColumnState(columnStates);
        setLocalColumns({
            saveIndex: -1,
            state: [...columnStates].sort((a, b) => a.index - b.index),
        });
    }, [columnStates]);

    useEffect(() => {
        // Ensure onChange is not call on load
        if (localColumns.saveIndex > -1) {
            onChange(
                localColumns.state.map((localState, index) => {
                    return {
                        ...getColumnStateByKey(localState.key)!,
                        index,
                    };
                }),
            );
        }
    }, [localColumns]);

    const getColumnStateByKey = (stateKey: string) => localColumnState.find(({ key }) => stateKey === key);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setLocalColumns((localColumn) => {
                const oldIndex = localColumn.state.findIndex(({ key }) => key === active.id);
                const newIndex = localColumn.state.findIndex(({ key }) => key === over?.id);

                return {
                    saveIndex: localColumn.saveIndex + 1,
                    state: arrayMove(localColumn.state, oldIndex, newIndex),
                };
            });
        }
    };

    const List = ({ children }: any) => {
        // Needs to be defined here else it breaks the grid
        return (
            <Space direction="vertical" className={className}>
                {children}
            </Space>
        );
    };

    return (
        <Popover
            placement="bottomLeft"
            trigger="click"
            align={{
                offset: [-9, 0],
            }}
            overlayClassName={styles.ProTablePopoverColumn}
            content={
                <Space direction="vertical">
                    <div className={styles.ProTablePopoverColumnListWrapper}>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext
                                items={localColumns.state.map(({ key }) => key)}
                                strategy={rectSortingStrategy}
                            >
                                <List>
                                    {localColumns.state.map((localState, index) => {
                                        const foundColumn = columns.find(({ key }) => localState.key === key)!;

                                        if (!foundColumn) {
                                            return false;
                                        }

                                        const title =
                                            typeof foundColumn.title === 'string'
                                                ? foundColumn.title
                                                : foundColumn.displayTitle;
                                        const savedColumnState = getColumnStateByKey(localState.key);
                                        return (
                                            <SortableColumnItem
                                                id={localState.key!}
                                                label={title?.toString()!}
                                                key={index}
                                                checked={savedColumnState?.visible}
                                                onChange={(e) => {
                                                    const filteredStates = localColumnState.filter(
                                                        ({ key }) => key !== localState.key,
                                                    );
                                                    const newStates = [
                                                        ...filteredStates,
                                                        {
                                                            ...savedColumnState!,
                                                            visible: e.target.checked,
                                                        },
                                                    ];

                                                    onChange(newStates);
                                                }}
                                            />
                                        );
                                    })}
                                </List>
                            </SortableContext>
                        </DndContext>
                    </div>
                    <div className={styles.ProTablePopoverColumnResetBtnWrapper}>
                        <Button
                            className={styles.ProTablePopoverColumnResetBtn}
                            size="small"
                            type="link"
                            disabled={isEqual(generateColumnState([], columns), localColumnState)}
                            onClick={() => {
                                const newState = generateColumnState([], columns);
                                setLocalColumns({
                                    saveIndex: -1,
                                    state: newState,
                                });
                                onChange(
                                    newState.map((newColumnState, index) => {
                                        return {
                                            ...newColumnState,
                                            index,
                                        };
                                    }),
                                );
                            }}
                        >
                            {dictionary.columnSelector?.reset || 'Reset'}
                        </Button>
                    </div>
                </Space>
            }
        >
            <Tooltip title={dictionary.columnSelector?.tooltips?.columns || 'Columns'}>
                <Button
                    type="text"
                    size="small"
                    icon={<SettingOutlined className={styles.ProTableSettingBtnIcon} />}
                ></Button>
            </Tooltip>
        </Popover>
    );
};

export default ColumnSelector;
