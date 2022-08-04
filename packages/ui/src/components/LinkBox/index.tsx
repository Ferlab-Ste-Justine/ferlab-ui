import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import MultiLabel, { MultiLabelIconPositionEnum } from '../labels/MultiLabel';

import styles from '@ferlab/style/components/linkbox/LinkBox.module.scss';

interface OwnProps {
    multiLabelClassName?: string;
    icon: React.ReactNode;
    label: string | number;
    subLabel: string;
    to: string;
}

const LinkBox = ({ icon, label, multiLabelClassName = '', subLabel, to }: OwnProps): ReactElement => (
    <Link className={styles.dataExploBox} to={to}>
        <Space align="start" direction="horizontal" size={16}>
            <MultiLabel
                Icon={icon}
                className={multiLabelClassName}
                iconPosition={MultiLabelIconPositionEnum.Top}
                label={label}
                subLabel={subLabel}
            />
            <ArrowRightOutlined className={styles.linkArrow} />
        </Space>
    </Link>
);

export default LinkBox;
