import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Button, Divider, Popover, Space, Tooltip } from 'antd';
import { isEqual } from 'lodash';

import { IProTableDictionary, ProColumnType, TColumnStates } from '../types';
import { generateColumnState } from '..';

import SortableColumnItem from './SortableColumnItem';

import styles from './index.module.css';

interface OwnProps<T = any> {
    className?: string;
    columns: ProColumnType<T>[];
    columnStates: TColumnStates;
    onChange: (newColumnState: TColumnStates) => void;
    dictionary?: IProTableDictionary;
    columnSelectorHeader?: ReactNode;
}

const ColumnSelector = ({
    className = '',
    columns,
    columnSelectorHeader,
    columnStates,
    dictionary = {},
    onChange,
}: OwnProps): ReactElement => {
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
        if (localColumns.saveIndex > -1) {
            let firstIndex = localColumns.state[0].index;
            const updatedColumns: TColumnStates = localColumns.state.map((localState) => ({
                ...getColumnStateByKey(localState.key)!,
                index: firstIndex++,
            }));

            onChange(updatedColumns);
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

    const List = ({ children }: any) => (
        <Space className={className} direction="vertical">
            {children}
        </Space>
    );

    return (
        <Popover
            align={{
                offset: [-9, 0],
            }}
            content={
                <Space direction="vertical">
                    {columnSelectorHeader && (
                        <>
                            {columnSelectorHeader}
                            <Divider style={{ marginBottom: 8, marginTop: 8 }} />
                        </>
                    )}

                    <div className={styles.ProTablePopoverColumnListWrapper}>
                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
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

                                        const savedColumnState = getColumnStateByKey(localState.key);

                                        return (
                                            <SortableColumnItem
                                                checked={savedColumnState?.visible}
                                                id={localState.key}
                                                key={index}
                                                label={String(foundColumn.title)}
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

                                                    newStates.sort((a, b) => a.index - b.index);

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
                            disabled={isEqual(generateColumnState([], columns).dynamic, localColumnState)}
                            onClick={() => {
                                const newState = generateColumnState([], columns).dynamic;
                                setLocalColumns({
                                    saveIndex: -1,
                                    state: newState,
                                });

                                let firstIndex = localColumns.state[0].index;
                                const reindexState = newState.map((localState) => ({
                                    ...getColumnStateByKey(localState.key)!,
                                    index: firstIndex++,
                                    visible: localState.visible,
                                }));
                                onChange(reindexState);
                            }}
                            size="small"
                            type="link"
                        >
                            {dictionary.columnSelector?.reset || 'Reset'}
                        </Button>
                    </div>
                </Space>
            }
            overlayClassName={styles.ProTablePopoverColumn}
            placement="bottomLeft"
            trigger="click"
        >
            <Tooltip title={dictionary.columnSelector?.tooltips?.columns || 'Columns'}>
                <Button
                    icon={<SettingOutlined className={styles.ProTableSettingBtnIcon} />}
                    size="small"
                    type="text"
                ></Button>
            </Tooltip>
        </Popover>
    );
};

export default ColumnSelector;
