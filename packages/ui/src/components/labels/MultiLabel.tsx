import React, { ReactElement } from 'react';

import './MultiLabel.css';

export enum MultiLabelTypeEnum {
    Inline = 'inline',
    Stack = 'stack',
}
export enum MultiLabelIconPositionEnum {
    Middle = 'middle-icon',
    Top = 'top-icon',
}

export type MultiLabelProps = {
    className?: string;
    labelClassName?: string;
    subLabelClassName?: string;
    iconClassName?: string;
    iconPosition?: MultiLabelIconPositionEnum;
    Icon: React.ReactNode;
    type?: MultiLabelTypeEnum;
    label: React.ReactNode;
    subLabel: React.ReactNode;
    style?: React.CSSProperties;
};

const MultiLabel = ({
    className = '',
    Icon,
    iconClassName = '',
    iconPosition = MultiLabelIconPositionEnum.Middle,
    label,
    labelClassName = '',
    style = {},
    subLabel,
    subLabelClassName = '',
    type = MultiLabelTypeEnum.Stack,
}: MultiLabelProps): ReactElement => (
    <div
        className={`multilabel__container multilabel__container--${type} multilabel__container--${iconPosition} ${className}`}
        style={style}
    >
        <div className={`wrapper__icon ${iconClassName}`}>{Icon}</div>
        <span className={`wrapper__label ${labelClassName}`}>{label}</span>
        <span className={`wrapper__subLabel ${subLabelClassName}`}>{subLabel}</span>
    </div>
);

export default MultiLabel;
