import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
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
import { ProColumnType, TColumnStates } from '../types';

import styles from '@ferlab/style/components/protable/ColumnSelector.module.scss';

interface OwnProps<T = any> {
    className?: string;
    columns: ProColumnType<T>[];
    columnStates: TColumnStates;
    onChange: (newColumnState: TColumnStates) => void;
}

const ColumnSelector = <T,>({ className = '', columns, columnStates, onChange }: OwnProps) => {
    const [currentColumnStates, setCurrentColumnStates] = useState<TColumnStates>(columnStates);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        onChange(
            currentColumnStates.map((column, index) => {
                return {
                    ...getColumnStateByKey(column.key)!,
                    index,
                };
            }),
        );
        // eslint-disable-next-line
    }, [currentColumnStates]);

    const getColumnStateByKey = (stateKey: string) => columnStates.find(({ key }) => stateKey === key);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setCurrentColumnStates((items) => {
                const oldIndex = items.findIndex(({ key }) => key === active.id);
                const newIndex = items.findIndex(({ key }) => key === over?.id);

                return arrayMove(items, oldIndex, newIndex);
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
                offset: [-5, 0],
            }}
            overlayClassName={styles.ProTablePopoverColumn}
            content={
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={currentColumnStates.map(({ key }) => key)} strategy={rectSortingStrategy}>
                        <List>
                            {currentColumnStates.map((columnState, index) => {
                                const title = columns.find(({ key }) => columnState.key === key)!.title;
                                const visible = getColumnStateByKey(columnState.key)?.visible;
                                return (
                                    <SortableColumnItem
                                        id={columnState.key!}
                                        label={title?.toString()!}
                                        key={index}
                                        checked={visible}
                                        onChange={(e) => {
                                            const filteredStates = columnStates.filter(
                                                ({ key }) => key !== columnState.key,
                                            );
                                            const newStates = [
                                                ...filteredStates,
                                                {
                                                    key: columnState.key,
                                                    index: columnState.index,
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
            }
        >
            <Button type="text" icon={<SettingOutlined className={styles.ProTableSettingBtnIcon} />}></Button>
        </Popover>
    );
};

export default ColumnSelector;
