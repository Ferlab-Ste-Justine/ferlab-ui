import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Checkbox } from 'antd';
import { CSS } from '@dnd-kit/utilities';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { HolderOutlined } from '@ant-design/icons';

import styles from '@ferlab/style/components/protable/SortableColumnItem.module.scss';

export type TSortableColumnItem = {
    id: string;
    label: string;
    checked?: boolean;
    onChange: (e: CheckboxChangeEvent) => void;
};

const SortableColumnItem = ({ id, label, checked = true, onChange }: TSortableColumnItem) => {
    const { setNodeRef, transform, transition, isDragging, attributes, listeners } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 'auto',
        opacity: isDragging ? 0.65 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <HolderOutlined className={styles.ProTableColumnDragHandle} {...listeners} {...attributes} />
            <Checkbox defaultChecked={checked} onChange={onChange}>
                {label}
            </Checkbox>
        </div>
    );
};

export default SortableColumnItem;
