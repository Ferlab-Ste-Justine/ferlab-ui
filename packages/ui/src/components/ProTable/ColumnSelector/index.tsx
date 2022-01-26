import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import cx from 'classnames';
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

import styles from '@ferlab/style/components/protable/ColumnSelector.module.scss';
import { ProColumnType, TColumnStateMap } from '../types';

interface OwnProps<T = any> {
    className?: string;
    columns: ProColumnType<T>[];
    columnsState: TColumnStateMap;
    onChange: (newColumnState: TColumnStateMap) => void;
}

const ColumnSelector = <T,>({ className = '', columns, columnsState, onChange }: OwnProps) => {
    const [currentColumns, setCurrentColumns] = useState<ProColumnType[]>(columns);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    useEffect(() => {
        const newColumnStateMap: TColumnStateMap = {};
        currentColumns.forEach((column, index) => {
            newColumnStateMap[column.key] = {
                ...columnsState[column.key],
                index: index,
            };
        });
        onChange(newColumnStateMap);
        // eslint-disable-next-line
    }, [currentColumns]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setCurrentColumns((items) => {
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
                    <SortableContext items={currentColumns.map(({ key }) => key as any)} strategy={rectSortingStrategy}>
                        <List>
                            {currentColumns.map((column, index) => (
                                <SortableColumnItem
                                    id={column.key!}
                                    label={column.title as string}
                                    key={index}
                                    checked={columnsState[column.key].visible}
                                    onChange={(e) => {
                                        onChange({
                                            ...columnsState,
                                            [column.key]: {
                                                ...columnsState[column.key],
                                                visible: e.target.checked,
                                            },
                                        });
                                    }}
                                />
                            ))}
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
