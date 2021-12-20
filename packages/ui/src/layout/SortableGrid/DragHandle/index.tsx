import React from "react";
import cx from "classnames";
import { useSortable } from "@dnd-kit/sortable";

import styles from '@ferlab/style/layout/SortableGrid/DragHandle.module.scss';

interface OwnProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const DragHandle = ({ id, children, className = "" }: OwnProps) => {
  const { attributes, listeners } = useSortable({ id });

  return (
    <div
      className={cx(styles.dragHandle, className)}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default DragHandle;
