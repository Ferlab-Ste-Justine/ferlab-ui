import React, { ReactElement } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import styles from './index.module.scss';

export type TSortableColumnItem = {
    id: string;
    label: string;
    checked?: boolean;
    onChange: (e: CheckboxChangeEvent) => void;
};

const SortableColumnItem = ({ checked = true, id, label, onChange }: TSortableColumnItem): ReactElement => {
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        opacity: isDragging ? 0.65 : 1,
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 'auto',
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
